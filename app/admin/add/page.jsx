"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function AddUserPage() {
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("User added successfully!");
    setForm({
      username: "",
      fullname: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto">
        {/* หัวข้อ */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center text-lg font-bold text-green-700">
            <span className="text-2xl mr-2">👤</span> ผู้ดูแลระบบ
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-6">ADD NEW USER</h1>

        {/* กล่องฟอร์ม */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-6 shadow-inner"
        >
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

          {/* Full name */}
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

          {/* Phone number */}
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

          {/* Submit button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white font-semibold px-10 py-2 rounded-full hover:bg-green-600"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
