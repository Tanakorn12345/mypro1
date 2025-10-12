// components/StoreBanner.jsx

import { Star } from 'lucide-react'; // อย่าลืม import ไอคอนเข้ามา

// รับข้อมูลผ่าน props
export default function StoreBanner({
  imageUrl,
  title,
  rating,
  reviewCount,
  details, // รวมราคาและเวลาไว้ด้วยกัน
}) {
  return (
    <section className="relative w-full h-64 md:h-80 lg:h-96">
      {/* ส่วนของ Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        role="img" // บอกให้ screen reader รู้ว่านี่คือรูปภาพ
        aria-label={`Banner for ${title}`} // เพื่อ Accessibility
      />
      {/* ส่วนของ Gradient Overlay เพื่อให้ข้อความอ่านง่ายขึ้น */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden="true"
      />

      {/* ส่วนของ Content ที่จะแสดงทับบนรูป */}
      <div className="relative z-10 h-full flex flex-col justify-end text-white p-4 md:p-6 lg:p-8">
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">{title}</h2>
          <div className="flex items-center gap-3 mt-3">
            <span className="flex items-center bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold">
              <Star className="w-4 h-4 mr-1.5" /> {rating} ({reviewCount})
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded text-sm">
              {details}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}