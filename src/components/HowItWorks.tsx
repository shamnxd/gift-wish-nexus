import React from 'react';
import { PenLine, Send, Gift, MapPin } from 'lucide-react';

const steps = [
  {
    icon: PenLine,
    title: 'Write Your Letter',
    description: 'Share your Christmas wishes and tell Santa about your wonderful year.',
    color: 'bg-primary',
  },
  {
    icon: Send,
    title: 'Send to Santa',
    description: 'Your letter travels magically to the North Pole for Santa to read.',
    color: 'bg-secondary',
  },
  {
    icon: MapPin,
    title: 'Mark Your Location',
    description: 'Help Santa find you by marking your location on the map.',
    color: 'bg-christmas-gold',
  },
  {
    icon: Gift,
    title: 'Receive Your Gift',
    description: 'Santa and our sponsors work together to bring joy to your doorstep.',
    color: 'bg-primary',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How the Magic <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            In just a few simple steps, your Christmas wishes can come true!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-christmas group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
