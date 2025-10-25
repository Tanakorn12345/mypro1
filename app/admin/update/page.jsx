"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react"; // ใช้ icon ผู้ใช้

export default function UpdateUserPage({ params }) {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    phone: "",
    email: "",
  });

  const userId = params?.id || ""; // รองรับ dynamic route เช่น /admin/update/[id]

  // ดึงข้อมูลผู้ใช้มาใส่ในฟอร์ม
  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("User updated successfully!");
    router.push("/admin/users");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto">
        {/* ส่วนหัว */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center text-lg font-bold text-green-700">
            <span className="text-2xl mr-2">👤</span> ผู้ดูแลระบบ
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-6">UPDATE USER ACCOUNT</h1>

        {/* กล่องฟอร์ม */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-6 shadow-inner relative"
        >
          {/* ไอคอนผู้ใช้ด้านขวา */}
          <div className="absolute right-8 top-8 bg-green-200 rounded-full p-2">
            <User className="text-green-700 w-6 h-6" />
          </div>

          {/* Username */}
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

          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-1">FULL NAME</label>
            <input
              type="text"
              value={form.fullname}
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              className="w-full bg-orange-50 rounded-full px-4 py-2 outline-none"
              required
            />
          </div>

          {/* Phone */}
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

          {/* Email */}
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

          {/* ปุ่ม */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={() => router.push("/admin/users")}
              className="bg-green-400 text-white font-semibold px-10 py-2 rounded-full hover:bg-green-500"
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white font-semibold px-10 py-2 rounded-full hover:bg-green-600"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
