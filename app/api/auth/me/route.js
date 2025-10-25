// app/api/auth/me/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// 👈 บรรทัดนี้สำคัญมาก: บอก Next.js ให้รู้ว่า Route นี้ทำงานแบบ Dynamic เสมอ
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const cookieStore = await cookies() 
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // ตรวจสอบว่า JWT_SECRET มีอยู่จริงหรือไม่ (ป้องกัน Server ล่ม)
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    
    // ส่งข้อมูลผู้ใช้กลับไป
    return NextResponse.json({ 
      user: { 
        id: decoded.id, 
        username: decoded.username, 
        email: decoded.email, 
        role: decoded.role 
      } 
    });

  } catch (error) {
    // ถ้า token ไม่ถูกต้อง, หมดอายุ, หรือมีปัญหาอื่นๆ
    console.error("Error in /api/auth/me:", error.message);
    return NextResponse.json({ user: null, message: `Invalid token: ${error.message}` }, { status: 401 });
  }
}