"use client"
import React, { useState, useEffect, useMemo } from "react";
import { Search, Trash2, Edit, Loader2, X } from "lucide-react"; 
import Navbar from "../components/Navbar"; // <-- Commented out due to build error
import Link from 'next/link'; // <-- Commented out due to build error

// --- Mock User Data (เหมือนเดิม) ---
const mockUserData = [
  { id: "U001", name: "HOTPOT MAN (Mock)", email: "contact@hotpotman.com", role: "Admin", status: "Active" },
  { id: "U002", name: "BBQ KING (Mock)", email: "info@bbqking.com", role: "Staff", status: "Pending" },
  { id: "U003", name: "SHABU QUEEN (Mock)", email: "admin@shabuqueen.com", role: "Staff", status: "Active" },
];

// +++ 1. ดึง Modal Component มาจากหน้า Delete +++
function ConfirmationModal({ user, onConfirm, onCancel, isDeleting }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete the user:{" "}
          <strong className="font-semibold">{user.name}</strong> ({user.email})? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}


// --- หน้า Admin Home หลัก ---
function AdminHome() {
  const [users, setUsers] = useState(mockUserData); 
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // +++ 2. เพิ่ม State สำหรับ Modal +++
  const [userToDelete, setUserToDelete] = useState(null); // เก็บข้อมูล user ที่จะลบ
  const [isDeleting, setIsDeleting] = useState(false); // สถานะตอนกำลังลบ

  // ... (useEffect ที่ comment out ไว้) ...

  const getStatusClass = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUserData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  // +++ 3. แก้ไขฟังก์ชัน Delete ให้เปิด Modal +++
  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      console.log(`(ในอนาคต) ส่งคำขอลบ user: ${userToDelete.name} (ID: ${userToDelete.id})`);
      
      // --- (ในอนาคต) uncomment ส่วนนี้เพื่อยิง API ลบข้อมูล ---
      /*
      const res = await fetch(`/api/users/${userToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete user.');
      }
      */
      
      // จำลองการดีเลย์ของ API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // ถ้าสำเร็จ, อัปเดต State ในหน้าเว็บทันที (ลบ user ออกจาก list)
      setUsers(currentUsers => currentUsers.filter(u => u.id !== userToDelete.id));
      handleCloseDeleteModal();

    } catch (err) {
      console.error("Delete Error:", err);
      // (ในอนาคต) ควรมีการแจ้งเตือน Error ที่สวยงาม
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (userId) => {
    console.log(`(ในอนาคต) ไปที่หน้า Edit ของ user ID: ${userId}`);
    // เมื่อแก้ import "Link" แล้ว ให้ใช้:
    // window.location.href = `/admin/update/${userId}`;
  };

  const handleAddUser = () => {
    console.log("(Mock) Redirecting to add user page...");
    window.location.href = '/admin/add'; // 🎯 ใช้ window.location.href ชั่วคราว
  };


  return (
    <div className="bg-white min-h-screen">
       <Navbar /> 

      {/* +++ 4. เพิ่ม Modal เข้ามาในหน้าเว็บ +++ */}
      <ConfirmationModal
        user={userToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
        isDeleting={isDeleting}
      />

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold  decoration-black/80 decoration-2 mb-1">
          ADMIN
        </h1>
        <p className="text-gray-700 mb-6">ADMIN USER MANAGEMENT</p> 

        {/* ... (Search bar และ Error Message เหมือนเดิม) ... */}
         <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.g.target.value)}
            className="flex-1 h-12 rounded-full bg-[#f1eeee] px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={loading}
          />
          <button 
            className="w-auto h-12 rounded-xl bg-[#d67a42] hover:bg-[#c86f36] text-black font-medium flex items-center justify-center gap-2 transition px-5 py-3"
            disabled={loading}
          >
            <Search size={18} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* ตาราง (เหมือนเดิม) */}
        <div className="bg-[#f3efef] rounded-xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[720px]">
              <thead>
                <tr>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">USER ID</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">NAME</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">EMAIL</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">ROLE</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">STATUS</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">Loading...</td></tr>
                ) : filteredUserData.length === 0 ? ( 
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">No users found.</td></tr>
                ) : (
                  filteredUserData.map((data) => ( 
                    <tr key={data.id}>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3">{data.id}</div></td>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3">{data.name}</div></td>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3 underline text-blue-700 cursor-pointer">{data.email}</div></td>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3">{data.role}</div></td>
                      <td className="py-4 px-4">
                        <div className={`rounded-full px-6 py-3 text-center font-medium ${getStatusClass(data.status)}`}>
                          {data.status}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/update/${data.id}`}> 
                            <button 
                              onClick={() => handleEdit(data.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-full transition"
                            >
                              <Edit size={16} />
                            </button>
                          </Link> 
                          <button 
                            onClick={() => handleOpenDeleteModal(data)} // <-- 5. แก้ไขปุ่ม Delete
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-full transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ปุ่ม Add User (เหมือนเดิม) */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Link href="/admin/add">
            <button 
              onClick={handleAddUser} // 🎯 เราเชื่อม onClick ไว้ตรงนี้
              className="bg-[#5FA373] hover:bg-[#4e8c63] text-white px-8 py-3 rounded-lg shadow"
            >
              ADD USER
            </button>
           </Link> 
        </div>
      </main>
    </div>
  );
}

export default AdminHome;

