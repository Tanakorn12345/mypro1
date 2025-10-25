"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Search } from "lucide-react"; // ใช้ icon search จาก lucide-react

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center text-lg font-bold text-green-700">
            <span className="text-2xl mr-2">👤</span> ผู้ดูแลระบบ
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-2">
          ADMIN USER ACCOUNT MANAGEMENT
        </h1>

        {/* Search bar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search user"
            className="w-full border rounded-l-full px-4 py-2 bg-gray-100 focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="bg-orange-400 rounded-r-full px-4 py-2">
            <Search className="text-white" />
          </button>
        </div>

        {/* User Table */}
        <table className="w-full border-collapse overflow-hidden rounded-lg">
          <thead>
            <tr className="bg-green-200 text-gray-800">
              <th className="py-2 px-3 text-left">USER ID</th>
              <th className="py-2 px-3 text-left">USER NAME</th>
              <th className="py-2 px-3 text-left">EMAIL</th>
              <th className="py-2 px-3 text-left">ROLE</th>
              <th className="py-2 px-3 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, index) => (
              <tr
                key={u.id}
                className={`${
                  index % 2 === 0 ? "bg-yellow-50" : "bg-yellow-100"
                } border-b`}
              >
                <td className="py-2 px-3">{u.id}</td>
                <td className="py-2 px-3">{u.username}</td>
                <td className="py-2 px-3">{u.email}</td>
                <td className="py-2 px-3 capitalize">{u.role}</td>
                <td className="py-2 px-3">{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-green-400 text-white px-6 py-2 rounded-full font-medium hover:bg-green-500">
            ADD USER
          </button>
          <button className="bg-green-400 text-white px-6 py-2 rounded-full font-medium hover:bg-green-500">
            UPDATE USER
          </button>
          <button className="bg-green-400 text-white px-6 py-2 rounded-full font-medium hover:bg-green-500">
            DELETE USER
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
