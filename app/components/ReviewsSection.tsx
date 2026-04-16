'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
  {
    name: 'John Smith',
    rating: 5,
    comment: 'Excellent service! Very professional and fair prices. Highly recommended!',
    service: 'Oil Change',
  },
  {
    name: 'Mary Johnson',
    rating: 5,
    comment: 'The team was knowledgeable and friendly. Fixed my brake issue quickly.',
    service: 'Brake Repair',
  },
  {
    name: 'Robert Davis',
    rating: 5,
    comment: 'Great experience from start to finish. Will definitely come back!',
    service: 'Tire Services',
  },
  {
    name: 'Sarah Wilson',
    rating: 5,
    comment: 'Professional mechanics who really know their stuff. Very satisfied!',
    service: 'Engine Diagnostics',
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 5000 }}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="py-12"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-800 p-8 rounded-lg h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{review.name}</p>
                    <p className="text-gray-400 text-sm">{review.service}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 italic">"{review.comment}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
