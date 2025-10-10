"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Card() {
  const router = useRouter(); // ✅ ประกาศ router ที่นี่
  return (
    <div className="flex flex-row flex-wrap gap-7 p-4 justify-center">
      <div className="max-w-sm w-full sm:w-72 md:w-80 lg:w-75 rounded-2xl shadow-lg bg-white overflow-visible">
        {/* รูปภาพ */}
        <img
          className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover rounded-t-2xl"
          src="https://plus.unsplash.com/premium_vector-1713201017274-e9e97d783e75?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Sunset in the mountains"
        />

        {/* เนื้อหา */}
        <div className="px-6 py-5">
          {/* ชื่อร้าน */}
          <div className="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75a17.9 17.9 0 0 1-7.5-1.632Z"
              />
            </svg>
            <div className="font-bold text-lg sm:text-xl">KFC</div>
          </div>

          {/* สาขา */}
          <div className="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21M3.75 21V9.35a3 3 0 0 0 3.75-.61 3 3 0 0 0 2.25 1.01c.9 0 1.7-.39 2.25-1.01a3 3 0 0 0 3.75.61M3.75 9.35a3 3 0 0 1-.62-4.72L4.32 3.44A1.5 1.5 0 0 1 5.38 3h13.24a1.5 1.5 0 0 1 1.06.44l1.19 1.19a3 3 0 0 1-.62 4.72"
              />
            </svg>
            <div className="font-bold text-lg sm:text-xl">PTT BANG WAEK</div>
          </div>

          {/* เรตติ้ง */}
          <div className="flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.12 5.11a.56.56 0 0 0 .48.35l5.52.44a.56.56 0 0 1 .32.99l-4.2 3.6a.56.56 0 0 0-.18.56l1.28 5.38a.56.56 0 0 1-.84.61l-4.73-2.89a.56.56 0 0 0-.59 0l-4.72 2.89a.56.56 0 0 1-.84-.61l1.28-5.38a.56.56 0 0 0-.18-.56L2.93 10.39a.56.56 0 0 1 .32-.99l5.52-.44a.56.56 0 0 0 .48-.35l2.13-5.11Z"
              />
            </svg>
            <div className="font-bold text-lg sm:text-xl">4.0</div>
          </div>

          {/* ปุ่ม */}
          <button onClick={() => router.push("/shop")}
            className="bg-green-500 px-4 py-2 text-white rounded-md hover:bg-green-600 transition-all w-fit"
          >
            See more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
