'use client';

import { Carousel } from 'flowbite-react';

export default function Background() {
  return (
    <div className="h-[500px] w-full overflow-hidden"> {/* 👈 container ป้องกันเกินขอบ */}
      <Carousel
        slideInterval={4000}
        pauseOnHover={false}
        className="w-full h-full" 
      >
        <img
          src="https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg"
          alt="Slide 1"
          className="object-cover object-center w-full h-full"
        />
        <img
          src="https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg"
          alt="Slide 2"
          className="object-cover object-center w-full h-full"
        />
        <img
          src="https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg"
          alt="Slide 3"
          className="object-cover object-center w-full h-full"
        />
      </Carousel>
    </div>
  );
}
