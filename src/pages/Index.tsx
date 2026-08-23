/**
 * Index Page - BMSA Shipping Homepage
 * 
 * Main landing page with hero section and key highlights.
 * Other content is now on separate pages.
 */

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HomeHighlights from "@/components/HomeHighlights";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Header - Sticky navigation with logo and links */}
      <Header />
      
      {/* Main content wrapper */}
      <main>
        {/* Hero Section - Primary headline, service cards, hero image */}
        <HeroSection />

        {/* New highlights section: stats, CTA, images */}
        <HomeHighlights />

        {/* Features Section - Why choose us with 4 feature cards */}
        <FeaturesSection />
      </main>
      
      {/* Footer - Links, social media, copyright */}
      <Footer />
    </div>
  );
};

export default Index;
