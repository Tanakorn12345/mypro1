import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import pool from '../../../../../lib/db'; // <-- ตรวจสอบ Path ให้ถูกต้องมากๆ
import { writeFile, unlink } from 'fs/promises'; 
import path from 'path';
import { mkdir } from 'fs/promises';

// --- ฟังก์ชัน verifyShopOwner (เหมือนเดิม) ---
async function verifyShopOwner(request) {
    // *** แก้ไข: เพิ่ม await cookies() ***
    const cookieStore = await cookies(); 
    const token = cookieStore.get('auth-token');
    if (!token) return { isShopOwner: false, error: 'Authentication required.', status: 401 };
    try {
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured.');
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        // --- 🎯 ตรวจสอบ Role ---
        if (decoded.role !== 'shop') { // หรือ 'restaurant'
            return { isShopOwner: false, error: 'Forbidden: Shop owner access required.', status: 403 };
        }
        return { isShopOwner: true, shopUser: decoded };
    } catch (error) {
        console.error("Token verification error:", error.message);
        return { isShopOwner: false, error: 'Invalid or expired token.', status: 401 };
    }
}

// --- Helper Function: หา Restaurant ID (เหมือนเดิม) ---
async function getRestaurantId(connection, ownerUserId) {
     const [restaurantRows] = await connection.execute(
        'SELECT Restaurant_Id FROM Restaurant WHERE owner_user_id = ?',
        [ownerUserId]
     );
     if (restaurantRows.length === 0) return null; 
     return restaurantRows[0].Restaurant_Id;
}

// --- API Handler สำหรับ GET (ดึงข้อมูลเมนูชิ้นเดียว) ---
export async function GET(request, { params }) {
    // *** แก้ไข: ดึง menuId หลัง await อื่นๆ ***
    // const menuId = params.menuId; // <-- ย้ายไปทำหลัง await verifyShopOwner

    // 1. ตรวจสอบสิทธิ์
    const authCheck = await verifyShopOwner(request);
    if (!authCheck.isShopOwner) {
        return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }
    const ownerUserId = authCheck.shopUser.id;
    
    // *** แก้ไข: ดึง menuId ตรงนี้ ***
    const { menuId } = await params; // ✅ ต้องรอ params ก่อน
    console.log(`[API GET /menus/${menuId}] Received request`); // Log เพิ่ม

    // 2. Query ข้อมูลเมนู
    let connection;
    try {
        connection = await pool.getConnection();
        const restaurantId = await getRestaurantId(connection, ownerUserId);
        if (!restaurantId) {
            connection.release();
            return NextResponse.json({ message: 'Restaurant not found for this user.' }, { status: 404 });
        }

        console.log(`[API GET /menus/${menuId}] Querying for menu ID: ${menuId}, Restaurant ID: ${restaurantId}`); // Log เพิ่ม
        const [menuRows] = await connection.execute(
            // --- 🎯 ตรวจสอบชื่อตาราง/คอลัมน์ ---
            'SELECT * FROM Menu WHERE Menu_Id = ? AND Restaurant_Id = ?',
            [menuId, restaurantId] 
        );
        connection.release();
        console.log(`[API GET /menus/${menuId}] Query found ${menuRows.length} rows.`); // Log เพิ่ม


        // 3. ตรวจสอบผลลัพธ์
        if (menuRows.length === 0) {
            return NextResponse.json({ message: 'Menu item not found or access denied.' }, { status: 404 });
        }

        // 4. ส่งข้อมูลเมนูกลับไป
        console.log(`[API GET /menus/${menuId}] Returning menu data.`); // Log เพิ่ม
        return NextResponse.json({ menu: menuRows[0] }, { status: 200 });

    } catch (error) {
        console.error(`GET /api/manage/menus/${menuId} error:`, error);
        if (connection) connection.release();
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}


// --- API Handler สำหรับ PUT (อัปเดตเมนู) ---
export async function PUT(request, { params }) {
     // *** แก้ไข: ดึง menuId หลัง await อื่นๆ ***
    // const menuId = params.menuId; // <-- ย้ายไปทำหลัง await verifyShopOwner

    // 1. ตรวจสอบสิทธิ์
    const authCheck = await verifyShopOwner(request);
    if (!authCheck.isShopOwner) {
        return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }
    const ownerUserId = authCheck.shopUser.id;

     // *** แก้ไข: ดึง menuId ตรงนี้ ***
     const { menuId } = await params; // ✅ ต้องรอ params ก่อน
     console.log(`[API PUT /menus/${menuId}] Received request`); // Log เพิ่ม

    // 2. รับข้อมูล FormData
    let connection;
    let oldImageUrl = null; 
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const description = formData.get('description');
        const price = formData.get('price'); 
        const category = formData.get('category');
        const is_available_str = formData.get('is_available'); 
        const imageFile = formData.get('image'); 

        // --- Basic Validation ---
         const priceNum = parseFloat(price);
         if (!name || !price || !category || isNaN(priceNum) || priceNum <= 0) {
             return NextResponse.json({ message: 'Missing required fields (name, price, category) or invalid price.' }, { status: 400 });
         }
         const is_available = is_available_str === 'true';

        connection = await pool.getConnection();

        // 3. หา Restaurant_Id และตรวจสอบว่าเมนูนี้เป็นของร้านนี้จริง + ดึง URL รูปเก่า
        const restaurantId = await getRestaurantId(connection, ownerUserId);
        if (!restaurantId) {
            connection.release();
            return NextResponse.json({ message: 'Restaurant not found for this user.' }, { status: 404 });
        }
        console.log(`[API PUT /menus/${menuId}] Checking ownership for Restaurant ID: ${restaurantId}`); // Log เพิ่ม


        const [menuCheckRows] = await connection.execute(
             'SELECT image_url FROM Menu WHERE Menu_Id = ? AND Restaurant_Id = ?',
             [menuId, restaurantId]
        );

         if (menuCheckRows.length === 0) {
             connection.release();
             console.log(`[API PUT /menus/${menuId}] Menu not found or ownership mismatch.`); // Log เพิ่ม
             return NextResponse.json({ message: 'Menu item not found or access denied for update.' }, { status: 404 });
         }
         oldImageUrl = menuCheckRows[0].image_url; 
         console.log(`[API PUT /menus/${menuId}] Ownership verified. Old image URL: ${oldImageUrl}`); // Log เพิ่ม


        // 4. จัดการรูปภาพ (ถ้ามีการอัปโหลดใหม่)
        let newImageUrl = oldImageUrl; 
        if (imageFile && imageFile.name) {
            console.log(`[API PUT /menus/${menuId}] Received new menu image: ${imageFile.name}`);
            const fileExtension = path.extname(imageFile.name);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const filename = `menu-${uniqueSuffix}${fileExtension}`;
            const uploadDir = path.join(process.cwd(), 'public/uploads/menus');
            const filePath = path.join(uploadDir, filename);

            try { await mkdir(uploadDir, { recursive: true }); }
            catch (mkdirError) { console.error(`Could not create directory ${uploadDir}:`, mkdirError); }

            const buffer = Buffer.from(await imageFile.arrayBuffer());

            try {
                await writeFile(filePath, buffer);
                console.log(`[API PUT /menus/${menuId}] New menu image saved to: ${filePath}`);
                newImageUrl = `/uploads/menus/${filename}`; 

                // --- ลบรูปเก่า (ถ้ามี และไม่ใช่ Placeholder) ---
                if (oldImageUrl && oldImageUrl.startsWith('/uploads/')) {
                    try {
                       const oldFilePath = path.join(process.cwd(), 'public', oldImageUrl);
                       await unlink(oldFilePath);
                       console.log(`[API PUT /menus/${menuId}] Old menu image deleted: ${oldFilePath}`);
                    } catch (deleteError) {
                        console.error(`Could not delete old image ${oldImageUrl}:`, deleteError);
                    }
                }

            } catch (writeError) {
                console.error(`Failed to write new menu image file ${filePath}:`, writeError);
                newImageUrl = oldImageUrl; // ใช้รูปเดิมถ้าเขียนไฟล์ใหม่ไม่สำเร็จ
            }
        } else {
             console.log(`[API PUT /menus/${menuId}] No new image file received for update.`);
        }

        // 5. อัปเดตข้อมูลเมนูใน Database
        console.log(`[API PUT /menus/${menuId}] Updating database...`); // Log เพิ่ม
        const [updateResult] = await connection.execute(
            // --- 🎯 ตรวจสอบชื่อตาราง/คอลัมน์ ---
            `UPDATE Menu 
             SET name = ?, description = ?, price = ?, category = ?, is_available = ?, image_url = ?
             WHERE Menu_Id = ? AND Restaurant_Id = ?`,
            [
                name, description || null, priceNum, category, is_available,
                newImageUrl, // <-- ใช้ URL รูป (อาจจะเก่าหรือใหม่)
                menuId, restaurantId
            ]
        );
        connection.release();
        console.log(`[API PUT /menus/${menuId}] Update result:`, updateResult); // Log เพิ่ม


        if (updateResult.affectedRows === 0) {
             console.log(`[API PUT /menus/${menuId}] Update failed (affectedRows = 0).`); // Log เพิ่ม
             return NextResponse.json({ message: 'Menu item update failed (not found or no changes).' }, { status: 404 });
        }

        console.log(`[API PUT /menus/${menuId}] updated successfully.`);
        return NextResponse.json({ 
            message: 'Menu updated successfully.', 
            updatedData: { name, description, price: priceNum, category, is_available, image_url: newImageUrl } 
        }, { status: 200 });

    } catch (error) {
        console.error(`PUT /api/manage/menus/${menuId} error:`, error);
        if (connection) connection.release();
        return NextResponse.json({ message: 'An internal server error occurred during update.' }, { status: 500 });
    }
}



export async function DELETE(request, { params }) {
    const { menuId } = await params; // ✅ ต้อง await ก่อน

    // 1. ตรวจสอบสิทธิ์
    const authCheck = await verifyShopOwner(request);
    if (!authCheck.isShopOwner) {
        return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }
    const ownerUserId = authCheck.shopUser.id;

    // 2. ดึงข้อมูลเมนู (เพื่อเอา image_url) และตรวจสอบ Ownership
    let connection;
    let imageUrlToDelete = null;
    try {
        connection = await pool.getConnection();
        const restaurantId = await getRestaurantId(connection, ownerUserId);
        if (!restaurantId) {
            connection.release();
            return NextResponse.json({ message: 'Restaurant not found for this user.' }, { status: 404 });
        }

        // --- ดึง image_url ก่อนลบ ---
        const [menuRows] = await connection.execute(
             'SELECT image_url FROM Menu WHERE Menu_Id = ? AND Restaurant_Id = ?',
             [menuId, restaurantId]
        );

         if (menuRows.length === 0) {
             connection.release();
             return NextResponse.json({ message: 'Menu item not found or access denied for deletion.' }, { status: 404 });
         }
         imageUrlToDelete = menuRows[0].image_url; // <-- เก็บ URL รูปที่จะลบ

        // 3. ลบข้อมูลเมนูออกจาก Database
        const [deleteResult] = await connection.execute(
            'DELETE FROM Menu WHERE Menu_Id = ? AND Restaurant_Id = ?',
            [menuId, restaurantId]
        );
        connection.release(); // คืน Connection หลัง Query เสร็จ

        if (deleteResult.affectedRows === 0) {
             // ไม่ควรเกิดถ้าเช็คข้างบนผ่านแล้ว
             return NextResponse.json({ message: 'Menu item deletion failed (not found).' }, { status: 404 });
        }

        console.log(`Menu ID: ${menuId} deleted successfully from database.`);

        // 4. (พยายาม) ลบไฟล์รูปภาพออกจาก Server (ถ้ามี URL)
        if (imageUrlToDelete && imageUrlToDelete.startsWith('/uploads/')) {
            try {
               const imagePath = path.join(process.cwd(), 'public', imageUrlToDelete);
               await unlink(imagePath);
               console.log(`Menu image file deleted: ${imagePath}`);
            } catch (deleteError) {
                // ถ้าลบไฟล์ไม่สำเร็จ ไม่ต้องหยุด แค่ Log ไว้
                console.error(`Could not delete menu image file ${imageUrlToDelete}:`, deleteError);
            }
        }

        // 5. ส่ง Response สำเร็จ
        return new Response(null, { status: 204 }); // 204 No Content เหมาะกับการ Delete สำเร็จ

    } catch (error) {
        console.error(`DELETE /api/manage/menus/${menuId} error:`, error);
        if (connection) connection.release();
        return NextResponse.json({ message: 'An internal server error occurred during deletion.' }, { status: 500 });
    }
}


