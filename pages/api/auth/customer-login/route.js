import { NextResponse } from 'next/server'; // 👈 Import NextResponse
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// ใช้ export async function POST(request)
export async function POST(request) {
    const { email, password } = await request.json(); // 👈 ใช้ await request.json()

    // --- (Logic ตรวจสอบรหัสผ่านเหมือนเดิมทุกอย่าง) ---
    const user = { id: '123', email: 'customer@example.com', role: 'customer' };
    const passwordIsValid = password === '1234';

    if (!user || !passwordIsValid) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    // ---------------------------------------------

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const serializedCookie = serialize('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/',
    });

    // ใช้ return NextResponse และตั้งค่า Header
    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.set('Set-Cookie', serializedCookie); // 👈 ตั้งค่า Cookie แบบใหม่
    
    return response;
}