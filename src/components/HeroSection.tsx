/**
 * Hero Section Component
 * 
 * Main landing area with headline, service cards grid, and hero image.
 * Features animated entrance effects and interactive service cards.
 */

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Anchor, Ship, Package, Globe, FileText, Users } from "lucide-react";
import heroShip from "@/assets/hero-ship.jpg";
import voyageImg from "@/assets/Broker,Charter,Hold/Voyage.jpg";
import laytimeImg from "@/assets/Broker,Charter,Hold/Laytime.jpg";
import charterImg from "@/assets/Broker,Charter,Hold/Charter.jpg";
import holdImg from "@/assets/Broker,Charter,Hold/Hold.jpg";
import riceImg from "@/assets/Broker,Charter,Hold/Rice.jpg";
import brokerImg from "@/assets/Broker,Charter,Hold/Broker.jpg";

const services = [
  { 
    icon: Ship, 
    title: "Voyage Operations",
    description: "Full voyage management services",
    link: "/services/voyage-operations"
  },
  { 
    icon: FileText, 
    title: "Laytime & Demurrage",
    description: "Accurate calculation services",
    link: "/services/laytime-demurrage"
  },
  { 
    icon: Anchor, 
    title: "Charter Party Review",
    description: "Expert contract analysis",
    link: "/services/charter-party-review"
  },
  { 
    icon: Package, 
    title: "Hold Cleaning & Guidance",
    description: "Hold cleaning services and expert guidance for safe stowage and discharge",
    link: "/services/hold-cleaning-guidance"
  },
  { 
    icon: Globe, 
    title: "Rice Detention & Calculation",
    description: "Specialised rice detention assessment and accurate cargo calculation services",
    link: "/services/rice-detention-calculation"
  },
  { 
    icon: Users, 
    title: "Ship Brokerage",
    description: "Connecting buyers & sellers",
    link: "/services/ship-brokerage"
  },
];

const HeroSection = () => {
  const [frontSrc, setFrontSrc] = useState<string>(heroShip);
  const [backSrc, setBackSrc] = useState<string>(heroShip);
  const [backVisible, setBackVisible] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const transitionDuration = 700; // ms, keep in sync with CSS
  const resetDelay = 1000; // ms delay before reverting to heroShip on hover-out

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const changeHero = (newSrc: string) => {
    // entering a new image: cancel any pending revert-to-hero timeout
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    if (newSrc === frontSrc) return;
    setBackSrc(newSrc);
    // trigger fade in of back image
    setBackVisible(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      // after fade, make the new image the front and hide back
      setFrontSrc(newSrc);
      setBackVisible(false);
      timeoutRef.current = null;
    }, transitionDuration);
  };

  const scheduleReset = () => {
    if (resetTimeoutRef.current) window.clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = window.setTimeout(() => {
      // Use changeHero so the same crossfade logic runs
      changeHero(heroShip);
      resetTimeoutRef.current = null;
    }, resetDelay);
  };

  return (
    <section id="home" className="relative overflow-hidden hero-gradient py-12 md:py-20">
      {/* Decorative wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      
      <div className="container relative">
        {/* Hero Header */}
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent opacity-0 animate-fade-in-up">
            Global Shipping Solutions
          </p>
          <h1 className="mb-4 font-display text-3xl font-extrabold leading-tight text-foreground opacity-0 animate-fade-in-up animation-delay-100 md:text-5xl lg:text-6xl">
            Complete Solutions for{" "}
            <span className="text-gradient">Commercial Shipping</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground opacity-0 animate-fade-in-up animation-delay-200 md:text-lg">
            Your trusted partner in maritime logistics, delivering excellence across global waters with over 25 years of industry experience.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Service Cards Grid */}
          <div className="opacity-0 animate-fade-in-up animation-delay-300">
            <h2 className="mb-6 font-display text-lg font-semibold text-foreground md:text-xl">
              What are you looking for?
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service, index) => (
                <Link
                  key={service.title}
                  to={service.link}
                  onMouseEnter={() => {
                    if (service.title === "Voyage Operations") changeHero(voyageImg);
                    if (service.title === "Laytime & Demurrage") changeHero(laytimeImg);
                    if (service.title === "Charter Party Review") changeHero(charterImg);
                    if (service.title === "Hold Cleaning & Guidance") changeHero(holdImg);
                    if (service.title === "Rice Detention & Calculation") changeHero(riceImg);
                    if (service.title === "Ship Brokerage") changeHero(brokerImg);
                  }}
                  onMouseLeave={() => {
                    if (
                      service.title === "Voyage Operations" ||
                      service.title === "Laytime & Demurrage" ||
                      service.title === "Charter Party Review" ||
                      service.title === "Hold Cleaning & Guidance" ||
                      service.title === "Rice Detention & Calculation" ||
                      service.title === "Ship Brokerage"
                    )
                      scheduleReset();
                  }}
                  onFocus={() => {
                    if (service.title === "Voyage Operations") changeHero(voyageImg);
                    if (service.title === "Laytime & Demurrage") changeHero(laytimeImg);
                    if (service.title === "Charter Party Review") changeHero(charterImg);
                    if (service.title === "Hold Cleaning & Guidance") changeHero(holdImg);
                    if (service.title === "Rice Detention & Calculation") changeHero(riceImg);
                    if (service.title === "Ship Brokerage") changeHero(brokerImg);
                  }}
                  onBlur={() => {
                    if (
                      service.title === "Voyage Operations" ||
                      service.title === "Laytime & Demurrage" ||
                      service.title === "Charter Party Review" ||
                      service.title === "Hold Cleaning & Guidance" ||
                      service.title === "Rice Detention & Calculation" ||
                      service.title === "Ship Brokerage"
                    )
                      scheduleReset();
                  }}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/30"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-primary">
                    <service.icon className="h-6 w-6 text-secondary-foreground transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="hero" size="lg" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative opacity-0 animate-fade-in-up animation-delay-400">
            <div className="overflow-hidden rounded-2xl shadow-2xl relative transition-transform duration-700 hover:scale-105">
              <img
                src={frontSrc}
                alt="Modern cargo ship sailing on ocean waters at sunset"
                className="h-full w-full object-cover object-center"
                style={{ objectPosition: '50% 50%' }}
              />
              <img
                src={backSrc}
                alt="Alternate hero image"
                className={
                  "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out pointer-events-none " +
                  (backVisible ? "opacity-100" : "opacity-0")
                }
                style={{ objectPosition: '50% 50%' }}
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-card-hover animate-float md:-bottom-6 md:-left-6">
              <div className="text-2xl font-bold text-primary md:text-3xl">25+</div>
              <div className="text-xs text-muted-foreground md:text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
