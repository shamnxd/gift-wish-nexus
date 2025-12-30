import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SponsorCarousel from '@/components/SponsorCarousel';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Santa's Letters - Write to Santa & Make Christmas Magical</title>
        <meta name="description" content="Write your letter to Santa, share your Christmas wishes, and let our generous sponsors help bring joy to your heart. Join thousands of children spreading holiday magic." />
      </Helmet>
      
      <Snowfall />
      <Navbar />
      
      <main>
        <HeroSection />
        <SponsorCarousel />
        <HowItWorks />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
