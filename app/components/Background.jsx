'use client';

import { Carousel } from 'flowbite-react';

export default function Background() {
  const images = [
    "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg",
    "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg",
    "https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg"
  ];

  return (
    // 👇 ลบ h-[500px] ออก แล้วใส่ aspect-ratio แทน
    <div className="w-full aspect-video"> {/* ✨ ลองใช้ aspect-video (16:9) หรือ aspect-[21/9] หรืออื่นๆ */}
      <Carousel
        slideInterval={4000}
        pauseOnHover={false}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </Carousel>
    </div>
  );
}