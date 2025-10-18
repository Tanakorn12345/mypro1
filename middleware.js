// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get('auth-token')?.value;

  // รายชื่อหน้าที่อนุญาตให้เข้าได้ แม้ยังไม่ล็อกอิน
  const publicPaths = ['/', '/login', '/register'];

  // ถ้ายังไม่ล็อกอิน
  if (!authToken) {
    // และพยายามจะไปหน้าที่ไม่อยู่ใน publicPaths
    if (!publicPaths.includes(pathname) && !pathname.startsWith('/api')) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ถ้าล็อกอินแล้ว แต่พยายามจะไปหน้า login/register ให้ส่งไปหน้า Home แทน
  if (authToken && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      const homeUrl = new URL('/', request.url);
      return NextResponse.redirect(homeUrl);
  }

  // กรณีอื่นๆ ทั้งหมด ให้ไปต่อได้เลย
  return NextResponse.next();
}

// Config: กำหนดว่า middleware นี้จะทำงานกับหน้าไหนบ้าง (ยังคงเหมือนเดิม)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};