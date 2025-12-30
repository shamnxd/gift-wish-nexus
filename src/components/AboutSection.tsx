import React from 'react';
import { Palette, Volume2 } from 'lucide-react';
import christmasTreeImg from '@/assets/christmas-tree.png';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Christmas Tree Image */}
          <div className="flex justify-center">
            <img 
              src={christmasTreeImg} 
              alt="Christmas Tree with Gifts"
              className="w-[350px] md:w-[450px] h-auto animate-fade-in drop-shadow-xl"
            />
          </div>

          {/* Right - Content */}
          <div className="max-w-lg">
            <h2 className="font-display text-4xl md:text-5xl font-normal text-foreground mb-6">
              About the live<br />
              <span className="text-primary">event</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Fill your Christmas holiday with good cheer, joyful decorations, and 
              unforgettable experiences. Feel free to attend our Christmas event with 
              your children and family and celebrate the most anticipated winter 
              holiday. From Christmas carols to activities for adults and children, 
              Santa has a lot to offer.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-santa-peach flex items-center justify-center flex-shrink-0">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Beautiful Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Contrary to popular belief, Lorem ipsum is not simply random text.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-santa-pink flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Great Sound</h3>
                  <p className="text-sm text-muted-foreground">
                    Contrary to popular belief, Lorem ipsum is not simply random text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
