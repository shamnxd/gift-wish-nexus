import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import santaSleighImg from '@/assets/santa-sleigh.png';

const JoinPartySection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! Santa will get back to you soon.');
    setFormData({ fullName: '', email: '', subject: '' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-santa-sky/40 to-santa-sky/20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-normal text-foreground text-center mb-12">
          Join the <span className="text-primary">party</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-santa-peach flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Contact Us</h3>
                <p className="text-sm text-muted-foreground">Please fill this form in a decent manner</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-background border-border/50"
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border/50"
                required
              />
              <Textarea
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="bg-background border-border/50 min-h-[80px]"
                required
              />
              <Button type="submit" variant="christmas" className="w-full gap-2">
                <Send className="w-4 h-4" />
                Submit
              </Button>
            </form>
          </div>

          {/* Right - Santa Sleigh Image */}
          <div className="flex justify-center">
            <img 
              src={santaSleighImg} 
              alt="Santa on Sleigh with Reindeer"
              className="w-[350px] md:w-[450px] h-auto animate-float drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinPartySection;
