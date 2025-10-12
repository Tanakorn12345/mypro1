"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Category from "./components/Category";
import dynamic from "next/dynamic";
import { allRestaurants } from "./data/restaurant";



// Data for Recommendation Section (First 4 items)
const recommendedRestaurants = allRestaurants.slice(0, 4);

export default function Home() {
  const Background = dynamic(() => import("./components/Background"), { ssr: false });

  // State and logic for the filtering section
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(prev => prev === categoryName ? null : categoryName);
  };

  // Filter logic applies to the entire restaurant list
  const filteredRestaurants = allRestaurants.filter(restaurant => {
    if (!selectedCategory) return true; // If no category is selected, show all
    return restaurant.type === selectedCategory;
  });

  // Dynamic title for the results section
  const resultsTitle = selectedCategory ? `Result for "${selectedCategory}"` : "All restaurant";

  return (
    <div>
      <Navbar />
      <Background />

      {/* --- Section 1: Recommendation Restaurants (Static Display) --- */}
      <h2 className="text-center mt-9 mb-4 font-bold text-xl sm:text-2xl">
        RECOMMENDATION RESTAURANTS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6 pt-0 place-items-center">
        {recommendedRestaurants.map((restaurant) => (
          <Card 
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>

      <hr className="my-6 max-w-4xl mx-auto"/>

      {/* --- Section 2: Filterable Restaurants (Dynamic Display) --- */}
      <Category 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      <h2 className="text-center mt-9 mb-4 font-bold text-xl sm:text-2xl">
        {resultsTitle}
      </h2>
      
      {/* ✅ แก้ไขตรงนี้: ปรับ Layout ให้เป็น 4 คอลัมน์บนจอใหญ่ (lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6 pt-0 place-items-center">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Card 
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            ไม่พบร้านอาหารในหมวดหมู่นี้
          </p>
        )}
      </div>
      
      <Footer />
    </div>
  );
}