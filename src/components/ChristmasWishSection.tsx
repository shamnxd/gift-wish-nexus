import React from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import christmasTreeImg from '@/assets/christmas-tree.png';

const ChristmasWishSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-santa-peach/30 to-santa-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="max-w-lg">
            <h2 className="font-display text-4xl md:text-5xl font-normal text-foreground mb-6">
              Christmas wish<br />
              <span className="text-primary">and party</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Fill your Christmas holiday with good cheer, joyful decorations, and 
              unforgettable experiences. Feel free to attend our Christmas event with 
              your children and family and celebrate the most anticipated winter 
              holiday. From Christmas carols to activities for adults and children, 
              Santa has a lot to offer.
            </p>

            <Link to="/write-letter">
              <Button variant="christmas" size="lg" className="gap-2">
                <PartyPopper className="w-5 h-5" />
                Join the Party
              </Button>
            </Link>
          </div>

          {/* Right - Christmas Tree Image */}
          <div className="flex justify-center">
            <img 
              src={christmasTreeImg} 
              alt="Christmas Tree with Gifts"
              className="w-[300px] md:w-[400px] h-auto animate-fade-in drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChristmasWishSection;
