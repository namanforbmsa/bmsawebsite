/**
 * Rice Detention & Calculation Page
 * 
 * Detailed information about rice detention and calculation services.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Ship, Clock, FileCheck, Warehouse, Calculator, Handshake, Truck, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCart } from "@/contexts/CartContext";

const servicesSidebar = [
  {
    icon: Ship,
    title: "Voyage Operations",
    description:
      "End-to-end voyage management including routing optimization, crew coordination, real-time vessel tracking.",
    slug: "voyage-operations",
    link: "/services/voyage-operations",
  },
  {
    icon: Clock,
    title: "Laytime & Demurrage",
    description:
      "Precise calculation and documentation of laytime, demurrage, and despatch to protect your commercial interests.",
    slug: "laytime-demurrage",
    link: "/services/laytime-demurrage",
  },
  {
    icon: FileCheck,
    title: "Charter Party Review",
    description:
      "Expert analysis of charter party agreements ensuring favorable terms and risk mitigation strategies.",
    slug: "charter-party-review",
    link: "/services/charter-party-review",
  },
  {
    icon: Warehouse,
    title: "Hold Cleaning & Guidance",
    description:
      "Professional guidance on cargo hold preparation meeting the highest industry cleanliness standards.",
    slug: "hold-cleaning-guidance",
    link: "/services/hold-cleaning-guidance",
  },
  {
    icon: Handshake,
    title: "Ship Brokerage",
    description:
      "Connecting ship owners with charterers through our extensive global network of maritime contacts.",
    slug: "ship-brokerage",
    link: "/services/ship-brokerage",
  },
  {
    icon: Calculator,
    title: "Rice Detention & Calculation",
    description:
      "Specialist rice detention assessment and precise cargo calculation services for accurate grain handling.",
    slug: "rice-detention-calculation",
    link: "/services/rice-detention-calculation",
  },
  {
    icon: Truck,
    title: "Portcaptain",
    description:
      "Professional vessel attendance, crew changes, supplies coordination, and ship-shore liaison services.",
    slug: "portcaptain",
    link: "/services/portcaptain",
  },
];

const RiceDetentionCalculation = () => {
  const { convertPrice } = useCurrency();
  const { addItem, items, decrementItem } = useCart();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 md:py-24">
        {/* Fixed left sidebar on large screens */}
        <aside className="hidden lg:block fixed top-24 left-0 z-40 h-[calc(100vh-6rem)] w-[340px] overflow-y-auto">
          <div className="mx-4 min-h-full rounded-2xl border border-border bg-card p-4 shadow-card">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">Other Services</h3>
            <div className="space-y-2">
              {servicesSidebar.map((service) => {
                const isActive = service.slug === "rice-detention-calculation";
                return (
                  <Link
                    key={service.title}
                    to={service.link}
                    className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? "bg-primary-foreground/20" : "bg-secondary"
                      }`}
                    >
                      <service.icon
                        className={`h-4 w-4 ${
                          isActive ? "text-primary-foreground" : "text-secondary-foreground"
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-sm font-semibold line-clamp-1 ${isActive ? "text-primary-foreground" : "text-foreground"}`}>
                        {service.title}
                      </h4>
                      <p className={`text-xs line-clamp-2 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {service.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="container lg:pl-[340px]">
          {/* Main Content Area */}
          <div>
          {/* Top Header Section */}
          <div className="mb-12 text-center opacity-0 animate-fade-in-up">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Calculator className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Rice Detention Calculation
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Are you struggling with complex rice detention charges ?
            </p>
            <p className="mt-4 text-foreground max-w-3xl mx-auto">
              Rice Detention Calculation helps importers, exporters, and logistics professionals streamline operations and cut costs with precise detention fee calculations.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,1px,1fr] lg:gap-0 opacity-0 animate-fade-in-up animation-delay-200">
            {/* Left Section - Three Parts Stacked */}
            <div className="lg:pr-12 space-y-10">
              {/* Why Choose */}
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  Why Choose Our Rice Detention Calculation Services?
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Industry-Specific Expertise:</strong> We understand the unique logistic and timing nuances involved in rice shipping, ensuring calculations are precise and contextually accurate.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Regulatory Compliance:</strong> Stay compliant with port and carrier requirements through transparent and well-documented reports.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Customizable Solutions:</strong> Whether you're a small exporter or a large trading company, we tailor our services to fit your operation's scale and complexity.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Fast Turnaround:</strong> Receive timely detention reports and alerts so you can take action before charges accumulate.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Support You Can Trust:</strong> Our responsive customer service ensures you're never left in the dark when it comes to crucial shipment data.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Our Services Include */}
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  Our Services Include
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Detailed Detention Time Analysis</strong> Precise calculation of free time, start and end of detention periods, and total chargeable days.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Carrier-Specific Rule Application</strong> Accurate application of individual carrier policies and free time conditions.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Port & Terminal Coordination</strong> Inclusion of port-specific rules, holidays, and working hours in the calculation.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Documentation Review</strong> Verification of shipping documents such as Bills of Lading, Arrival Notices, and Delivery Orders.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Customized Reporting</strong> Clear, organized reports showing all detention-related calculations, ready for audit or billing.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Dispute Support</strong> Assistance in resolving detention disputes with carriers or clients by providing evidence-backed calculations.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Real-Time Alerts</strong> Optional notifications before free time expires to help you take timely action.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Multi-Port & Multi-Carrier Support</strong> Capability to handle complex shipments involving multiple discharge ports and carriers.
                    </div>
                  </li>
                </ul>
              </div>

              {/* How It Works */}
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  How It Works
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Data Input :</strong> Simply enter shipment details, including free time allowances, tariff rates, and other relevant parameters.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Real-Time Tracking :</strong> Our system monitors detention periods throughout the shipping process, updating calculations in real-time.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Customizable Parameters :</strong> Adjust specific conditions like free time and rates to match your unique logistics needs.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Comprehensive Reporting :</strong> Generate detailed reports for review, giving you insights into detention costs and trends.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Orange Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

            {/* Right Section - Packages */}
            <div className="lg:pl-8">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="mb-6">
                  <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                    📦 Package
                  </h3>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Detention Calculation
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Rice Detention Calculation */}
                  <div className="pb-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">
                        Rice Detention Calculation
                      </h4>
                    </div>
                    <p className="mb-3 text-lg font-bold text-primary">
                      {convertPrice(100)} <span className="text-sm font-normal text-muted-foreground">Per Ops</span>
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Includes Detention Calculation as per shipper and BL.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Complex Detention Calculation for per day per shipper per BL.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="border-t border-border pt-4">
                    <h4 className="mb-2 font-semibold text-foreground">Terms & Conditions</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Base price is only service fees.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Additional cost will be charged as per applicable pricing for the respective port and requirement.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Additional Terms & condition applicable as per requirement which to be discussed before service booking.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Now
            </a>
          </div>
        </div>
      </div>
      </main>
      <div className="lg:pl-[340px]">
        <Footer />
      </div>
    </div>
  );
};

export default RiceDetentionCalculation;
