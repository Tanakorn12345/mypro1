"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const initialMenuData = [
  { id: "L001", name: "Chicken fried", restaurant: "KFC", price: 35, status: "Active" },
  { id: "L002", name: "Rice bowl", restaurant: "KFC", price: 34, status: "Pending" },
  { id: "L003", name: "Coke", restaurant: "KFC", price: 35, status: "Active" },
  { id: "L004", name: "Chicken pop", restaurant: "KFC", price: 38, status: "Active" },
  { id: "L005", name: "French Fries", restaurant: "KFC", price: 40, status: "Active" },
];

const formatPrice = (p) => `${Number(p)}`;

export default function OverviewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState(initialMenuData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- 🎯 ส่วนที่เพิ่มเข้ามา ---
  // ดึงข้อมูลจาก Backend เมื่อ Component โหลดเสร็จ
  useEffect(() => {
    let mounted = true;

    const fetchMenus = async () => {
      setLoading(true);
      setError(null);
      try {
        // ลองยิง API ไปที่ Backend ของคุณ
        const res = await fetch("/api/menus"); // <-- ปรับ path ตาม backend ของคุณ
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data = await res.json();
        
        // ถ้าสำเร็จ ให้อัปเดต state ด้วยข้อมูลจาก server
        if (mounted && Array.isArray(data)) setMenus(data);
      } catch (err) {
        // ถ้า API ล้มเหลว จะใช้ข้อมูล fallback ที่มีอยู่ (initialMenuData)
        console.warn("Fetch menus failed, using fallback:", err);
        setError("Could not load data from the server — using local data instead.");
      } finally {
        // ไม่ว่าจะสำเร็จหรือล้มเหลว ให้หยุด loading
        if (mounted) setLoading(false);
      }
    };

    fetchMenus();
    return () => {
      mounted = false; // Cleanup function
    };
  }, []); // ทำงานแค่ครั้งเดียวตอนเปิดหน้า

  // ... (โค้ดส่วน useMemo สำหรับ filter data เหมือนเดิม) ...
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
          <h1 className="text-2xl font-semibold  decoration-black/80 decoration-2 mb-1">
            Product Overview
          </h1>
          <p className="text-gray-700">Overview Menu</p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search goods"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-12 rounded-full bg-[#f1eeee] px-6 text-gray-700 focus:outline-none"
            disabled={loading} // 👈 ปิดการใช้งานตอนโหลด
          />
          <button
            aria-label="Search"
            className="w-32 h-12 rounded-xl bg-[#d67a42] hover:bg-[#c86f36] text-black font-medium flex items-center justify-center gap-2 transition disabled:opacity-60"
            disabled={loading} // 👈 ปิดการใช้งานตอนโหลด
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#f3efef] rounded-xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[720px]">
              <thead>
                <tr>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">MENU ID</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">MENU NAME</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">RESTAURANT NAME</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">PRICE</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">STATUS</th>
                  
                </tr>
              </thead>
              <tbody>
                {/* 🎯 ส่วนที่เพิ่มเข้ามา: แสดง Loading และข้อความเมื่อไม่พบข้อมูล */}
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredMenu.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No menus found.
                    </td>
                  </tr>
                ) : (
                  filteredMenu.map((menu) => (
                    <tr key={menu.id}>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3">{menu.id}</div></td>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3">{menu.name}</div></td>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3">{menu.restaurant}</div></td>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3">{formatPrice(menu.price)}</div></td>
                      <td className="py-4 px-4"><div className="bg-[#fff9c7] rounded-full px-6 py-3">{menu.status}</div></td>
                      <td className="py-4 px-4">
                        
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mt-8">
          
          <Link href="/manage/update">
            <button className="bg-[#5FA373] hover:bg-[#4e8c63] text-white px-8 py-3 rounded-lg shadow">
              UPDATE MENU
            </button>
          </Link>
          <Link href="/manage/delete">
            <button className="bg-[#5FA373] hover:bg-[#4e8c63] text-white px-8 py-3 rounded-lg shadow">
              DELETE MENU
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}