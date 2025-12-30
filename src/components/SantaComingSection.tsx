import React from 'react';
import { Link } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import santaFullImg from '@/assets/santa-full.png';

const SantaComingSection: React.FC = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Santa Image */}
          <div className="flex justify-center order-2 lg:order-1">
            <img 
              src={santaFullImg} 
              alt="Santa Claus"
              className="w-[280px] md:w-[350px] h-auto animate-fade-in drop-shadow-xl"
            />
          </div>

          {/* Right - Content */}
          <div className="max-w-lg order-1 lg:order-2">
            <h2 className="font-display text-4xl md:text-5xl font-normal text-foreground mb-6">
              Santa claus is<br />
              <span className="text-primary">Coming</span>
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
                <Gift className="w-5 h-5" />
                Get Your Gift
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SantaComingSection;
