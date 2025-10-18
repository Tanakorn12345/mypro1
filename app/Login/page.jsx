// app/login/page.jsx

import Navbar from '../components/Navbar';
import LoginForm from './LoginForm'; // 👈 Import Client Component เข้ามา

// ✅ สามารถ export metadata ได้
export const metadata = {
    title: 'Login Page',
    description: 'Login to our website',
  };
  
  // 2. แยก viewport ออกมาเป็น export ของตัวเองแบบนี้ ✅
  export const viewport = {
    width: 'device-width',
    initialScale: 1,
  };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <LoginForm /> {/* 👈 เรียกใช้งาน Component ที่มีการโต้ตอบ */}
    </div>
  );
}