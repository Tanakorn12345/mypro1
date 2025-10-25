"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

// ข้อมูลตัวอย่าง
const initialMenuData = [
  { id: "L001", name: "Chicken fried", restaurant: "KFC", price: 35, status: "Active" },
  { id: "L002", name: "Rice bowl", restaurant: "KFC", price: 34, status: "Pending" },
  { id: "L003", name: "Coke", restaurant: "KFC", price: 35, status: "Active" },
  { id: "L004", name: "Chicken pop", restaurant: "KFC", price: 38, status: "Active" },
  { id: "L005", name: "French Fries", restaurant: "KFC", price: 40, status: "Active" },
];

const formatPrice = (p) => `${Number(p)}`;

export default function UpdateSelectionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState(initialMenuData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // (ใส่โค้ด useEffect สำหรับ fetch data มาไว้ตรงนี้ได้เลย)

  const filteredMenu = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return menus;
    return menus.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.id.toLowerCase().includes(term) ||
        m.restaurant.toLowerCase().includes(term)
    );
  }, [menus, searchTerm]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Update Menu</h1>
          <p className="text-gray-700">Select a menu item to update.</p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search goods to update"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-12 rounded-full bg-[#f1eeee] px-6 text-gray-700 focus:outline-none"
          />
          <button className="w-32 h-12 rounded-xl bg-[#d67a42] text-black font-medium flex items-center justify-center gap-2">
            <MagnifyingGlassIcon className="w-6 h-6" />
            <span>Search</span>
          </button>
        </div>

        {/* Table of items */}
        <div className="bg-[#f3efef] rounded-xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[720px]">
              <thead>
                <tr>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">MENU ID</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">MENU NAME</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">RESTAURANT</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">PRICE</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredMenu.map((menu) => (
                  <tr key={menu.id}>
                    <td className="py-4 px-4">{menu.id}</td>
                    <td className="py-4 px-4">{menu.name}</td>
                    <td className="py-4 px-4">{menu.restaurant}</td>
                    <td className="py-4 px-4">{formatPrice(menu.price)}</td>
                    <td className="py-4 px-4">
                      {/* 🎯 ปุ่มนี้จะลิงก์ไปยังหน้ารายละเอียดของแต่ละเมนู */}
                      <Link href={`/manage/update/${menu.id}`}>
                        <span className="bg-[#A6D6B0] text-black font-semibold text-xs px-4 py-2 rounded-full shadow hover:bg-[#8cc99b] transition cursor-pointer">
                          UPDATE
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-start mt-6">
            <Link href="/manage/overview">
                <button className="bg-[#5FA373] hover:bg-[#4e8c63] text-white px-8 py-3 rounded-lg shadow">
                    &larr; Back to Overview
                </button>
            </Link>
        </div>
      </main>
    </div>
  );
}