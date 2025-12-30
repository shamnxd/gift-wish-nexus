import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import santaHero from '@/assets/santa-hero.png';
import stockingImg from '@/assets/stocking.png';
import giftsImg from '@/assets/gifts.png';
import snowmanImg from '@/assets/snowman.png';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden flex items-center pt-16">
      {/* Decorative Elements */}
      <img 
        src={stockingImg} 
        alt="" 
        className="absolute -top-4 -left-4 w-20 md:w-28 animate-float opacity-90 pointer-events-none"
        style={{ animationDelay: '0.5s' }}
      />
      <img 
        src={giftsImg} 
        alt="" 
        className="absolute bottom-20 left-4 md:left-12 w-24 md:w-36 animate-float-reverse opacity-90 pointer-events-none"
        style={{ animationDelay: '1s' }}
      />
      <img 
        src={snowmanImg} 
        alt="" 
        className="absolute bottom-16 right-4 md:right-12 w-20 md:w-28 animate-float opacity-90 pointer-events-none"
        style={{ animationDelay: '0.8s' }}
      />

      {/* Floating circles decoration */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-santa-peach/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-santa-sky/40 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-tight mb-6 animate-fade-in">
              Greetings{' '}
              <span className="block">Santa is coming,</span>
              <span className="block text-primary">Dear Friends</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Find the perfect holiday gift for everyone on your list this year, no matter what's your budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/write-letter">
                <Button variant="christmas" size="lg" className="gap-2 w-full sm:w-auto">
                  <PenLine className="w-5 h-5" />
                  Explore Now
                </Button>
              </Link>
            </div>

            {/* Testimonial Card */}
            <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="inline-flex items-center gap-4 bg-card rounded-2xl p-4 shadow-card border border-border/50">
                <div className="w-12 h-12 rounded-full bg-santa-pink flex items-center justify-center text-2xl">
                  👧
                </div>
                <div>
                  <p className="font-semibold text-foreground">Anima Agrawal</p>
                  <p className="text-sm text-muted-foreground">Good Stuff...</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Santa Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Circular background */}
            <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-santa-peach/50 to-santa-sky/50 blur-sm" />
            
            <img 
              src={santaHero} 
              alt="Santa Claus with gifts"
              className="relative z-10 w-[350px] md:w-[450px] lg:w-[500px] h-auto animate-fade-in-right drop-shadow-2xl"
              style={{ animationDelay: '0.3s' }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-4 md:left-8 flex items-center gap-3 animate-bounce-gentle">
          <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center bg-card/50 backdrop-blur-sm">
            <ChevronDown className="w-5 h-5 text-foreground" />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Scroll down to explore</p>
            <p className="text-xs">more about us</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
