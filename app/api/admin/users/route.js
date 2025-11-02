import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import pool from '../../../../lib/db'; // <-- ตรวจสอบ Path

// --- ฟังก์ชัน Helper สำหรับตรวจสอบ Admin ---
async function verifyAdmin(request) {
    const cookieStore = await cookies(); // <-- Added await
    const token = cookieStore.get('auth-token');
    if (!token) return { isAdmin: false, error: 'Authentication required.', status: 401 };
    try {
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured.');
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        // --- 🎯 ตรวจสอบ Role ---
        if (decoded.role !== 'admin') { // <-- เช็คว่าเป็น admin
            return { isAdmin: false, error: 'Forbidden: Admin access required.', status: 403 };
        }
        // ส่งข้อมูล Admin กลับไป (เผื่อต้องใช้ ID)
        return { isAdmin: true, adminUser: decoded };
    } catch (error) {
        console.error("[API Verify Admin] Token verification error:", error.message);
        return { isAdmin: false, error: 'Invalid or expired token.', status: 401 };
    }
}

// --- API Handler สำหรับ GET (ดึง User ทั้งหมด) ---
export async function GET(request) {
    // --- 1. ตรวจสอบสิทธิ์ Admin ---
    const authCheck = await verifyAdmin(request);
    if (!authCheck.isAdmin) {
        return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    // --- 2. Query ข้อมูล User ทั้งหมด ---
    let connection;
    try {
        connection = await pool.getConnection();
        console.log("[API GET /admin/users] Fetching all users for Admin:", authCheck.adminUser.username);

        // --- 🎯 ตรวจสอบชื่อตารางและคอลัมน์ให้ตรงกับ ERD ---
        // เลือกเฉพาะคอลัมน์ที่จำเป็นสำหรับแสดงในตาราง Admin
        // ERD ของคุณมี User_Id, username, email, user_role (ไม่มี status แยก)
        const [rows] = await connection.execute(
            'SELECT id, username, email, role FROM users ORDER BY created_at DESC', // <-- ใช้ชื่อคอลัมน์จาก ERD และตั้งชื่อ Alias (as) ให้ตรงกับ Frontend
            // 'SELECT User_Id as id, username, email, user_role as role, status FROM User ORDER BY created_at DESC' // <-- ถ้ามีคอลัมน์ status
        );
        connection.release();

        // --- 3. ส่งข้อมูล Users กลับไป ---
        // Frontend คาดหวัง field: id, name (ใช้ username แทน), email, role, status (ตอนนี้ยังไม่มี status จาก DB)
        // เราจะส่งข้อมูลตามที่ Query มาก่อน
        return NextResponse.json({ users: rows }, { status: 200 });

    } catch (error) {
        console.error('GET /api/admin/users error:', error);
        if (connection) connection.release();
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

// --- (ในอนาคต) เพิ่มฟังก์ชัน POST สำหรับสร้าง User ในไฟล์นี้ ---
// export async function POST(request) { ... }

