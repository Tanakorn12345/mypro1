"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";


export default function OrderPage() {
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("cash");
  const price = 55;
  const total = quantity * price;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* เนื้อหา */}
      <main className="flex-grow px-4 sm:px-6 py-6 max-w-2xl mx-auto flex flex-col gap-6 w-full">
        {/* หัวข้อ */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold">
            YOUR ORDER
          </h1>
          <button className="text-base sm:text-lg text-gray-600 hover:text-gray-800 transition whitespace-nowrap">
            &gt; ADD MENU
          </button>
        </div>

        {/* รายการอาหาร */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-start gap-3">
            {/* ปุ่มเพิ่ม/ลด */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-lg font-bold hover:bg-gray-400 transition"
              >
                -
              </button>
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center font-semibold">
                {quantity}
              </div>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-lg font-bold hover:bg-gray-400 transition"
              >
                +
              </button>
            </div>
            <div>
              <h2 className="text-lg font-bold">Donut Prawn</h2>
              <p className="text-sm text-gray-500 underline cursor-pointer hover:text-gray-700">
                Edit
              </p>
            </div>
          </div>
          <div className="text-right text-lg font-medium">{price.toFixed(2)}฿</div>
        </div>

        {/* สรุปราคา */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-1 items-end text-sm sm:text-base">
          <div className="flex justify-between w-full">
            <span className="text-gray-600">Price</span>
            <span>{price.toFixed(2)}฿</span>
          </div>
          <div className="flex justify-between w-full font-bold text-base sm:text-lg">
            <span>Total</span>
            <span>{total.toFixed(2)}฿</span>
          </div>
        </div>

        {/* วิธีชำระเงิน */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-3">
          <p className="font-bold text-lg">Method payment</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setPayment("cash")}
              className={`flex-1 border rounded-xl p-3 font-medium ${
                payment === "cash"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              cash
            </button>
            <button
              onClick={() => setPayment("promptpay")}
              className={`flex-1 border rounded-xl p-3 font-medium ${
                payment === "promptpay"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Prom
            </button>
          </div>
        </div>

        {/* ปุ่มสั่งเลย */}
        <button className="bg-green-500 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-semibold flex justify-between px-6 transition w-full">
          <span>Ordered</span>
          <span>{total.toFixed(2)}฿</span>
        </button>
      </main>
    </div>
  );
}
