import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '../../../../lib/db'; // 👈 1. Import connection pool ที่เราสร้างไว้

export async function POST(request) {
    let connection; // ประกาศ connection ไว้ข้างนอก try-finally
    try {
        const { username, email, phone, password, role } = await request.json();

        // (ส่วน Validation ข้อมูลเหมือนเดิม)
        if (!username || !email || !phone || !password || !role) {
            return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
        }
        const allowedRoles = ['customer', 'shop', 'admin'];
        if (!allowedRoles.includes(role)) {
            return NextResponse.json({ message: 'A valid role is required.' }, { status: 400 });
        }
        
        // 👈 2. เชื่อมต่อกับฐานข้อมูล
        connection = await pool.getConnection();

        // 👈 3. ตรวจสอบว่ามี email นี้ในระบบแล้วหรือยัง
        const [existingUsers] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 }); // 409 Conflict
        }
        
        // (ส่วน Hash รหัสผ่านเหมือนเดิม)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 👈 4. บันทึกผู้ใช้ใหม่ลงในฐานข้อมูล
        // **หมายเหตุ:** ชื่อตาราง (users) และชื่อคอลัมน์ (username, email, ...) ต้องตรงกับในฐานข้อมูลของคุณ
        await connection.execute(
            'INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
            [username, email, phone, hashedPassword, role]
        );

        // (ส่วนส่ง Response กลับเหมือนเดิม)
        return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });

    } catch (error) {
        console.error('Registration API error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    } finally {
        // 👈 5. คืน connection กลับสู่ pool ไม่ว่าจะสำเร็จหรือล้มเหลว
        if (connection) {
            connection.release();
        }
    }
}