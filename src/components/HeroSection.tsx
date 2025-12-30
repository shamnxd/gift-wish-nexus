import React from "react";
import { Link } from "react-router-dom";
import { PenLine, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import santaHero from "@/assets/santa-hero-transparent.png";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden flex items-center pt-20 pb-12">
      {/* Decorative stocking */}
      {/* <img 
        src={stockingImg} 
        alt="" 
        className="absolute -top-2 left-0 w-16 md:w-20 opacity-90 pointer-events-none"
      /> */}

      {/* Decorative gradient circles */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-santa-peach/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-santa-sky/30 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl order-2 lg:order-1">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[1.1] mb-6 animate-fade-in">
              Write to <span className="block text-primary italic">Santa Claus!</span>
            </h1>

            <p
              className="text-base md:text-lg text-muted-foreground mb-8 animate-fade-in leading-relaxed max-w-md"
              style={{ animationDelay: "0.2s" }}
            >
              Share your Christmas wishes with Santa and let our generous sponsors help make your dreams come true this holiday season.
            </p>

            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/write-letter">
                <Button variant="christmas" size="lg" className="gap-2 text-base px-8">
                  <PenLine className="w-5 h-5" />
                  Write Your Letter
                </Button>
              </Link>
            </div>

            {/* Testimonial Card */}
            <div className="mt-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="inline-flex items-center gap-4 bg-card/90 backdrop-blur-sm rounded-2xl py-3 px-5 shadow-card border border-border/30">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-santa-pink to-santa-peach flex items-center justify-center text-xl flex-shrink-0">
                  🎄
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Emma, Age 8</p>
                  <p className="text-xs text-muted-foreground mb-1">"Santa answered my letter!"</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Santa Image */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <img
                src={santaHero}
                alt="Santa Claus with Christmas tree"
                className="w-[300px] sm:w-[360px] md:w-[420px] lg:w-[480px] h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
