import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import pool from '../../../../lib/db'; // <-- ตรวจสอบ Path
import { writeFile } from 'fs/promises'; // <-- สำหรับบันทึกรูป
import path from 'path';                // <-- สำหรับบันทึกรูป
import { mkdir } from 'fs/promises';   // <-- สำหรับบันทึกรูป

// --- ใช้ฟังก์ชัน verifyShopOwner เดิม ---
async function verifyShopOwner(request) {
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
        console.error("[API /manage/menus] Token verification error:", error.message);
        return { isShopOwner: false, error: 'Invalid or expired token.', status: 401 };
    }
}

// --- API Handler สำหรับ GET (ดึงเมนูทั้งหมดของร้าน) ---
export async function GET(request) {
    // --- 1. ตรวจสอบสิทธิ์ ---
    const authCheck = await verifyShopOwner(request);
    if (!authCheck.isShopOwner) {
        return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    const ownerUserId = authCheck.shopUser.id;

    // --- 2. ค้นหา Restaurant_Id ของร้านค้า ---
    let connection;
    let restaurantId = null;
    try {
        connection = await pool.getConnection();
        const [restaurantRows] = await connection.execute(
            // --- 🎯 ตรวจสอบชื่อตาราง/คอลัมน์ ---
            'SELECT Restaurant_Id FROM Restaurant WHERE owner_user_id = ?',
            [ownerUserId]
        );

        if (restaurantRows.length === 0) {
            connection.release();
            // ถ้า User ยังไม่มีร้านค้า ก็ไม่มีเมนูให้ดึง
            return NextResponse.json({ message: 'Restaurant not found for this user.' }, { status: 404 });
        }
        restaurantId = restaurantRows[0].Restaurant_Id; // <-- เก็บ ID ร้านค้าไว้

        // --- 3. Query เมนูทั้งหมดของร้านค้านี้ ---
        const [menuRows] = await connection.execute(
            // --- 🎯 ตรวจสอบชื่อตาราง/คอลัมน์ ---
            'SELECT * FROM Menu WHERE Restaurant_Id = ? ORDER BY category, name', // เรียงตาม category และ name
            [restaurantId]
        );
        connection.release();

        // --- 4. ส่งข้อมูลเมนูกลับไป ---
        return NextResponse.json({ menus: menuRows }, { status: 200 });

    } catch (error) {
        console.error('GET /api/manage/menus error:', error);
        if (connection) connection.release();
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// --- 🚀 ฟังก์ชัน POST ใหม่ (เพิ่มเมนู) ---
export async function POST(request) {
    // --- 1. ตรวจสอบสิทธิ์ ---
    const authCheck = await verifyShopOwner(request);
    if (!authCheck.isShopOwner) {
        return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }
    const ownerUserId = authCheck.shopUser.id;

    // --- 2. รับข้อมูล FormData ---
    let connection;
    let restaurantId = null;
    try {
        const formData = await request.formData();

        // --- ดึงข้อมูลเมนูจาก FormData ---
        const name = formData.get('name');
        const description = formData.get('description');
        const price = formData.get('price'); // เป็น String ต้องแปลง
        const category = formData.get('category');
        const is_available_str = formData.get('is_available'); // เป็น String 'true'/'false'
        const imageFile = formData.get('image');

        // --- Basic Validation ---
        const priceNum = parseFloat(price);
        if (!name || !price || !category || isNaN(priceNum) || priceNum <= 0) {
             return NextResponse.json({ message: 'Missing required fields (name, price, category) or invalid price.' }, { status: 400 });
        }
        const is_available = is_available_str === 'true'; // แปลงเป็น Boolean

        // --- 3. ค้นหา Restaurant_Id ของร้านค้า (ต้องทำอีกครั้ง) ---
        connection = await pool.getConnection();
        const [restaurantRows] = await connection.execute(
            'SELECT Restaurant_Id FROM Restaurant WHERE owner_user_id = ?',
            [ownerUserId]
        );

        if (restaurantRows.length === 0) {
            connection.release();
            return NextResponse.json({ message: 'Restaurant not found for this user. Cannot add menu.' }, { status: 404 });
        }
        restaurantId = restaurantRows[0].Restaurant_Id; // <-- ID ร้านค้าที่จะใช้

        // --- 4. จัดการรูปภาพ (เหมือนตอนสร้างร้าน แต่เปลี่ยน Path) ---
        let imageUrl = null; 
        if (imageFile && imageFile.name) {
            console.log(`Received menu image: ${imageFile.name}, size: ${imageFile.size}`);
            
            const fileExtension = path.extname(imageFile.name); 
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const filename = `menu-${uniqueSuffix}${fileExtension}`;
            
            // --- 🎯 เปลี่ยน Path เป็น /uploads/menus ---
            const uploadDir = path.join(process.cwd(), 'public/uploads/menus'); 
            const filePath = path.join(uploadDir, filename);
            
            try { await mkdir(uploadDir, { recursive: true }); } 
            catch (mkdirError) { console.error(`Could not create directory ${uploadDir}:`, mkdirError); }

            const buffer = Buffer.from(await imageFile.arrayBuffer());
            
             try {
                await writeFile(filePath, buffer);
                console.log(`Menu image saved to: ${filePath}`);
                // --- 🎯 เปลี่ยน Path เป็น /uploads/menus ---
                imageUrl = `/uploads/menus/${filename}`; 
             } catch (writeError) {
                console.error(`Failed to write menu image file ${filePath}:`, writeError);
             }
        } else {
             console.log("No menu image received.");
        }
        // --- สิ้นสุดการจัดการรูปภาพ ---


        // --- 5. บันทึกข้อมูลเมนูลง Database ---
        const [insertResult] = await connection.execute(
            // --- 🎯 ตรวจสอบชื่อตาราง/คอลัมน์ ---
            `INSERT INTO Menu (Restaurant_Id, name, description, price, image_url, is_available, category, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
                restaurantId, // ID ของร้านค้า
                name,
                description || null,
                priceNum, // ใช้ราคาที่เป็นตัวเลข
                imageUrl, 
                is_available, 
                category
            ]
        );
        
        const newMenuId = insertResult.insertId;
        connection.release(); 

        console.log(`Menu created with ID: ${newMenuId} for Restaurant ID: ${restaurantId}`);
        return NextResponse.json({ message: 'Menu added successfully.', menuId: newMenuId, imageUrl: imageUrl }, { status: 201 }); 

    } catch (error) {
        console.error('POST /api/manage/menus error:', error);
        if (connection) connection.release(); 
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}



