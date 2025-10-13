"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from '../context/CartContext';

export default function OrderPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [payment, setPayment] = useState("cash");

  // จัดกลุ่มสินค้าในตะกร้าตามชื่อร้านค้า
  const groupedByRestaurant = cartItems.reduce((acc, item) => {
    const restaurantName = item.restaurant.name;
    if (!acc[restaurantName]) {
      acc[restaurantName] = [];
    }
    acc[restaurantName].push(item);
    return acc;
  }, {});

  // คำนวณราคารวมทั้งหมด
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('฿', ''));
    return sum + (price * item.quantity);
  }, 0);

  // ฟังก์ชันที่จะทำงานเมื่อกดปุ่ม "Ordered"
  const handleOrder = () => {
    console.log("Order placed!", { 
      items: cartItems, 
      total: total, 
      paymentMethod: payment 
    });
    clearCart();
    router.push('/order/success');
  };

  // จัดการกรณีตะกร้าว่างเปล่า
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold text-gray-700">Your cart is empty.</h1>
          <p className="text-gray-500 mt-2">It looks like you haven't added anything to your cart yet.</p>
          <Link href="/" className="mt-6 bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
          Start shopping          
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 sm:px-6 py-6 max-w-2xl mx-auto flex flex-col gap-6 w-full">
        {/* หัวข้อ */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold">
            YOUR ORDER
          </h1>
          <Link href="/" className="text-base sm:text-lg text-gray-600 hover:text-gray-800 transition whitespace-nowrap">
            &gt; ADD MENU
          </Link>
        </div>

        {/* วนลูปแสดงผลตามร้านค้าที่จัดกลุ่มไว้ */}
        {Object.entries(groupedByRestaurant).map(([restaurantName, items]) => (
          <div key={restaurantName} className="flex flex-col gap-4">
            {/* แสดงชื่อร้านค้า */}
            <h2 className="text-lg font-bold border-b pb-2">{restaurantName}</h2>
            
            {/* วนลูปแสดงสินค้าของร้านนั้นๆ */}
            {items.map((item) => (
              <div key={item.id} className="bg-gray-100 rounded-xl p-4 flex justify-between items-center gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-lg font-bold hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center font-semibold">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-lg font-bold hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 underline cursor-pointer hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right text-lg font-medium">฿{(parseFloat(item.price.replace('฿', '')) * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        ))}

        {/* สรุปราคา */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-1 items-end text-sm sm:text-base">
          <div className="flex justify-between w-full font-bold text-base sm:text-lg">
            <span>Total</span>
            <span>฿{total.toFixed(2)}</span>
          </div>
        </div>

        {/* วิธีชำระเงิน */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-3">
          <p className="font-bold text-lg">Method of Payment</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setPayment("cash")}
              className={`flex-1 border rounded-xl p-3 font-medium transition-colors ${
                payment === "cash"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cash
            </button>
            <button
              onClick={() => setPayment("promptpay")}
              className={`flex-1 border rounded-xl p-3 font-medium transition-colors ${
                payment === "promptpay"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              PromptPay
            </button>
          </div>
        </div>

        {/* ปุ่มสั่งเลย */}
        <button 
          onClick={handleOrder}
          className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl text-xl font-semibold flex justify-between px-6 transition w-full"
        >
          <span>Confirm Order</span>
          <span>฿{total.toFixed(2)}</span>
        </button>
      </main>
      <Footer />
    </div>
  );
}