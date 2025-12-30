import React from 'react';

const sponsors = [
  { name: 'ToyWorld', color: 'from-blue-400 to-blue-500' },
  { name: 'KidsJoy', color: 'from-pink-400 to-rose-400' },
  { name: 'Happy Games', color: 'from-purple-400 to-violet-500' },
  { name: 'Magic Gifts', color: 'from-amber-400 to-orange-400' },
  { name: 'Dream Factory', color: 'from-teal-400 to-cyan-500' },
  { name: 'Wonder Co', color: 'from-green-400 to-emerald-500' },
  { name: 'Star Toys', color: 'from-indigo-400 to-blue-500' },
  { name: 'Little Heroes', color: 'from-red-400 to-rose-500' },
];

const SponsorCarousel: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-gradient-soft py-12">
      <p className="text-center text-muted-foreground mb-8 font-medium text-sm uppercase tracking-wider">
        Proudly supported by our generous sponsors
      </p>
      <div className="relative">
        <div className="flex animate-marquee">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4"
            >
              <div className={`w-36 h-14 rounded-xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center shadow-soft hover:shadow-card transition-shadow duration-300`}>
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
