import React from 'react';
import { PenLine, Send, Gift, MapPin } from 'lucide-react';

const steps = [
  {
    icon: PenLine,
    title: 'Write Your Letter',
    description: 'Share your Christmas wishes and tell Santa about your wonderful year.',
    color: 'bg-primary text-primary-foreground',
  },
  {
    icon: Send,
    title: 'Send to Santa',
    description: 'Your letter travels magically to the North Pole for Santa to read.',
    color: 'bg-santa-sky text-santa-dark',
  },
  {
    icon: MapPin,
    title: 'Mark Your Location',
    description: 'Help Santa find you by marking your location on the map.',
    color: 'bg-santa-peach text-santa-dark',
  },
  {
    icon: Gift,
    title: 'Receive Your Gift',
    description: 'Santa and our sponsors work together to bring joy to your doorstep.',
    color: 'bg-accent text-accent-foreground',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-normal text-foreground mb-4">
            How the Magic <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            In just a few simple steps, your Christmas wishes can come true!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-green">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
