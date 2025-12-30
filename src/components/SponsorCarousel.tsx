import React from 'react';

const sponsors = [
  { name: 'ToyWorld', color: 'from-blue-500 to-blue-600' },
  { name: 'KidsJoy', color: 'from-pink-500 to-rose-500' },
  { name: 'Happy Games', color: 'from-purple-500 to-violet-600' },
  { name: 'Magic Gifts', color: 'from-amber-500 to-orange-500' },
  { name: 'Dream Factory', color: 'from-teal-500 to-cyan-600' },
  { name: 'Wonder Co', color: 'from-green-500 to-emerald-600' },
  { name: 'Star Toys', color: 'from-indigo-500 to-blue-600' },
  { name: 'Little Heroes', color: 'from-red-500 to-rose-600' },
];

const SponsorCarousel: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-muted/50 py-8">
      <p className="text-center text-muted-foreground mb-6 font-medium">
        ✨ Proudly supported by our generous sponsors ✨
      </p>
      <div className="relative">
        <div className="flex animate-marquee">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-6"
            >
              <div className={`w-40 h-16 rounded-xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">{sponsor.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorCarousel;
