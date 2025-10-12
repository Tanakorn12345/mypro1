"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { allRestaurants } from "../data/restaurant";



function Page() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const distances = ["1-2KM", "3-4KM", "4-6KM", "6KM+"];
  const types = ["Thai Food", "Chinese Food", "Japanese Food", "American Food", "Dessert", "Beverage"];
  const ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFilters = [
    selectedDistance && { type: "distance", value: selectedDistance },
    selectedType && { type: "type", value: selectedType },
    selectedRating && { type: "rating", value: selectedRating },
  ].filter(Boolean);

  const removeFilter = (filterType) => {
    if (filterType === "distance") setSelectedDistance(null);
    if (filterType === "type") setSelectedType(null);
    if (filterType === "rating") setSelectedRating(null);
  };

  const filteredRestaurants = allRestaurants.filter(restaurant => {
    if (query && !restaurant.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (selectedType && restaurant.type !== selectedType) {
      return false;
    }
    if (selectedRating && restaurant.rating !== selectedRating.length) {
      return false;
    }
    if (selectedDistance) {
      const { distance } = restaurant;
      if (selectedDistance === "1-2KM" && (distance < 1 || distance > 2)) return false;
      if (selectedDistance === "3-4KM" && (distance < 3 || distance > 4)) return false;
      if (selectedDistance === "4-6KM" && (distance < 4 || distance > 6)) return false;
      if (selectedDistance === "6KM+" && distance <= 6) return false;
    }
    return true;
  });

  return (
    <div>
      <Navbar />

      {/* --- ส่วนของฟอร์มค้นหาและฟิลเตอร์ (เหมือนเดิม) --- */}
      <form
        onSubmit={(e) => e.preventDefault()}
        ref={wrapperRef}
        className="w-full max-w-[90%] mx-auto mb-5 md:max-w-lg md:ml-20 relative"
      >
        {/* ... โค้ดส่วน Tag Filters, Search Input, Dropdown ... */}
         {/* Tag Filters */}
         {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {activeFilters.map((f, index) => (
              <span key={index} className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm">
                {f.value}
                <button type="button" onClick={() => removeFilter(f.type)} className="text-red-500 hover:text-red-700">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <input
            type="search"
            id="default-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="block w-full p-3 md:p-4 text-sm md:text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
            placeholder="Search Restaurant , menu."
          />
          <button
            type="submit"
            className="text-white absolute right-2 bottom-2 bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-2"
          >
            Search
          </button>
        </div>

        {/* Dropdown filter */}
        {showDropdown && (
          <div className="absolute z-40 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-2 p-4 space-y-4 max-h-64 overflow-y-auto md:max-h-none">
            {/* Distance */}
            <div>
              <p className="font-semibold mb-2 text-sm md:text-base">📍 Distance</p>
              <div className="flex flex-wrap gap-2">
                {distances.map((d) => (
                  <button key={d} type="button" onClick={() => setSelectedDistance(selectedDistance === d ? null : d)} className={`px-2 py-1 md:px-3 md:py-1 rounded-lg border text-xs md:text-sm ${selectedDistance === d ? "bg-green-400 text-white" : "bg-gray-100"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <p className="font-semibold mb-2 text-sm md:text-base">🍴 Type</p>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button key={t} type="button" onClick={() => setSelectedType(selectedType === t ? null : t)} className={`px-2 py-1 md:px-3 md:py-1 rounded-lg border text-xs md:text-sm ${selectedType === t ? "bg-green-400 text-white" : "bg-gray-100"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <p className="font-semibold mb-2 text-sm md:text-base">⭐ Rating</p>
              <div className="flex flex-wrap gap-2">
                {ratings.map((r) => (
                  <button key={r} type="button" onClick={() => setSelectedRating(selectedRating === r ? null : r)} className={`px-2 py-1 md:px-3 md:py-1 rounded-lg border text-xs md:text-sm ${selectedRating === r ? "bg-green-400 text-white" : "bg-gray-100"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>

      {/* --- ส่วนแสดงผล --- */}
      {/* ✅ แก้ไข 1: เพิ่มความกว้าง container เป็น max-w-7xl */}
      <div className="w-full max-w-[90%] mx-auto mb-10 md:max-w-7xl"> 
        {filteredRestaurants.length > 0 ? (
          // ✅ แก้ไข 2: เปลี่ยน lg:grid-cols-3 เป็น lg:grid-cols-4
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredRestaurants.map((resto) => (
              <Card key={resto.id} restaurant={resto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">😢 No restaurants found that match the criteria.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Page;