import React from "react";

const categories = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Sushi", icon: "🍣" },
  { name: "Drinks", icon: "🥤" },
  { name: "Salad", icon: "🥗" },
  { name: "Steak", icon: "🥩" },
  { name: "Dessert", icon: "🍰" },
  { name: "Coffee", icon: "☕" },
];

function Category() {
  return (
    <div className="bg-white py-4">
      <h2 className="text-lg sm:text-xl font-bold text-center pb-4">
        CATEGORY
      </h2>

      <div className="flex flex-wrap justify-center gap-4 px-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-[80px] sm:w-[100px] bg-gray-100 rounded-2xl p-3 shadow hover:bg-green-200 cursor-pointer transition"
          >
            <span className="text-2xl sm:text-3xl">{cat.icon}</span>
            <span className="text-sm sm:text-base font-medium mt-1">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
