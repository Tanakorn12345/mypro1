"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";

function UpdateMenu() {
  const router = useRouter();
  const params = useParams();
  const menuId = params?.menuId;

  const fileInputRef = useRef(null);

  // State
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
  });
  const [menuTypes, setMenuTypes] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true); // initial load
  const [submitting, setSubmitting] = useState(false); // form submit
  const [error, setError] = useState(null);

  // cleanup for objectURL
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Fetch initial data (mock or real endpoint)
  useEffect(() => {
    if (!menuId) {
      setError("Menu ID not provided in route.");
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        // TODO: replace with real API call, e.g.
        // const res = await fetch(`/api/menus/${encodeURIComponent(menuId)}`);
        // if (!res.ok) throw new Error("Failed to fetch");
        // const menu = await res.json();

        // MOCK menu data (example)
        const menu = {
          name: "Colonel's Fried Chicken",
          price: 120,
          description: "Original recipe fried chicken, crispy on the outside and tender on the inside.",
          type: "main-course",
          imageUrl:
            "https://d1sag4ddilekf6.cloudfront.net/compressed/merchants/3-CYXJEX67J2LBRX/hero/4d909598282343a492984534e5ce6c61_1603282216447814231.jpeg",
        };

        // MOCK types (replace with real fetch if available)
        const types = [
          { value: "main-course", label: "Main Course" },
          { value: "appetizer", label: "Appetizer" },
          { value: "beverages", label: "Beverages" },
          { value: "dessert", label: "Dessert" },
        ];

        if (!mounted) return;

        setOriginalData(menu);
        // set only expected keys into formData (avoid stray fields)
        setFormData({
          name: menu.name ?? "",
          price: menu.price ?? "",
          description: menu.description ?? "",
          type: menu.type ?? "",
        });
        setImagePreview(menu.imageUrl ?? null);
        setMenuTypes(types);
        setError(null);
      } catch (err) {
        console.error("fetch menu error", err);
        if (mounted) setError("ไม่สามารถโหลดข้อมูลเมนูได้");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [menuId]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // Image change: revoke previous blob url if any
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // revoke previous object URL if it was blob
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const url = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(url);
  };

  // Basic validation
  const validate = () => {
    if (!formData.name || formData.name.trim().length < 2) {
      setError("กรุณากรอกชื่อเมนู (อย่างน้อย 2 ตัวอักษร)");
      return false;
    }
    const priceNum = Number(formData.price);
    if (!formData.price || Number.isNaN(priceNum) || priceNum <= 0) {
      setError("กรุณากรอกราคาเป็นตัวเลขมากกว่า 0");
      return false;
    }
    if (!formData.type) {
      setError("กรุณาเลือกหมวดหมู่เมนู");
      return false;
    }
    setError(null);
    return true;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!menuId) {
      setError("Menu ID missing");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("price", String(Number(formData.price)));
      submissionData.append("description", formData.description);
      submissionData.append("type", formData.type);
      if (imageFile) submissionData.append("image", imageFile);

      // Example: PUT to update menu
      const res = await fetch(`/api/menus/${encodeURIComponent(menuId)}`, {
        method: "PUT",
        // No JSON header when sending FormData
        body: submissionData,
        // headers: { Authorization: `Bearer ${token}` } // add auth if required
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Server responded ${res.status}: ${text}`);
      }

      // Optionally parse returned updated item
      // const updated = await res.json();
      // setOriginalData(updated);
      // setFormData({ name: updated.name, ... })

      alert("บันทึกสำเร็จ");
      router.push("/overview");
    } catch (err) {
      console.error("submit error", err);
      setError("การบันทึกล้มเหลว โปรดลองอีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-10">Loading menu data...</div>;
  if (error && !originalData) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Menu/Product Editing</h2>
            <p className="text-sm text-gray-600">Editing: {originalData?.name || "..."}</p>
          </div>
        </div>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Menu Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Price (Baht)</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={submitting}
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={submitting}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center md:w-[400px]">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-800 mb-2">Menu Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
                disabled={submitting}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
                className="w-full h-[220px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex justify-center items-center relative cursor-pointer hover:bg-gray-200"
                aria-label="Upload menu image"
              >
                {imagePreview ? (
                  // If imagePreview is external URL, show as-is; if blob URL from file it's fine too
                  <img src={imagePreview} alt="menu preview" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="text-4xl">+</p>
                    <p>Add Image</p>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-800 mb-2">Menu Category</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={submitting}
              >
                <option value="">-- Please select a category --</option>
                {menuTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="bg-[#5FA373] hover:bg-[#4e8c63] text-white font-medium px-6 py-2 rounded-md w-full disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default UpdateMenu;
