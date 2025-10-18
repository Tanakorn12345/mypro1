import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    // ส่งข้อมูลที่จำเป็นกลับไป ไม่ควรส่งข้อมูล sensitive
    return NextResponse.json({ user: { id: decoded.id, email: decoded.email, role: decoded.role } });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}