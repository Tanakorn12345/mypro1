"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

/* fallback data */
const initialMenuData = [
  { id: "L001", name: "Chicken fried", restaurant: "KFC", price: 35, status: "Active" },
  { id: "L002", name: "Rice bowl", restaurant: "KFC", price: 34, status: "Pending" },
  { id: "L003", name: "Coke", restaurant: "KFC", price: 35, status: "Active" },
  { id: "L004", name: "Chicken pop", restaurant: "KFC", price: 38, status: "Active" },
  { id: "L005", name: "French Fries", restaurant: "KFC", price: 40, status: "Active" },
];

const formatPrice = (p) => `${Number(p)}`;

export default function DeletePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState(initialMenuData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    let mounted = true;
    const fetchMenus = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/menus");
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data = await res.json();
        if (mounted && Array.isArray(data)) setMenus(data);
      } catch (err) {
        console.warn("Fetch menus failed, using fallback:", err);
        setError("Could not load data from the server — using local data instead.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMenus();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredMenu = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return menus;
    return menus.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.id.toLowerCase().includes(term) ||
        m.restaurant.toLowerCase().includes(term)
    );
  }, [menus, searchTerm]);

  const handleDeleteClick = async (id) => {
    const confirm = window.confirm(`Are you sure you want to delete menu ${id}?`);
    if (!confirm) return;

    const prev = menus;
    setMenus((s) => s.filter((m) => m.id !== id));
    setActionLoading((l) => ({ ...l, [id]: true }));

    try {
      const res = await fetch(`/api/menus/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        setMenus(prev);
        const text = await res.text();
        throw new Error(`Delete failed: ${res.status} ${text}`);
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed. Please try again.");
    } finally {
      setActionLoading((l) => {
        const next = { ...l };
        delete next[id];
        return next;
      });
    }
  };

  const handleConfirmAll = async () => {
    if (!window.confirm("Are you sure you want to confirm all changes?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/menus/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menus }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Confirm failed: ${res.status} ${text}`);
      }
      alert("Confirmed successfully.");
    } catch (err) {
      console.error(err);
      alert("Confirmation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold underline decoration-black/80 decoration-2 mb-1">
            Delete Menu/Products
          </h1>
          <p className="text-gray-700">Manage your menu items here.</p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearchClick}
          className="flex flex-col sm:flex-row items-center gap-4 mb-6"
        >
          <input
            type="text"
            aria-label="Search menus"
            placeholder="Search goods"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:flex-1 h-12 rounded-full bg-[#f1eeee] px-6 text-gray-700 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            aria-label="Search"
            className="w-full sm:w-32 h-12 rounded-xl bg-[#d67a42] hover:bg-[#c86f36] text-black font-medium flex items-center justify-center gap-2 transition disabled:opacity-60"
            disabled={loading}
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
            <span className="sm:inline">Search</span>
          </button>
        </form>

        {/* Table */}
        <div className="bg-[#f3efef] rounded-xl p-2 sm:p-4 responsive-table-container">
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[720px]">
              <thead className="hidden lg:table-header-group">
                <tr>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">MENU ID</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">MENU NAME</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">RESTAURANT</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">PRICE</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">STATUS</th>
                  <th className="bg-[#B9E8B8] text-left py-4 px-6">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredMenu.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No menus found.
                    </td>
                  </tr>
                ) : (
                  filteredMenu.map((menu) => (
                    <tr key={menu.id} className="mb-4 block lg:table-row">
                      <td data-label="ID" className="py-2 px-4 block lg:table-cell">
                        <div className="bg-[#fff9c7] rounded-full px-6 py-3 text-base font-medium text-gray-800">
                          {menu.id}
                        </div>
                      </td>
                      <td data-label="Name" className="py-2 px-4 block lg:table-cell">
                        <div className="bg-[#fff9c7] rounded-full px-6 py-3">{menu.name}</div>
                      </td>
                      <td data-label="Restaurant" className="py-2 px-4 block lg:table-cell">
                        <div className="bg-[#fff9c7] rounded-full px-6 py-3">{menu.restaurant}</div>
                      </td>
                      <td data-label="Price" className="py-2 px-4 block lg:table-cell">
                        <div className="bg-[#fff9c7] rounded-full px-6 py-3">{formatPrice(menu.price)}</div>
                      </td>
                      <td data-label="Status" className="py-2 px-4 block lg:table-cell">
                        <div className="bg-[#fff9c7] rounded-full px-6 py-3">{menu.status}</div>
                      </td>
                      <td data-label="Action" className="py-2 px-4 block lg:table-cell">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDeleteClick(menu.id)}
                            className="bg-[#A6D6B0] text-black font-semibold text-xs px-4 py-2 rounded-full shadow hover:bg-[#8cc99b] transition disabled:opacity-60"
                            disabled={!!actionLoading[menu.id]}
                          >
                            {actionLoading[menu.id] ? "Deleting..." : "DELETE"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleConfirmAll}
            className="bg-[#5FA373] hover:bg-[#4e8c63] text-white px-8 py-3 rounded-lg shadow disabled:opacity-60"
            disabled={loading}
            aria-label="Confirm changes"
          >
            Confirm
          </button>
        </div>
      </main>
    </div>
  );
}