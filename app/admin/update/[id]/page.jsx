"use client";

import Navbar from "../../../components/Navbar"; // <-- Commented out due to build error
// import Footer from "../../components/Footer"; // <-- Commented out due to build error
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // <-- Commented out due to build error
import { User, Loader2 } from "lucide-react"; 

export default function UpdateUserPage({ params }) {
  // const router = useRouter(); // <-- Commented out due to build error
  const [form, setForm] = useState({
    username: "",
    
    phone: "",
    email: "",
    role: "Customer", 
  });

  const userId = params?.id || "";

  // --- State สำหรับจัดการสถานะต่างๆ ---
  const [loading, setLoading] = useState(false); // <-- 1. เปลี่ยนเป็น false
  const [error, setError] = useState(null); 
  const [submitting, setSubmitting] = useState(false); 
  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" }); 

  // --- 2. คอมเมนต์ส่วนดึงข้อมูลผู้ใช้ออกไปก่อน ---
  /*
  useEffect(() => {
    if (!userId) {
        setError("User ID not found.");
        setLoading(false);
        return;
    }

    const fetchUserData = async () => {
        setLoading(true); // <-- อย่าลืมเปิด setLoading(true) กลับมา
        try {
            const res = await fetch(`/api/users/${userId}`); 
            if (!res.ok) {
                throw new Error(`Failed to fetch user data. Status: ${res.status}`);
            }
            const data = await res.json();
            setForm(data); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); 
        }
    };

    fetchUserData();
  }, [userId]);
  */
  
  // --- 3. ปรับปรุงการ Submit (คอมเมนต์ส่วน fetch ออก) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ message: "", type: "" }); 

    try {
        console.log("--- Mock Submit ---");
        console.log("User ID:", userId);
        console.log("Form Data:", JSON.stringify(form));
        
        // --- คอมเมนต์ส่วนยิง API ออกไปก่อน ---
        /*
        const res = await fetch(`/api/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Something went wrong.");
        }
        */

        // --- จำลองว่าสำเร็จ ---
        await new Promise(resolve => setTimeout(resolve, 1000)); // หน่วงเวลา 1 วิ
        
        setSubmitStatus({ message: "Mock update successful!", type: "success" });
        setTimeout(() => {
            // router.push("/admin/users") // <-- Commented out
            console.log("Redirecting to /admin/users...");
        }, 2000); 

    } catch (err) {
        setSubmitStatus({ message: err.message, type: "error" });
    } finally {
        setSubmitting(false);
    }
  };

  // --- UI สำหรับแสดงตอน Loading หรือ Error (ส่วนนี้จะทำงานถ้า userId หายไป) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
      </div>
    );
  }

  // --- 4. แก้ไข Error นี้ชั่วคราว (เพราะเรา comment useEffect ออก) ---
  /*
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <p className="text-xl text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-full"
          >
              Go Back
          </button>
      </div>
    );
  }
  */
  // --- แสดง Error เฉพาะตอน Submit (ถ้ามี) ---
  if (error) {
      console.error("Page error:", error);
  }


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold decoration-black/80 decoration-2 mb-1">ADMIN</h1>
        <p className="text-gray-700 mb-6">UPDATE USER ACCOUNT (ID: {userId || "Not Found"})</p>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-6 shadow-inner relative">
          <div>
            <label className="block font-semibold mb-1">USERNAME</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-orange-50 rounded-full px-4 py-2 outline-none"
              required
            />
          </div>

         
          <div>
              <label className="block font-semibold mb-1">ROLE</label>
              <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-orange-50 rounded-full px-4 py-2 outline-none appearance-none"
              >
                  <option value="Customer">Customer</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Admin">Admin</option>
                 
              </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">PHONE NUMBER</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-orange-50 rounded-full px-4 py-2 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">EMAIL</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-orange-50 rounded-full px-4 py-2 outline-none"
              required
            />
          </div>
          
          {submitStatus.message && (
            <div className={`p-3 rounded-lg text-center font-semibold ${
                submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
                {submitStatus.message}
            </div>
          )}

          <div className="flex justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={() => window.history.back()} 
              className="bg-gray-400 text-white font-semibold px-10 py-2 rounded-full hover:bg-gray-500"
              disabled={submitting} 
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white font-semibold px-10 py-2 rounded-full hover:bg-green-600 flex items-center justify-center disabled:opacity-60"
              disabled={submitting} 
            >
              {submitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {submitting ? "UPDATING..." : "UPDATE"}
            </button>
          </div>
        </form>
      </div>
      {/* <Footer /> */} 
    </div>
  );
}

