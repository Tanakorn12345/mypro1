"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function DeleteUserAccount() {
  const users = [
    { id: "L001", name: "John", email: "j@gmail.com", role: "Admin" },
    { id: "L002", name: "James", email: "Ja@gmail.com", role: "User" },
    { id: "L003", name: "Kevin", email: "K@gmail.com", role: "User" },
    { id: "L004", name: "Sarah", email: "Sa@gmail.com", role: "User" },
    { id: "L005", name: "Conie", email: "C@gmail.com", role: "Guest" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* ✅ Navbar */}
      <Navbar />

      <main className="flex flex-col items-center p-6 flex-grow">
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">👤</span>
          <h1 className="text-lg font-bold text-green-700">ผู้ดูแลระบบ</h1>
        </div>

        <h2 className="text-lg font-semibold mb-4">DELETE USER ACCOUNT</h2>

        {/* Search Bar */}
        <div className="flex w-full max-w-2xl mb-6">
          <input
            type="text"
            placeholder="Search user"
            className="flex-1 rounded-l-xl bg-[#f3ece6] py-2 px-4 outline-none"
          />
          <button className="bg-[#e37c41] text-white px-5 py-2 rounded-r-xl text-lg">
            🔍
          </button>
        </div>

        {/* Table */}
        <div className="w-full max-w-5xl bg-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#b4e197] text-left">
                <th className="py-3 px-4">USER ID</th>
                <th className="py-3 px-4">USER NAME</th>
                <th className="py-3 px-4">EMAIL</th>
                <th className="py-3 px-4">ROLE</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-[#fff8d6] border-t border-gray-200">
                  <td className="py-3 px-4 flex items-center space-x-2">
                    <button className="bg-green-500 text-white rounded-full px-3 py-1 text-xs hover:bg-green-600">
                      DELETE
                    </button>
                    <span>{user.id}</span>
                  </td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Confirm Button */}
          <div className="flex justify-end p-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded-lg">
              Confirm
            </button>
          </div>
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
