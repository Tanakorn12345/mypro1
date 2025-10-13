"use client";

import { useParams } from 'next/navigation';
import React, { useState } from 'react'; // ✅ เพิ่ม useState

// Import Components ที่จำเป็น
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import StoreBanner from '../../components/StoreBanner';
import MenuTabs from '../../components/MenuTabs';
import MenuSection from '../../components/MenuSection';

// Import ข้อมูลจากไฟล์กลาง
import { allRestaurants } from '../../data/restaurant';

export default function ShopDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const restaurant = allRestaurants.find(r => r.slug === slug);
  
  // ✅ สร้าง state เพื่อเก็บว่าแท็บไหนกำลัง Active
  // ตั้งค่าเริ่มต้นให้เป็น category แรกของร้านนั้นๆ
  const [activeTab, setActiveTab] = useState(restaurant?.menu[0]?.category);

  // กรณีไม่พบร้านอาหาร (URL ผิด)
  if (!restaurant) {
    // ... โค้ดส่วน 404 เหมือนเดิม ...
    return <div>404 Not Found</div>
  }

  // ดึงชื่อ category ทั้งหมดของร้านนี้ออกมาเพื่อส่งให้ MenuTabs
  const menuCategories = restaurant.menu?.map(cat => cat.category) || [];
  
  // ค้นหา array ของ items ที่ตรงกับ activeTab
  const activeMenuItems = restaurant.menu?.find(cat => cat.category === activeTab)?.items || [];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <StoreBanner
        // ... props ของ StoreBanner เหมือนเดิม ...
        imageUrl={restaurant.image}
        title={`${restaurant.name} - ${restaurant.branch}`}
        rating={restaurant.rating}
        reviewCount={restaurant.reviewCount}
        details={restaurant.details || ''}
      />
      
      {/* ✅ ส่ง props ที่จำเป็นไปให้ MenuTabs */}
      <MenuTabs 
        categories={menuCategories}
        activeTab={activeTab}
        onTabClick={setActiveTab} // ส่งฟังก์ชัน set state ลงไปตรงๆ ได้เลย
      />

      {/* ✅ ส่ง title และ items ที่ตรงกับแท็บที่เลือกไปให้ MenuSection */}
      {activeMenuItems.length > 0 ? (
        <MenuSection title={activeTab} items={activeMenuItems} restaurant={restaurant}/>
      ) : (
        <div className="text-center py-10 text-gray-500">
          ไม่มีข้อมูลเมนูสำหรับร้านนี้
        </div>
      )}
      
      <Footer />
    </div>
  );
}