/**
 * Services Page
 * 
 * Dedicated page for all shipping services offered.
 */

import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    // Ensure we land at the top of the Services page when navigated to
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
