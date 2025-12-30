import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Building2, Gift, Upload, CheckCircle2, Sparkles, Users, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const giftTypes = [
  { value: '10', label: '10 Gifts' },
  { value: '25', label: '25 Gifts' },
  { value: '50', label: '50 Gifts' },
  { value: '100', label: '100 Gifts' },
  { value: 'custom', label: 'Custom Amount' },
];

const Sponsor: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    giftCount: '',
    customCount: '',
    message: '',
    logo: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactEmail || !formData.giftCount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Thank you for your sponsorship!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, logo: e.target.files[0] });
      toast.success('Logo uploaded successfully!');
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Thank You for Sponsoring! - SecretSanta</title>
        </Helmet>
        
        <Snowfall />
        <Navbar />
        
        <main className="min-h-screen bg-gradient-hero pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-scale-in">
                <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Heart className="w-12 h-12 text-accent-foreground fill-current" />
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                  Thank You! 🎄
                </h1>
                
                <p className="text-xl text-muted-foreground mb-4">
                  <span className="text-primary font-semibold">{formData.companyName}</span>, you're making Christmas magical!
                </p>
                
                <div className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-card">
                  <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                  <p className="text-lg text-foreground leading-relaxed">
                    Your generous sponsorship of {formData.giftCount === 'custom' ? formData.customCount : formData.giftCount} gifts will bring joy to children this Christmas!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="christmas" size="lg" onClick={() => setIsSubmitted(false)}>
                    <Gift className="w-5 h-5 mr-2" />
                    Sponsor More Gifts
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.location.href = '/'}>
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Become a Sponsor - SecretSanta</title>
        <meta name="description" content="Sponsor Christmas gifts and make a difference in children's lives." />
      </Helmet>
      
      <Snowfall />
      <Navbar />
      
      <main className="min-h-screen bg-gradient-hero pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Make a Difference</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Become a <span className="text-primary">Gift Sponsor</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Partner with Santa to bring joy to children worldwide. Your brand, their smiles!
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { icon: Users, title: 'Brand Visibility', desc: 'Your logo displayed on all sponsored gifts' },
              { icon: Heart, title: 'Social Impact', desc: 'Make a real difference in children\'s lives' },
              { icon: Globe, title: 'Community Trust', desc: 'Build goodwill and positive brand association' },
            ].map((benefit, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-green">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Info */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Company Information
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Your company name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Sponsorship Details */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-500" />
                  Sponsorship Details
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="giftCount">Number of Gifts to Sponsor *</Label>
                    <Select
                      value={formData.giftCount}
                      onValueChange={(value) => setFormData({ ...formData, giftCount: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent>
                        {giftTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.giftCount === 'custom' && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="customCount">Custom Amount</Label>
                      <Input
                        id="customCount"
                        type="number"
                        min="1"
                        placeholder="Enter number of gifts"
                        value={formData.customCount}
                        onChange={(e) => setFormData({ ...formData, customCount: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Share why you're supporting this cause..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Company Logo
                </h2>
                
                <div className="space-y-4">
                  <Label htmlFor="logo">Upload your logo</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30">
                    <input
                      type="file"
                      id="logo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="logo" className="cursor-pointer">
                      {formData.logo ? (
                        <div className="space-y-2">
                          <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
                          <p className="text-foreground font-medium">{formData.logo.name}</p>
                          <p className="text-muted-foreground text-sm">Click to change</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Building2 className="w-10 h-10 text-muted-foreground mx-auto" />
                          <p className="text-foreground font-medium">Click to upload your logo</p>
                          <p className="text-muted-foreground text-sm">PNG, JPG, SVG up to 2MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="christmas"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Submit Sponsorship
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Sponsor;
