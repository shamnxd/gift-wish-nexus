import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden flex items-center">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-christmas-gold rounded-full animate-twinkle" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-christmas-gold rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-christmas-gold rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-christmas-gold-light rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-60 right-1/3 w-4 h-4 bg-christmas-gold-light rounded-full animate-twinkle" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-christmas-snow/10 backdrop-blur-sm border border-christmas-snow/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-christmas-gold" />
            <span className="text-christmas-snow/90 text-sm font-medium">Christmas Magic is Here!</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-christmas-snow mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Write Your Letter to{' '}
            <span className="text-gradient-gold">Santa</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-christmas-snow/80 mb-10 max-w-2xl mx-auto animate-fade-in font-light" style={{ animationDelay: '0.4s' }}>
            Share your wishes, tell Santa about your year, and let the magic of Christmas bring joy to your heart.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/write-letter">
              <Button variant="gold" size="xl" className="gap-3 w-full sm:w-auto">
                <PenLine className="w-6 h-6" />
                Write Your Letter
              </Button>
            </Link>
            <Link to="/sponsor">
              <Button variant="hero" size="xl" className="gap-3 w-full sm:w-auto">
                <Gift className="w-6 h-6" />
                Become a Sponsor
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-display font-bold text-christmas-gold">2,847</p>
              <p className="text-christmas-snow/60 text-sm mt-1">Letters Sent</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-display font-bold text-christmas-gold">156</p>
              <p className="text-christmas-snow/60 text-sm mt-1">Sponsors</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-display font-bold text-christmas-gold">1,523</p>
              <p className="text-christmas-snow/60 text-sm mt-1">Gifts Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
