/**
 * Contact Page
 * 
 * Dedicated contact page with form and information.
 */

import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
