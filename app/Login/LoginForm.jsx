"use client"; // 👈 ประกาศว่าเป็น Client Component

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import ส่วนประกอบและ Hooks ที่จำเป็น
import AuthForm from '../components/AuthForm';
import { useCustomerAuth } from '../hooks/useCustomerAuth';
import { useShopAuth } from '../hooks/useShopAuth';
import { useAdminAuth } from '../hooks/useAdminAuth';

// Import component 'Background' แบบ dynamic
const Background = dynamic(() => import('../components/Background'), { ssr: false });

// SVG Icons ฉบับเต็ม
const CustomerIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={className}>
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
    </svg>
);

const ShopIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={className}>
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
    </svg>
);

const AdminIcon = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={className}>
        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.004a.274.274 0 0 1-.014.004H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 1 1 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.853.918-1.025 2.116-1.64 3.608-1.734a5.876 5.876 0 0 0-1.76-1.126zM5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m-3-2a3 3 0 1 1 6 0 3 3 0 0 1-6 0"/>
    </svg>
);

export default function LoginForm() {
    const [selectedRole, setSelectedRole] = useState(null);

    // เรียกใช้ Hooks เพื่อเตรียม Logic ไว้
    const customerAuth = useCustomerAuth();
    const shopAuth = useShopAuth();
    const adminAuth = useAdminAuth();
    
    return (
        <>
            <Background />

            {/* --- Logic การสลับหน้าจอ --- */}
            {!selectedRole ? (
                // **ถ้ายังไม่ได้เลือก Role:** แสดงการ์ดให้เลือก
                <main className="bg-white p-6 sm:px-10 sm:py-8 rounded-3xl shadow-xl w-[90%] max-w-[500px] flex flex-col gap-5 mx-auto mt-12 mb-12">
                    <h2 className="text-center text-2xl mb-3 text-gray-800">Select for login</h2>
                    
                    <button className="flex items-center w-full p-4 border-none rounded-[20px] bg-[#e8f5e9] text-left transition-all duration-200 ease-in-out hover:bg-[#dcedc8] hover:-translate-y-0.5" onClick={() => setSelectedRole('customer')}>
                        <div className="mr-5 text-green-700"><CustomerIcon className="w-8 h-8"/></div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-green-800">Customer</span>
                            <span className="text-sm text-gray-600">Customers interested in our services</span>
                        </div>
                    </button>
                    
                    <button className="flex items-center w-full p-4 border-none rounded-[20px] bg-[#e8f5e9] text-left transition-all duration-200 ease-in-out hover:bg-[#dcedc8] hover:-translate-y-0.5" onClick={() => setSelectedRole('shop')}>
                         <div className="mr-5 text-green-700"><ShopIcon className="w-8 h-8"/></div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-green-800">Shop / Market / Grocery</span>
                            <span className="text-sm text-gray-600">Selling fresh produce, ingredients, supplies, and more.</span>
                        </div>
                    </button>

                    <button className="flex items-center w-full p-4 border-none rounded-[20px] bg-[#e8f5e9] text-left transition-all duration-200 ease-in-out hover:bg-[#dcedc8] hover:-translate-y-0.5" onClick={() => setSelectedRole('admin')}>
                         <div className="mr-5 text-green-700"><AdminIcon className="w-8 h-8"/></div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-green-800">Admin</span>
                            <span className="text-sm text-gray-600">System Administrator</span>
                        </div>
                    </button>
                </main>
            ) : (
                // **ถ้าเลือก Role แล้ว:** แสดงฟอร์มล็อกอิน
                <main className="flex justify-center mt-12 mb-12 px-4">
                    {selectedRole === 'customer' && (
                        <AuthForm title="LOGIN FOR CUSTOMER" {...customerAuth} />
                    )}
                    {selectedRole === 'shop' && (
                        <AuthForm title="LOGIN FOR SHOP" {...shopAuth} />
                    )}
                    {selectedRole === 'admin' && (
                        <AuthForm title="LOGIN FOR ADMIN" {...adminAuth} />
                    )}
                </main>
            )}
        </>
    );
}