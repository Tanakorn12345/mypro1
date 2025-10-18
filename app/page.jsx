"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Category from "./components/Category";
import { allRestaurants } from "./data/restaurant";

// Data for Recommendation Section (First 4 items)
const recommendedRestaurants = allRestaurants.slice(0, 4);

export default function Home() {
  const Background = dynamic(() => import("./components/Background"), { ssr: false });

  // --- State ---
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- Handlers ---
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  // --- Filter Logic ---
  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    if (!selectedCategory) return true;
    return restaurant.type === selectedCategory;
  });

  const resultsTitle = selectedCategory
    ? `Result for "${selectedCategory}"`
    : "All Restaurants";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Background />

      {/* --- Section 1: Recommended Restaurants --- */}
      <section className="px-4 sm:px-8 lg:px-16 py-10">
        <h2 className="text-center mb-8 font-extrabold text-2xl sm:text-3xl text-gray-800">
          🍽️ RECOMMENDED RESTAURANTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {recommendedRestaurants.map((restaurant) => (
            <Card key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <hr className="my-8 border-gray-300 max-w-5xl mx-auto" />

      {/* --- Section 2: Filterable Restaurants --- */}
      <section className="px-4 sm:px-8 lg:px-16 pb-12">
        <Category
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <h2 className="text-center mt-10 mb-6 font-extrabold text-2xl sm:text-3xl text-gray-800">
          {resultsTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10 text-lg">
              ไม่พบร้านอาหารในหมวดหมู่นี้
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
