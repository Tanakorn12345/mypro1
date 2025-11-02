"use client";

import React, { useState, useRef, useEffect, useMemo } from "react"; // <-- เพิ่ม useEffect, useMemo
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { Loader2 } from "lucide-react"; // <-- เพิ่ม Loader

// import { allRestaurants } from "../data/restaurant"; // <-- 1. ลบข้อมูลจำลอง

function Page() {
  // --- State สำหรับ Filter/Search (เหมือนเดิม) ---
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const distances = ["1-2KM", "3-4KM", "4-6KM", "6KM+"];
  const types = ["Thai Food", "Chinese Food", "Japanese Food", "American Food", "Dessert", "Beverage"];
  const ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  // --- 2. State สำหรับ Data Fetching ---
  const [allRestaurants, setAllRestaurants] = useState([]); // <-- เก็บข้อมูลจริง
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 3. useEffect สำหรับ Fetch ข้อมูลร้านค้า ---
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/restaurants', { cache: 'no-store' }); // <-- เรียก API
        if (!res.ok) {
          throw new Error(`Failed to fetch restaurants. Status: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data.restaurants)) {
          setAllRestaurants(data.restaurants); // <-- เก็บข้อมูลลง State
        }
      } catch (err) {
        console.error("Fetch restaurants error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []); // [] = ทำงานครั้งเดียว

  // --- useEffect สำหรับ Click Outside (เหมือนเดิม) ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]); // <-- เพิ่ม dependency

  // --- Active Filters (เหมือนเดิม) ---
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

  // --- 4. filteredRestaurants (แก้ให้ใช้ State) ---
  const filteredRestaurants = useMemo(() => {
    // ใช้ allRestaurants (จาก state) แทน allRestaurants (จาก import)
    return allRestaurants.filter(restaurant => {
      // --- Logic การกรอง (เหมือนเดิม) ---
      if (query && !restaurant.name.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (selectedType && restaurant.type !== selectedType) {
        return false;
      }
      // (หมายเหตุ: API GET /api/restaurants ต้องส่ง Rating เป็นตัวเลข 1-5)
      if (selectedRating && restaurant.rating !== selectedRating.length) { 
        return false;
      }
      if (selectedDistance) {
        // (หมายเหตุ: API GET /api/restaurants ต้องส่ง Distance เป็นตัวเลข)
        const distance = parseFloat(restaurant.distance); // แปลงเป็นตัวเลข
        if (isNaN(distance)) return false; // ถ้าไม่มีข้อมูล distance ให้ข้าม
        if (selectedDistance === "1-2KM" && (distance < 1 || distance > 2)) return false;
        if (selectedDistance === "3-4KM" && (distance < 3 || distance > 4)) return false;
        if (selectedDistance === "4-6KM" && (distance < 4 || distance > 6)) return false;
        if (selectedDistance === "6KM+" && distance <= 6) return false;
      }
      return true;
    });
  }, [allRestaurants, query, selectedType, selectedRating, selectedDistance]); // <-- เพิ่ม Dependencies


  return (
    <div>
      <Navbar />

      {/* --- ส่วนของฟอร์มค้นหาและฟิลเตอร์ (เหมือนเดิม) --- */}
      <form
        onSubmit={(e) => e.preventDefault()}
        ref={wrapperRef}
        className="w-full max-w-[90%] mx-auto mb-5 mt-10 md:max-w-lg md:ml-20 relative"
      >
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
      <div className="w-full max-w-[90%] mx-auto mb-10 md:max-w-7xl"> 
        
        {/* --- 5. เพิ่ม UI สำหรับ Loading / Error --- */}
        {loading && (
           <div className="text-center py-20">
             <Loader2 className="w-10 h-10 mx-auto text-green-500 animate-spin" />
             <p className="mt-4 text-gray-500">Loading restaurants...</p>
           </div>
        )}
        {error && (
           <div className="text-center py-20">
             <p className="text-xl text-red-500">😢 Error: {error}</p>
           </div>
        )}
        
        {!loading && !error && (
          <>
            {filteredRestaurants.length > 0 ? (
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
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Page;
