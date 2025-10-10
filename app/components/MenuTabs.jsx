export default function MenuTabs() {
  const tabs = [
    "Popular menu",
    "Snack set",
    "Chicken",
    "Rice and Bowl",
    "Burger",
    "Beverage",
  ];

  return (
    <div className="bg-white shadow-sm border-b flex overflow-x-auto  gap-6 p-4 text-sm md:text-base font-semibold">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="hover:text-green-600 transition whitespace-nowrap"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
