"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

// (Interface remains commented out as in the original)

function ManageHome() {
  const router = useRouter();

  // State for restaurant data
  const [restaurantData, setRestaurantData] = useState({
    name: "HOTPOT MAN",
    branch: "Prannok Branch", // Translated
    logoUrl: "https://media.jobthai.com/v1/images/logo-pic-map/333164_logo_20241008103613.jpeg?type=webp&width=1920&quality=30&blur=1",
    isOpen: true,
    closingTime: "22:00",
    todaysSales: 10000.00,
    lastWeekQualityScore: 85.5,
  });

  // (useEffect remains commented out as in the original)


  // --- UI Rendering ---
  // Main background is white with bottom padding
  return (
    <div className="bg-white min-h-screen">
      <Navbar/>
      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* 1. Restaurant Info: Card/Shadow removed, layout focused */}
        {/* Uses flex-col on mobile and md:flex-row on larger screens */}
        <div className="border-b border-gray-200 pb-5 mb-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 relative">
          
          <div className="flex items-start gap-4 flex-grow w-full md:w-auto">
            {/* Logo */}
            <img
              src={restaurantData.logoUrl}
              alt={`${restaurantData.name} Logo`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-gray-300 object-contain flex-shrink-0"
            />
            {/* Text Info */}
            <div className="flex-grow min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold truncate">{restaurantData.name}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{restaurantData.branch}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {/* Status Badge */}
                {restaurantData.isOpen ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                    Open (until {restaurantData.closingTime}) {/* Translated */}
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                    Closed {/* Translated */}
                  </span>
                )}
                {/* Close Button */}
                <button className="text-gray-600 border border-gray-300 text-xs font-medium px-4 py-1 rounded-full hover:bg-gray-100 transition duration-200 whitespace-nowrap">
                  Close Shop {/* Translated */}
                </button>
              </div>
            </div>
          </div>

          {/* MANAGEMENT MODE Button */}
          <button
            className="bg-green-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-green-600 transition duration-200 w-full md:w-auto whitespace-nowrap mt-4 md:mt-0"
            onClick={() => router.push("/overview")}
          >
            MANAGEMENT MODE
          </button>
        </div>

        {/* 2. Sales Summary: Card removed, data layout */}
        <div className="border-b border-gray-200 pb-5 mb-5">
            <h3 className="text-gray-500 text-base">Today's Sales</h3> {/* Translated */}
            <p className="text-3xl sm:text-4xl font-extrabold mt-1 text-green-700">
                ฿{restaurantData.todaysSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </div>

        {/* 3. Quality Section: Card removed, data layout */}
        <div className="border-b border-gray-200 pb-5 mb-5">
            <h3 className="text-gray-500 text-base">Last Week's Order Quality</h3> {/* Translated */}
            {restaurantData.lastWeekQualityScore === null ? (
                <p className="text-gray-400 mt-2 text-xl sm:text-2xl">Loading data...</p> /* Translated */
            ) : (
                <p className="text-3xl sm:text-4xl font-extrabold mt-1 text-blue-700">
                    {restaurantData.lastWeekQualityScore}%
                </p>
            )}
        </div>


        {/* 4. Actions: Card removed, arranged in a responsive grid */}
        {/* Buttons are simplified (Text Buttons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <button 
              className="p-4 text-left border-l-4 border-yellow-500 hover:bg-gray-50 transition duration-200"
              onClick={() => console.log('Go to Campaign')}
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">📢</span>
                    <div>
                        <p className="text-lg font-semibold">Campaigns</p> {/* Translated */}
                        <p className="text-sm text-gray-500">Manage discounts and promotions</p> {/* Translated */}
                    </div>
                </div>
            </button>
            
            <button 
              className="p-4 text-left border-l-4 border-red-500 hover:bg-gray-50 transition duration-200"
              onClick={() => console.log('Go to Ads')}
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                        <p className="text-lg font-semibold">Advertisements</p> {/* Translated */}
                        <p className="text-sm text-gray-500">Boost sales by promoting your store</p> {/* Translated */}
                    </div>
                </div>
            </button>
        </div>

      </main>
    </div>
  );
}

export default ManageHome;