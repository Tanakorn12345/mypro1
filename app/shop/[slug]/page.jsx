"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect, use } from 'react'; // <-- เพิ่ม Hooks
import { Loader2 } from 'lucide-react'; // <-- เพิ่ม Loader

// Import Components (เหมือนเดิม)
import Navbar from '../../components/Navbar'; // <-- Commented out for Canvas
import Footer from '../../components/Footer'; // <-- Commented out for Canvas
import StoreBanner from '../../components/StoreBanner';
import MenuTabs from '../../components/MenuTabs';
import MenuSection from '../../components/MenuSection';

// --- ลบ import { allRestaurants } from '../../data/restaurant'; ---

export default function ShopDetailPage() {
  const params = useParams(); // <-- ใช้ useParams
  const slug = params?.slug;

  // --- 🎯 State สำหรับเก็บข้อมูล, Loading, Error ---
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // เริ่มต้นเป็น null

  // --- 🎯 useEffect สำหรับ Fetch ข้อมูล ---
  useEffect(() => {
    if (!slug) {
        setError("Restaurant slug not found.");
        setLoading(false);
        return;
    }

    const fetchRestaurantDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            // --- เรียก API ใหม่ ---
            const res = await fetch(`/api/shop/${slug}`, { cache: 'no-store' }); 
            if (!res.ok) {
                let errorMsg = `Failed to fetch restaurant. Status: ${res.status}`;
                try { const e = await res.json(); errorMsg = e.message || errorMsg; } catch (_) {}
                throw new Error(errorMsg);
            }
            const data = await res.json();
            
            if (data.restaurant) {
                setRestaurant(data.restaurant); // <-- เก็บข้อมูลร้าน
                // ตั้งค่า Tab แรก (ถ้ามีเมนู)
                if (data.restaurant.menu && data.restaurant.menu.length > 0) {
                    setActiveTab(data.restaurant.menu[0].category);
                }
            } else {
                throw new Error("Restaurant data not found in response.");
            }
        } catch (err) {
            console.error("Fetch shop detail error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchRestaurantDetails();
  }, [slug]); // ทำงานใหม่ถ้า slug เปลี่ยน


  // --- 🎯 UI สำหรับ Loading / Error ---
  if (loading) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            <p className="ml-3 text-gray-600">Loading restaurant details...</p>
        </div>
    );
  }

  if (error) {
     return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <p className="text-xl text-red-600 mb-4 text-center">Error: {error}</p>
            {/* (อาจจะเพิ่มปุ่มกลับหน้า Home) */}
        </div>
     );
  }

  // กรณีไม่พบร้านอาหาร (API ตอบ 404 หรือข้อมูลไม่มี)
  if (!restaurant) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
             <p className="text-gray-600">404: Restaurant not found.</p>
        </div>
    );
  }

  // --- 🎯 Logic แสดงผล (เหมือนเดิม แต่ใช้ State) ---
  const menuCategories = restaurant.menu?.map(cat => cat.category) || [];
  const activeMenuItems = restaurant.menu?.find(cat => cat.category === activeTab)?.items || [];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar /> 

      <StoreBanner
        // --- 🎯 ใช้ข้อมูลจาก State ---
        imageUrl={restaurant.image || 'https://placehold.co/1200x400/F3EFEF/AAAAAA?text=No+Banner'}
        title={`${restaurant.name} - ${restaurant.branch}`}
        rating={restaurant.rating}
        reviewCount={restaurant.reviewCount}
        details={restaurant.details || ''}
      />
      
      <MenuTabs 
        categories={menuCategories}
        activeTab={activeTab}
        onTabClick={setActiveTab} 
      />

      {activeMenuItems.length > 0 ? (
        <MenuSection 
            title={activeTab} 
            items={activeMenuItems} 
            restaurant={{id: restaurant.id, name: restaurant.name}} // ส่งข้อมูลร้านที่จำเป็นสำหรับ Cart
        />
      ) : (
        <div className="text-center py-10 text-gray-500">
          This restaurant has no menu items available in this category.
        </div>
      )}
      
      <Footer /> 
    </div>
  );
}
