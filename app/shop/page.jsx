"use client";

import MenuTabs from "../components/MenuTabs";
import MenuCard from "../components/MenuCards";
import Footer from "../components/Footer";
import { Star } from "lucide-react";
import Navbar from "../components/Navbar";

export default function KfcPage() {
  const popularMenu = [
    {
      id: 1,
      name: "กุ้งโดนัท",
      price: "฿55",
      image: "https://www.kfc.co.th/static/images/th_menu/DonutShrimp.png",
    },
    {
      id: 2,
      name: "ไก่ทอด 1 ชิ้น",
      price: "฿55",
      image: "https://www.kfc.co.th/static/images/th_menu/FriedChicken.png",
    },
    {
      id: 3,
      name: "ไก่ใจใจ",
      price: "฿369",
      image: "https://www.kfc.co.th/static/images/th_menu/MixedChicken.png",
    },
    {
      id: 4,
      name: "มันบด (ปกติ)",
      price: "฿59",
      image: "https://www.kfc.co.th/static/images/th_menu/MashedPotato.png",
    },
    {
      id: 5,
      name: "ชิ้นไก่ป๊อป 7 ชิ้น",
      price: "฿55",
      image: "https://www.kfc.co.th/static/images/th_menu/PopcornChicken.png",
    },
    {
      id: 6,
      name: "ทาร์ตไข่ 2 ชิ้น",
      price: "฿78",
      image: "https://www.kfc.co.th/static/images/th_menu/EggTart.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
     <Navbar/>

      {/* Banner */}
      <section className="relative w-full h-64 md:h-80 overflow-hidden">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png"
          alt="KFC Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-red-700/70 flex flex-col justify-center items-center text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">KFC - PTT BANGWAEK</h2>
          <div className="flex items-center gap-3 mt-3">
            <span className="flex items-center bg-yellow-400 text-black px-2 py-1 rounded text-sm">
              <Star className="w-4 h-4 mr-1" /> 4.8 (7161)
            </span>
            <span className="bg-white/20 px-3 py-1 rounded text-sm">
              ฿ 865 | 27 minutes
            </span>
          </div>
        </div>
      </section>

      <MenuTabs />

      {/* Popular Menu */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold mb-6">Popular menu</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {popularMenu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
