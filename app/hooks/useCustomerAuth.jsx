// hooks/useCustomerAuth.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useCustomerAuth = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null); // State สำหรับเก็บ Error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError(null); // เคลียร์ error เมื่อผู้ใช้เริ่มพิมพ์ใหม่
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // เคลียร์ error เก่าทุกครั้งที่กด submit

        try {
            // **นี่คือส่วนที่เชื่อมต่อ Frontend กับ Backend**
            const response = await fetch('/api/auth/customer-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // แปลงข้อมูลในฟอร์มเป็น JSON string
            });

            // ถ้า API ตอบกลับมาว่าสำเร็จ (status 200)
            if (response.ok) {
                // ส่งผู้ใช้ไปที่หน้า dashboard หรือหน้าหลักหลังล็อกอิน
                router.push('/'); // หรือ '/customer/dashboard'
            } else {
                // ถ้า API ตอบกลับมาว่ามีปัญหา (เช่น รหัสผิด status 401)
                const data = await response.json();
                setError(data.message || 'An error occurred.'); // แสดง error ที่ได้จาก API
            }

        } catch (err) {
            // กรณีที่ Network หรือ Server มีปัญหา
            console.error('Fetch error:', err);
            setError('Could not connect to the server.');
        }
    };

    return {
        formData,
        error,
        handleChange,
        handleSubmit,
    };
};