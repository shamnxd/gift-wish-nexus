import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { PenLine, Gift, MapPin, Upload, Send, CheckCircle2, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { saveLetter } from '@/lib/firebase/letters';

const giftCategories = [
  { value: 'toys', label: '🧸 Toys & Games' },
  { value: 'books', label: '📚 Books & Learning' },
  { value: 'sports', label: '⚽ Sports & Outdoors' },
  { value: 'arts', label: '🎨 Arts & Crafts' },
  { value: 'electronics', label: '🎮 Electronics' },
  { value: 'clothes', label: '👕 Clothes & Accessories' },
  { value: 'other', label: '✨ Other' },
];

const WriteLetter: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    category: '',
    message: '',
    location: '',
    drawing: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.childName || !formData.age || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveLetter({
        childName: formData.childName,
        age: Number(formData.age),
        category: formData.category || 'other',
        message: formData.message,
        location: formData.location || 'Unknown',
      }, formData.drawing || undefined);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Your letter has been sent to Santa!');
    } catch (error) {
      console.error('Error saving letter:', error);
      setIsSubmitting(false);
      toast.error('Failed to send letter. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, drawing: e.target.files[0] });
      toast.success('Drawing uploaded successfully!');
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Letter Sent! - SecretSanta</title>
        </Helmet>
        
        <Snowfall />
        <Navbar />
        
        <main className="min-h-screen bg-gradient-hero pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-scale-in">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-green">
                  <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                  Ho Ho Ho! 🎅
                </h1>
                
                <p className="text-xl text-muted-foreground mb-4">
                  Thank you, <span className="text-primary font-semibold">{formData.childName}</span>!
                </p>
                
                <div className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-card">
                  <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                  <p className="text-lg text-foreground leading-relaxed">
                    Your letter has been magically delivered to the North Pole! Santa and his elves are reading it with big smiles. Keep being wonderful!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="christmas" size="lg" onClick={() => setIsSubmitted(false)}>
                    <PenLine className="w-5 h-5 mr-2" />
                    Write Another Letter
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/')}>
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
        <title>Write Your Letter to Santa - SecretSanta</title>
        <meta name="description" content="Write your heartfelt letter to Santa Claus. Share your Christmas wishes and let the magic begin!" />
      </Helmet>
      
      <Snowfall />
      <Navbar />
      
      <main className="min-h-screen bg-gradient-hero pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <PenLine className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Write Your Letter</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                Dear <span className="text-primary">Santa</span>...
              </h1>
              
              <p className="text-muted-foreground text-lg">
                Tell Santa about your year and share your Christmas wishes!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  About You
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="childName">Your Name *</Label>
                    <Input
                      id="childName"
                      placeholder="What's your name?"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Your Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      min="1"
                      max="18"
                      placeholder="How old are you?"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Gift Category */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Gift Category
                </h2>
                
                <div className="space-y-2">
                  <Label htmlFor="category">What kind of gift would you like?</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {giftCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Letter */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
                  <PenLine className="w-5 h-5 text-primary" />
                  Your Letter to Santa
                </h2>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Write your message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Dear Santa, I've been very good this year..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[200px] resize-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Your Location
                </h2>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Where do you live? (City, Country)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., New York, USA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="h-12"
                  />
                  <p className="text-xs text-muted-foreground">
                    This helps Santa plan his magical journey!
                  </p>
                </div>
              </div>

              {/* Drawing Upload */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-amber-500" />
                  Add a Drawing (Optional)
                </h2>
                
                <div className="space-y-4">
                  <Label htmlFor="drawing">Upload your artwork</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30">
                    <input
                      type="file"
                      id="drawing"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="drawing" className="cursor-pointer">
                      {formData.drawing ? (
                        <div className="space-y-2">
                          <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
                          <p className="text-foreground font-medium">{formData.drawing.name}</p>
                          <p className="text-muted-foreground text-sm">Click to change</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto" />
                          <p className="text-foreground font-medium">Click to upload your drawing</p>
                          <p className="text-muted-foreground text-sm">PNG, JPG up to 5MB</p>
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
                    Sending to the North Pole...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send My Letter to Santa
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

export default WriteLetter;
