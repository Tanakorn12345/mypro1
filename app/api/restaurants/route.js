import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import pool from '../../../lib/db'; // ปรับ Path ตามโครงสร้างโปรเจกต์ของคุณ
import { writeFile } from 'fs/promises'; 
import path from 'path';                
import { mkdir } from 'fs/promises'; 

// --- ฟังก์ชัน Helper สำหรับตรวจสอบ Role 'shop' ---
async function verifyShopOwner(request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
        return { isShopOwner: false, error: 'Authentication required.', status: 401 };
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured.');
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

        // ✅ ปรับให้แน่ใจว่าเราหยิบ id ถูก field
        const userId = decoded.id || decoded.userId || decoded.sub;
        
        if (!userId) {
            console.error("[API /manage/restaurant] ❌ No userId found in token payload:", decoded);
            return { isShopOwner: false, error: 'Invalid token: no user ID.', status: 401 };
        }
        
        if (decoded.role !== 'shop') {
            return { isShopOwner: false, error: 'Forbidden: Shop owner access required.', status: 403 };
        }
        
        console.log("[API /manage/restaurant] ✅ User Verified:", userId, decoded.role);
        return { isShopOwner: true, shopUser: { id: userId, role: decoded.role } };

    } catch (error) {
        console.error("Token verification error:", error.message);
        return { isShopOwner: false, error: 'Invalid or expired token.', status: 401 };
    }
}


// --- API Handler สำหรับ POST (สร้างร้านอาหาร) ---
export async function POST(request) {
    // --- 1. ตรวจสอบสิทธิ์ ---
    const authCheck = await verifyShopOwner(request);
    if (!authCheck.isShopOwner) {
        return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    const ownerUserId = authCheck.shopUser.id; // ID ของเจ้าของร้านที่ล็อกอินอยู่

    // --- 2. รับข้อมูล FormData ---
    let connection;
    try {
        const formData = await request.formData(); // <-- ดึง FormData จาก Request
        
        // --- ดึงข้อมูลจาก FormData ---
        const name = formData.get('name');
        const description = formData.get('description');
        const opening_hours = formData.get('opening_hours');
        const phone = formData.get('phone');
        const address = formData.get('address');
        const imageFile = formData.get('image'); // นี่คือ File object (ถ้ามี)

        // --- Basic Validation ---
        if (!name || !address || !phone) {
             return NextResponse.json({ message: 'Missing required fields (name, address, phone).' }, { status: 400 });
        }
        
        // --- 3. (Optional) ตรวจสอบว่า User คนนี้สร้างร้านไปแล้วหรือยัง ---
        connection = await pool.getConnection();
        const [existingRestaurants] = await connection.execute(
            // --- แก้ Query ให้ตรงกับ DB ---
            'SELECT Restaurant_Id FROM Restaurant WHERE owner_user_id = ?', 
            [ownerUserId]
        );
        
        if (existingRestaurants.length > 0) {
            connection.release(); 
            return NextResponse.json({ message: 'User already has a restaurant.' }, { status: 409 }); 
        }

        // --- 4. จัดการรูปภาพ (วิธี A: บันทึกลง public) ---
        let imageUrl = null; 
        if (imageFile && imageFile.name) {
            console.log(`Received image: ${imageFile.name}, size: ${imageFile.size}`);
            
            const fileExtension = path.extname(imageFile.name); 
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const filename = `restaurant-${uniqueSuffix}${fileExtension}`;
            
            const uploadDir = path.join(process.cwd(), 'public/uploads/restaurants');
            const filePath = path.join(uploadDir, filename);
            
            try {
                await mkdir(uploadDir, { recursive: true }); 
                console.log(`Directory created or already exists: ${uploadDir}`);
            } catch (mkdirError) {
                 console.error(`Could not create directory ${uploadDir}:`, mkdirError);
            }

            const buffer = Buffer.from(await imageFile.arrayBuffer());
            
             try {
                await writeFile(filePath, buffer);
                console.log(`Image saved successfully to: ${filePath}`);
                imageUrl = `/uploads/restaurants/${filename}`; 
             } catch (writeError) {
                console.error(`Failed to write image file ${filePath}:`, writeError);
             }

        } else {
             console.log("No image file received or file has no name.");
        }
        // --- สิ้นสุดการจัดการรูปภาพ ---


        // --- 5. บันทึกข้อมูลร้านลง Database ---
        const [insertResult] = await connection.execute(
            // --- แก้ Query ให้ตรงกับ DB ---
            `INSERT INTO Restaurant (name, description, opening_hours, phone, address, image_url, owner_user_id, created_at, is_open) 
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
            [
                name, description || null, opening_hours || null, phone, address,
                imageUrl, // <-- ใช้ imageUrl ที่ได้จากการบันทึกไฟล์
                ownerUserId, true 
            ]
        );
        
        const newRestaurantId = insertResult.insertId;

        // --- (Optional) 6. อัปเดตตาราง User ---
        // await connection.execute('UPDATE User SET hasRestaurant = ? WHERE User_Id = ?', [true, ownerUserId]);

        connection.release(); 

        console.log(`Restaurant created with ID: ${newRestaurantId} for User ID: ${ownerUserId}`);
        return NextResponse.json({ message: 'Restaurant created successfully.', restaurantId: newRestaurantId, imageUrl: imageUrl }, { status: 201 }); 

    } catch (error) {
        console.error('POST Restaurant API error:', error);
        if (connection) connection.release(); 
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

