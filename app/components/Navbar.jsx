"use client";
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white p-2 flex flex-row justify-between items-center relative  z-50">
      {/* โลโก้ */}
      <Link
        href="/"
        className="p-2 text-black font-bold text-base sm:text-xl"
      >
        LINE GIRL
      </Link>

      {/* ปุ่มแฮมเบอร์เกอร์ + โปรไฟล์ */}
      <div className="flex items-center space-x-4">
        {/* ปุ่มแฮมเบอร์เกอร์ (มือถือเท่านั้น) */}
        <button
          className="sm:hidden p-2 text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            // ปุ่มกากบาท
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // ปุ่มสามขีด
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* โปรไฟล์ */}
        <Link href="/Login">
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="w-8 h-8 sm:w-9 sm:h-9 text-black bg-green-400 rounded-full p-1">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 
              9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 
              21a8.966 8.966 0 0 1-5.982-2.275M15 
              9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </Link>
      </div>

      {/* เมนู (desktop) */}
      <ul className="hidden sm:flex flex-row space-x-4 p-2 text-black font-bold absolute right-20">
        <li><Link href="/">HOME</Link></li>
        <li><Link href="#">ORDER</Link></li>
        <li><Link href="#">ABOUT</Link></li>
        <li><Link href="/search">SEARCH</Link></li>
        <li><Link href="#">INBOX</Link></li>
      </ul>

      {/* เมนู (mobile dropdown) */}
      {isOpen && (
        <ul className="absolute top-14 left-0 w-full bg-white flex flex-col items-center space-y-4 py-4 sm:hidden shadow-md">
          <li><Link href="/">HOME</Link></li>
          <li><Link href="#">ORDER</Link></li>
          <li><Link href="#">ABOUT</Link></li>
          <li><Link href="/search">SEARCH</Link></li>
          <li><Link href="#">INBOX</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
