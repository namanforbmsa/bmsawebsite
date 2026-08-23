/**
 * Company Page
 * 
 * About the company - history, mission, vision.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Anchor, Globe, Target, Award } from "lucide-react";
import { useEffect } from "react";

const Company = () => {
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
                About Our Company
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                A Comprehensive Solution for <span className="text-primary">Post‑Fixture & Pre‑Fixture</span> Operations
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                <strong>BMSA SHIPPING INDIA PRIVATE LIMITED</strong> is a Mumbai-based commercial ship
                management firm specializing in post-fixture and pre-fixture operations for dry bulk vessels.
                We also provide post-fixture services for tankers and freight forwarding for container and
                break-bulk cargoes. Our team of highly motivated specialists brings deep industry experience,
                strong market awareness, and a commitment to delivering customer-focused solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 opacity-0 animate-fade-in-up animation-delay-200">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="text-muted-foreground">
                  To provide unparalleled shipping services that exceed client expectations. We simplify the
                  complexities of logistics through innovative strategies and practical technology, delivering
                  seamless experiences and fostering long-term partnerships built on trust and performance.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-coral/10">
                  <Globe className="h-6 w-6 text-coral" />
                </div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Vision</h2>
                <p className="text-muted-foreground">
                  To be the go-to partner for global trade — a company recognized for integrity, operational
                  excellence, and an unwavering dedication to customer success. We envision shipping that creates
                  connections and powers commerce worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-primary py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3 opacity-0 animate-fade-in-up animation-delay-300">
              {[
                { value: "25+", label: "Years Experience" },
                { value: "150+", label: "Countries Served" },
                { value: "1000+", label: "Voyages completed in last 3 years" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center opacity-0 animate-fade-in-up">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-muted-foreground">
                The principles that guide every decision we make and every shipment we handle.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Anchor, title: "Reliability", desc: "We deliver on our promises, every single time." },
                { icon: Globe, title: "Global Reach", desc: "Connecting you to markets worldwide." },
                { icon: Target, title: "Precision", desc: "Attention to detail in every shipment." },
                { icon: Award, title: "Excellence", desc: "Striving for the highest standards." },
              ].map((value, index) => (
                <div key={index} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-elegant">
                  <value.icon className="mb-4 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Company;
