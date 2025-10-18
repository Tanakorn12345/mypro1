import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // --- ส่วนตรวจสอบข้อมูล Admin ---
        // ในอนาคตคุณจะไปค้นหาในฐานข้อมูลสำหรับผู้ดูแลระบบ
        const user = { id: 'adm-001', email: 'admin@example.com', role: 'admin' };
        const passwordIsValid = password === 'adminpassword123'; // ตั้งรหัสผ่านจำลองสำหรับ Admin

        if (!user || !passwordIsValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        
        // --- ส่วนสร้าง Token และ Cookie (เหมือนเดิม) ---
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const serializedCookie = serialize('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 ชั่วโมง
            path: '/',
        });

        const response = NextResponse.json({ message: 'Login successful' });
        response.headers.set('Set-Cookie', serializedCookie);
        
        return response;

    } catch (error) {
        console.error('Admin Login API error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}