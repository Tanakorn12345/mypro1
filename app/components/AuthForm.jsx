"use client";

import { useRouter } from 'next/navigation';

const AuthForm = ({ title, formData, error, handleChange, handleSubmit }) => {
    const router = useRouter(); 

    const handleCreateAccountClick = () => {
        // ดึงคำสุดท้ายจาก title (เช่น "CUSTOMER") แล้วแปลงเป็นตัวพิมพ์เล็ก ("customer")
        const role = title.split(' ').pop().toLowerCase();

        // สร้าง URL ใหม่แล้วส่งผู้ใช้ไปที่หน้า /register พร้อมแนบ Role ไปด้วย
        router.push(`/register?role=${role}`);
    };

    return (
        // --- Main Card ---
        <div className="w-[95%] sm:w-full max-w-md bg-white rounded-3xl shadow-xl p-5 sm:p-8">
            
            {/* --- Title --- */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
                {title.toUpperCase()}
            </h2>

            {/* --- Login Form --- */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                
                {/* --- Username Field --- */}
                <div>
                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                        Username
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-2.5 sm:py-3 bg-gray-200 border-none rounded-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                    />
                </div>

                {/* --- Password Field --- */}
                <div>
                    <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-2.5 sm:py-3 bg-gray-200 border-none rounded-full focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                    />
                </div>
                
                {error && <p className="text-xs sm:text-sm text-center text-red-600 pt-1">{error}</p>}

                {/* --- LOG IN Button --- */}
                <div className="pt-2 flex justify-end">
                    <button 
                        type="submit"
                        className="bg-[#81C784] text-white text-sm sm:text-base font-bold py-2 sm:py-2.5 px-5 sm:px-6 rounded-full hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition"
                    >
                        LOG IN
                    </button>
                </div>
            </form> {/* <-- ฟอร์มจบตรงนี้ --> */}

            {/* --- Create Account Button (อยู่นอกฟอร์ม) --- */}
            <div className="mt-6 sm:mt-8">
                 <button 
                    type="button"
                    onClick={handleCreateAccountClick}
                    className="w-full bg-[#66BB6A] text-white text-sm sm:text-base font-bold py-2.5 sm:py-3 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                >
                    I DON'T HAVE ACCOUNT / CREATE ACCOUNT
                </button>
            </div>
        </div>
    );
};

export default AuthForm;