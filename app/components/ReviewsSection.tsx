'use client';

const reviews = [
  {
    name: 'John Smith',
    role: 'Toyota Camry Owner',
    rating: 5,
    comment: 'Outstanding service! Very professional team and fair prices. They found an issue two other shops missed. Highly recommended!',
    initial: 'J',
  },
  {
    name: 'Maria Johnson',
    role: 'Honda Civic Owner',
    rating: 5,
    comment: 'Transparent, fast, and the shop is immaculate. They kept me updated throughout the entire brake service. I won\'t go anywhere else.',
    initial: 'M',
  },
  {
    name: 'Robert Davis',
    role: 'Ford F-150 Owner',
    rating: 5,
    comment: 'The level of detail in their work is incredible. My truck runs like new after the engine diagnostics and tune-up. Excellent value.',
    initial: 'R',
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight mb-4 uppercase">What Our Customers Say</h2>
          <div className="h-1 w-20 bg-tertiary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`p-10 rounded-2xl flex flex-col justify-between border border-outline-variant/10 ${
                index === 1
                  ? 'bg-surface-container scale-105 shadow-2xl border-outline-variant/20'
                  : 'bg-surface-container-low'
              }`}
            >
              <div>
                <div className="flex text-tertiary mb-6 gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-lg italic text-on-surface-variant mb-8 leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary-container border border-tertiary/30 flex items-center justify-center text-tertiary font-bold text-lg shrink-0">
                  {review.initial}
                </div>
                <div>
                  <h5 className="font-bold">{review.name}</h5>
                  <p className="text-xs uppercase text-on-secondary-container">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
