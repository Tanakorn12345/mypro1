"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link"; // <-- Commented out due to build error
import Navbar from "../../components/Navbar"; // <-- Commented out for Canvas
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"; // <-- เพิ่ม ArrowLeftIcon
import { Loader2 } from "lucide-react"; // <-- เพิ่ม Loader2

// --- ลบ initialMenuData ออก ---
/*
const initialMenuData = [ ... ]; 
*/

const formatPrice = (p) => `${Number(p)}`;

export default function OverviewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // --- 1. เพิ่ม State สำหรับ menus, loading, error ---
  const [menus, setMenus] = useState([]); // เริ่มต้นเป็น Array ว่าง
  const [loadingMenus, setLoadingMenus] = useState(true); // เริ่มต้น loading
  const [errorMenus, setErrorMenus] = useState(null);

  // --- 2. เพิ่ม useEffect สำหรับ fetch เมนู ---
  useEffect(() => {
    const fetchMenus = async () => {
      setLoadingMenus(true);
      setErrorMenus(null);
      try {
        const res = await fetch("/api/manage/menus", { cache: 'no-store' }); // <-- เรียก API menus
        if (!res.ok) {
           // ลองอ่าน Error message จาก Backend
           let errorMsg = `Failed to fetch menus. Status: ${res.status}`;
           try { 
              const errorData = await res.json(); 
              errorMsg = errorData.message || errorMsg;
           } catch (e) {}
           throw new Error(errorMsg);
        }
        const data = await res.json();
        
        // ตรวจสอบว่า data.menus เป็น Array จริงๆ ก่อน set
        if (Array.isArray(data.menus)) {
            setMenus(data.menus);
        } else {
            console.warn("API response for menus is not an array:", data);
            setMenus([]); // ถ้าไม่ใช่ Array ให้เป็นค่าว่างไปก่อน
        }

      } catch (err) {
        console.error("Fetch menus error:", err);
        setErrorMenus(err.message);
      } finally {
        setLoadingMenus(false); // หยุด loading
      }
    };

    fetchMenus();
  }, []); // ทำงานแค่ครั้งเดียวตอนเปิดหน้า

  // --- ใช้ `menus` state ที่มาจาก API ในการกรอง ---
  const filteredMenu = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return menus;
    // --- ปรับแก้ Field ในการกรองให้ตรงกับตาราง Menu ---
    return menus.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.Menu_Id.toString().toLowerCase().includes(term) || // ใช้ Menu_Id (ถ้ามี)
        m.category.toLowerCase().includes(term) // กรองตาม category ได้ด้วย
        // m.restaurant.toLowerCase().includes(term) // อาจจะไม่ต้องมี ถ้าดึงเฉพาะร้านตัวเอง
    );
  }, [menus, searchTerm]);

  // +++ เพิ่มฟังก์ชันสำหรับปุ่ม Add Menu (ชั่วคราว) +++
  const handleAddMenu = () => {
      console.log("(Mock) Redirecting to add menu page...");
      window.location.href = '/manage/add-menu'; // ใช้ window.location.href ชั่วคราว
  };


  return (
    <div className="bg-white min-h-screen">
       <Navbar /> 
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold decoration-black/80 decoration-2 mb-1">
            Product Overview
          </h1>
          <p className="text-gray-700">Manage your menu items here.</p>
          {/* --- แสดง Error ถ้ามี --- */}
          {errorMenus && <p className="mt-2 text-sm text-red-600">Error loading menus: {errorMenus}</p>}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search menu by name, ID, or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-12 rounded-full bg-[#f1eeee] px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={loadingMenus} // ปิดตอนโหลดเมนู
          />
          <button
            aria-label="Search"
            className="w-auto h-12 rounded-xl bg-[#d67a42] hover:bg-[#c86f36] text-black font-medium flex items-center justify-center gap-2 transition px-5 py-3 disabled:opacity-60"
            disabled={loadingMenus} // ปิดตอนโหลดเมนู
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
      <th className="bg-[#B9E8B8] text-left py-4 px-6">CATEGORY</th>
      <th className="bg-[#B9E8B8] text-left py-4 px-6">PRICE</th>
      <th className="bg-[#B9E8B8] text-left py-4 px-6">STATUS</th>
      <th className="bg-[#B9E8B8] text-center py-4 px-6">ACTIONS</th>
    </tr>
  </thead>

  <tbody>
    {loadingMenus && (
      <tr>
        <td colSpan={6} className="text-center py-8 text-gray-500">
          <Loader2 className="w-6 h-6 inline mr-2 animate-spin" /> Loading menus...
        </td>
      </tr>
    )}

    {!loadingMenus && errorMenus && (
      <tr>
        <td colSpan={6} className="text-center py-8 text-red-500">
          Failed to load menus. Please try again.
        </td>
      </tr>
    )}

    {!loadingMenus && !errorMenus && filteredMenu.length === 0 && (
      <tr>
        <td colSpan={6} className="text-center py-8 text-gray-500">
          No menus found. Add your first menu!
        </td>
      </tr>
    )}

    {!loadingMenus && !errorMenus && filteredMenu.length > 0 &&
      filteredMenu.map((Menu) => (
        <tr key={Menu.Menu_Id}>
          <td className="py-4 px-4">
            <div className="bg-[#fff9c7] rounded-full px-6 py-3">{Menu.Menu_Id}</div>
          </td>
          <td className="py-4 px-4">
            <div className="bg-[#fff9c7] rounded-full px-6 py-3">{Menu.name}</div>
          </td>
          <td className="py-4 px-4">
            <div className="bg-[#fff9c7] rounded-full px-6 py-3">{Menu.category}</div>
          </td>
          <td className="py-4 px-4">
            <div className="bg-[#fff9c7] rounded-full px-6 py-3">{formatPrice(Menu.price)}</div>
          </td>
          <td className="py-4 px-4">
            <div
              className={`rounded-full px-6 py-3 text-center text-xs font-medium ${
                Menu.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {Menu.is_available ? 'Available' : 'Unavailable'}
            </div>
          </td>
          <td className="py-4 px-4">
            <div className="flex justify-center gap-2">
              <Link href={`/manage/update/${Menu.Menu_Id}`}> ... Edit Button ... </Link>
              <button onClick={() => handleDeleteMenu(Menu.Menu_Id)}> ... Delete Button ... </button>
            </div>
          </td>
        </tr>
      ))}
  </tbody>
</table>

          </div>
        </div>

        {/* Action Buttons: เปลี่ยนเป็นปุ่ม Add Menu และ Back */}
        <div className="flex justify-between items-center gap-4 mt-8">
           {/* ปุ่ม Back กลับไปหน้า Manage Home */}
           <button 
             onClick={() => { /* router.back() */ window.history.back(); }} // ใช้ tạm thời
             className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow flex items-center gap-2"
           >
              <ArrowLeftIcon className="w-5 h-5"/> Back
           </button>

           {/* ปุ่ม Add Menu (ควรจะลิงก์ไปหน้า Add Menu Form) */}
          <Link href="/manage/add-menu"> 
            <button 
              onClick={handleAddMenu} // <-- เปลี่ยนเป็น onClick ชั่วคราว
              className="bg-[#5FA373] hover:bg-[#4e8c63] text-white px-8 py-3 rounded-lg shadow"
            >
              ADD MENU
            </button>
          </Link> 
          {/* <Link href="/manage/delete"> ... Delete Menu Button (อาจจะไม่ต้องมีตรงนี้) ... </Link> */}
        </div>
      </main>
    </div>
  );
}

