"use client";


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AuthFormComponent } from '../components/AuthForm';
import { useCustomerAuth } from '../hooks/useCustomerAuth';
import { useShopAuth } from '../hooks/useShopAuth';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAuth } from '../context/AuthContext';

const Background = dynamic(() => import('../components/Background'), { ssr: false });

// (SVG Icons ต่างๆ)
const CustomerIcon = ({ className }) => ( <svg>{/* ... */}</svg> );
const ShopIcon = ({ className }) => ( <svg>{/* ... */}</svg> );
const AdminIcon = ({ className }) => ( <svg>{/* ... */}</svg> );

export default function LoginForm() {
    const [selectedRole, setSelectedRole] = useState(null);
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(); // ดึงแค่ loading กับ isAuthenticated ก็พอ

    const customerAuth = useCustomerAuth();
    const shopAuth = useShopAuth();
    const adminAuth = useAdminAuth();

    // 🎯 สร้างฟังก์ชัน handleSubmit ใหม่สำหรับแต่ละ Role
    const handleCustomerSubmit = async (e) => {
        e.preventDefault();
        const success = await customerAuth.handleSubmit(e); // รอให้ login เสร็จ
        if (success) {
            router.push('/'); // ถ้าสำเร็จ ค่อย redirect
        }
    };

    const handleShopSubmit = async (e) => {
        e.preventDefault();
        const success = await shopAuth.handleSubmit(e);
        if (success) {
            router.push('/manage');
        }
    };

    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        const success = await adminAuth.handleSubmit(e);
        if (success) {
            router.push('/manage/overview');
        }
    };
    
    // ถ้ากำลังโหลด หรือถ้าล็อกอินแล้ว (กันกรณีเข้ามาหน้านี้ตรงๆ) ให้แสดง Loading
    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
      }
      
    
    return (
        <>
            <Background />

            {!selectedRole ? (
                <main className="bg-white p-6 sm:px-10 sm:py-8 rounded-3xl shadow-xl w-[90%] max-w-[500px] flex flex-col gap-5 mx-auto mt-12 mb-12">
                    {/* ... ส่วนเลือก Role ... */}
                </main>
            ) : (
                <main className="flex justify-center mt-12 mb-12 px-4">
                    {selectedRole === 'customer' && (
                        <AuthFormComponent 
                            title="LOGIN FOR CUSTOMER" 
                            {...customerAuth} 
                            handleSubmit={handleCustomerSubmit} // 🎯 ส่งฟังก์ชันใหม่เข้าไป
                        />
                    )}
                    {selectedRole === 'shop' && (
                        <AuthFormComponent 
                            title="LOGIN FOR SHOP" 
                            {...shopAuth}
                            handleSubmit={handleShopSubmit} // 🎯 ส่งฟังก์ชันใหม่เข้าไป
                        />
                    )}
                    {selectedRole === 'admin' && (
                        <AuthFormComponent 
                            title="LOGIN FOR ADMIN" 
                            {...adminAuth}
                            handleSubmit={handleAdminSubmit} // 🎯 ส่งฟังก์ชันใหม่เข้าไป
                        />
                    )}
                </main>
            )}
        </>
    );
}