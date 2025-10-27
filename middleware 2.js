// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth-token')?.value;

  // หน้าสาธารณะที่เข้าได้โดยไม่ต้องล็อกอิน
  const isPublicPage = pathname === '/login' || pathname.startsWith('/register');

  // ถ้ายังไม่ล็อกอิน และพยายามจะไปหน้าที่ไม่ใช่หน้าสาธารณะ (และไม่ใช่หน้า Home)
  if (!authToken && !isPublicPage && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ถ้าล็อกอินแล้ว แต่พยายามจะกลับไปหน้า login/register ให้ส่งไปหน้า Home แทน
  if (authToken && isPublicPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // กรณีอื่นๆ ทั้งหมด ให้ไปต่อได้เลย
  return NextResponse.next();
}

// Config เหมือนเดิม
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};