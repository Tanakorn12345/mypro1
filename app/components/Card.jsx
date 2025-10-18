"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from '../context/AuthContext';

function Card({ restaurant }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // <-- ดึงสถานะการล็อกอินมาใช้
  const handleClick = () => {
    // ถ้าล็อกอินแล้ว ให้ไปที่หน้าร้านอาหาร
    if (isAuthenticated) {
      router.push(`/shop/${restaurant.id}`);
    } else {
      // ถ้ายังไม่ล็อกอิน ให้ไปที่หน้า login
      router.push('/login');
    }
  };
  if (!restaurant) return null;

  const { name, branch, rating, image, slug } = restaurant;
  const shopUrl = `/shop/${slug}`;

  return (
    <div onClick={handleClick} className="max-w-xs w-full sm:w-64 md:w-72 rounded-2xl shadow-lg bg-white overflow-visible transition-transform duration-300 hover:scale-105 flex flex-col">
      <img
        className="w-full h-48 object-cover cursor-pointer rounded-t-2xl"
        src={image}
        alt={name}
        onClick={() => router.push(shopUrl)}
      />
      
      {/* ใช้ flex-grow เพื่อให้เนื้อหาส่วนนี้ขยายเต็มพื้นที่ที่เหลือ 
        และใช้ flex flex-col d-flex flex-column เพื่อจัดวางปุ่มให้อยู่ล่างสุด
      */}
      <div className="px-4 py-4 flex-grow flex flex-col">
        {/* ชื่อร้าน + ไอคอน User */}
        <div className="flex items-center gap-2 mb-1">
          <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75a17.9 17.9 0 0 1-7.5-1.632Z" />
          </svg>
          <div className="font-bold text-lg truncate">{name}</div>
        </div>

        {/* สาขา + ไอคอน Store */}
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21M3.75 21V9.35a3 3 0 0 0 3.75-.61 3 3 0 0 0 2.25 1.01c.9 0 1.7-.39 2.25-1.01a3 3 0 0 0 3.75.61M3.75 9.35a3 3 0 0 1-.62-4.72L4.32 3.44A1.5 1.5 0 0 1 5.38 3h13.24a1.5 1.5 0 0 1 1.06.44l1.19 1.19a3 3 0 0 1-.62 4.72" />
          </svg>
          <p className="text-gray-600 text-sm">{branch}</p>
        </div>

        {/* เรตติ้ง + ไอคอนดาว */}
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
          </svg>
          <p className="text-gray-500 text-sm">{rating}</p>
        </div>
        
        {/* ใช้ mt-auto เพื่อดันปุ่มลงไปอยู่ข้างล่างสุด */}
        <div className="mt-auto pt-4"> 
          <button
            onClick={() => router.push(shopUrl)}
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            See more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;