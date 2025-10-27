"use client";
import Navbar from "../../components/Navbar"; // <-- Comment out temporarily
import Footer from "../../components/Footer"; // <-- Comment out temporarily
import { useState, useRef, useEffect } from "react"; // <-- เพิ่ม useRef, useEffect
import { useRouter } from "next/navigation"; // <-- Comment out temporarily
import { Loader2, Store, UploadCloud } from "lucide-react"; // <-- เพิ่ม UploadCloud

export default function CreateRestaurantPage() {
    const router = useRouter(); // <-- Comment out temporarily
    const fileInputRef = useRef(null); // <-- Ref สำหรับ input file

    // State for the form
    const [form, setForm] = useState({
        name: "",
        description: "",
        opening_hours: "",
        phone: "",
        address: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });

    // --- 1. เพิ่ม State สำหรับรูปภาพ ---
    const [imageFile, setImageFile] = useState(null); // เก็บ File object
    const [imagePreview, setImagePreview] = useState(null); // เก็บ URL สำหรับ preview

    // --- 4. Cleanup Object URL ---
    useEffect(() => {
        // Function นี้จะถูกเรียกเมื่อ component unmount หรือ imagePreview เปลี่ยนไป
        return () => {
          if (imagePreview && imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
          }
        };
      }, [imagePreview]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setSubmitStatus({ message: "", type: "" });
    };

    // --- 3. ฟังก์ชันสำหรับจัดการการเลือกรูปภาพ ---
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // ล้าง Object URL เก่า ถ้ามี
        if (imagePreview && imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        const url = URL.createObjectURL(file); // สร้าง URL ชั่วคราว
        setImageFile(file); // เก็บ File object
        setImagePreview(url); // เก็บ URL สำหรับแสดงผล
    };

    // --- 5. อัปเดต handleSubmit ให้ใช้ FormData ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitStatus({ message: "", type: "" });

        if (!form.name || !form.address || !form.phone) {
            setSubmitStatus({ message: "Please fill in all required fields.", type: "error" });
            setSubmitting(false);
            return;
        }

        // สร้าง FormData object
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("opening_hours", form.opening_hours);
        formData.append("phone", form.phone);
        formData.append("address", form.address);
        // เพิ่มไฟล์รูปภาพเข้าไป (ถ้ามี)
        if (imageFile) {
            formData.append("image", imageFile); // 'image' คือ key ที่ Backend จะใช้รับไฟล์
        }

        try {
            console.log("--- Submitting Create Restaurant Form (with FormData) ---");
            // Log ดูข้อมูลใน FormData (อาจจะไม่แสดง File โดยตรง)
            for (let [key, value] of formData.entries()) {
                 console.log(`${key}: ${value instanceof File ? value.name : value}`); // แสดงชื่อไฟล์ถ้าเป็น File
            }

            // --- 👇 ทำการ Uncomment ส่วนนี้ ---
            const res = await fetch('/api/restaurants', { // <-- ตรวจสอบ Path ให้ถูกต้อง
                method: 'POST',
                body: formData, // ส่ง FormData
                // ไม่ต้องใส่ headers Content-Type: application/json
            });

            if (!res.ok) {
                // พยายามอ่าน Error message จาก Backend (ถ้าส่งมาเป็น JSON)
                let errorData = { message: "Failed to create restaurant. Status: " + res.status };
                try {
                   errorData = await res.json();
                } catch (jsonError) {
                   console.error("Could not parse error response as JSON", jsonError);
                   errorData.message = await res.text(); // อ่านเป็น Text แทนถ้า JSON ไม่ได้
                }
                throw new Error(errorData.message || "Something went wrong.");
            }
            // --- สิ้นสุดส่วน Uncomment ---

            // --- ถ้าสำเร็จ ---
            const result = await res.json(); // อ่าน response จาก Backend
            console.log("Backend Response:", result);

            setSubmitStatus({ message: "Restaurant created successfully! Redirecting...", type: "success" });
            setTimeout(() => {
                // router.push("/manage"); // <-- Use this in real project
                console.log("Redirecting to /manage...");
                window.location.href = "/manage"; // Temporary redirect
            }, 2000);

        } catch (err) {
            console.error("Create Restaurant Error:", err);
            setSubmitStatus({ message: err.message || "Failed to create restaurant.", type: "error" });
            setSubmitting(false); // หยุด Submitting ถ้า Error
        }
        // ไม่ต้อง setSubmitting(false) ถ้าสำเร็จ เพราะเรา Redirect
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar /> 
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                     <Store className="w-6 h-6 text-green-700" />
                     <h1 className="text-xl font-bold text-green-700">Restaurant Setup</h1>
                </div>
                <p className="text-gray-600 mb-6">Please provide your restaurant details to get started.</p>

                <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-6 shadow-inner">

                    {/* Restaurant Name */}
                    <div>
                        <label htmlFor="name" className="block font-semibold mb-1 text-gray-700">Restaurant Name *</label>
                        <input
                            type="text" id="name" name="name"
                            value={form.name} onChange={handleChange}
                            className="w-full bg-orange-50 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    {/* --- 2. เพิ่มช่อง Upload รูปภาพ --- */}
                    <div>
                        <label className="block font-semibold mb-1 text-gray-700">Restaurant Image</label>
                        <input
                            type="file"
                            accept="image/*" // รับเฉพาะไฟล์รูปภาพ
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden" // ซ่อน input file จริง
                        />
                        {/* ส่วนที่แสดงผลให้ User คลิก */}
                        <div
                            onClick={() => fileInputRef.current?.click()} // คลิกที่นี่ -> ไปสั่งคลิก input file
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                            className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-green-400 transition h-48"
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Restaurant preview" className="max-h-full max-w-full object-contain rounded" />
                            ) : (
                                <div className="space-y-1 text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <p className="pl-1">Click to upload an image</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block font-semibold mb-1 text-gray-700">Description</label>
                        <textarea
                            id="description" name="description"
                            value={form.description} onChange={handleChange}
                            rows={3}
                            className="w-full bg-orange-50 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <label htmlFor="opening_hours" className="block font-semibold mb-1 text-gray-700">Opening Hours (e.g., 10:00 - 22:00)</label>
                        <input
                            type="text" id="opening_hours" name="opening_hours"
                            value={form.opening_hours} onChange={handleChange}
                            className="w-full bg-orange-50 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block font-semibold mb-1 text-gray-700">Phone Number *</label>
                        <input
                            type="tel" id="phone" name="phone"
                            value={form.phone} onChange={handleChange}
                            className="w-full bg-orange-50 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block font-semibold mb-1 text-gray-700">Address *</label>
                        <textarea
                            id="address" name="address"
                            value={form.address} onChange={handleChange}
                            rows={3}
                            className="w-full bg-orange-50 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>


                    {/* Submit Status */}
                    {submitStatus.message && (
                        <div className={`p-3 rounded-lg text-center font-semibold ${
                            submitStatus.type === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                            {submitStatus.message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white font-semibold px-12 py-3 rounded-full hover:bg-green-600 flex items-center justify-center disabled:opacity-60 w-full sm:w-auto"
                            disabled={submitting}
                        >
                            {submitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                            {submitting ? "Creating Restaurant..." : "Create Restaurant"}
                        </button>
                    </div>
                </form>
            </div>
            <Footer /> 
        </div>
    );
}

