/**
 * Founder Page
 * 
 * About the company founder and leadership.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Quote, Linkedin, Mail } from "lucide-react";
import CaptRam from "@/assets/Team/Capt_Ram_Kumar.png";
import { useEffect } from "react";

const Founder = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-ocean-light/10 py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center opacity-0 animate-fade-in-up">
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                Leadership
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Meet Our <span className="text-primary">Founder</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                The visionary behind BMSA's journey from a small local shipper to a global logistics leader.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Profile */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center opacity-0 animate-fade-in-up animation-delay-200">
              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white relative">
                  <img src={CaptRam} alt="Capt. Ram Kumar" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 20%' }} />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-xl bg-card p-4 shadow-elegant">
                  <Quote className="h-8 w-8 text-coral" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  Capt. Ram Kumar
                </h2>
                <p className="mt-2 text-lg font-medium text-primary">Founder & Managing Director</p>
                
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Welcome to <strong>BMSA Shipping India Pvt Ltd</strong>: Where <strong>EXPERTISE</strong> and <strong>COMMITMENTS</strong> meet to drive success in the marine shipping industry.
                  </p>

                  <p>
                    As a leading marine shipping consultancy, we are dedicated to helping global shipping companies
                    navigate the complexities of maritime logistics, regulatory compliance, and operational efficiency.
                    Our mission is to provide comprehensive, tailor-made solutions that empower our clients to make
                    informed decisions and optimize their operations for long-term growth.
                  </p>

                  <p>
                    The global shipping landscape is continuously evolving, bringing both challenges and opportunities.
                    At BMSA Shipping India Pvt Ltd, we pride ourselves on staying ahead of industry trends, using
                    data-driven insights and innovative technologies to address our clients’ most pressing concerns.
                    Whether it’s optimizing fleet performance, ensuring compliance with international regulations,
                    or adopting sustainable practices, we bring the expertise needed to guide your business through
                    every stage of its journey.
                  </p>

                  <p>
                    Our greatest asset is our people an experienced team of consultants, marine engineers, and industry
                    experts who are committed to delivering value and excellence. Their deep knowledge of the maritime
                    sector, combined with a passion for solving complex challenges, ensures that we provide insightful,
                    actionable advice that drives meaningful results.
                  </p>

                  <p>
                    At the heart of everything we do is a client-centric approach. We believe in forging strong, lasting
                    partnerships built on trust, integrity, and a clear understanding of your business goals. We’re not
                    just consultants; we’re your strategic partners, invested in your success.
                  </p>

                  <p>
                    As the Managing Director of BMSA Shipping India Pvt Ltd, I am committed to upholding our values of
                    excellence, reliability, and innovation. Together, we will chart a course towards sustainable growth
                    and success in the maritime industry. Thank you for visiting our site, and we look forward to working with you.
                  </p>

                  <p className="mt-6 text-muted-foreground font-semibold">Safe seas and smooth sailing,</p>
                  <p className="mt-2 text-muted-foreground">Capt. Ram Kumar<br/>Founder, BMSA Shipping India Pvt Ltd</p>
                </div>

                <div className="mt-8 flex gap-4">
                  <a href="https://www.linkedin.com/in/ram-kumar-5904665b" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Founder LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Founder Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
};

export default Founder;
