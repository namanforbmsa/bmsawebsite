/**
 * Hold Cleaning & Guidance Page
 * 
 * Detailed information about hold cleaning and guidance services.
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

const HoldCleaningGuidance = () => {
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
                const isActive = service.slug === "hold-cleaning-guidance";
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
                <Warehouse className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Hold Cleaning & Guidance
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Is cargo contamination costing you time and money?
            </p>
            <p className="mt-4 text-foreground max-w-3xl mx-auto">
              Our professional hold cleaning services guarantee your cargo holds are spotless and ready for the next shipment.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,1px,1fr] lg:gap-0 opacity-0 animate-fade-in-up animation-delay-200">
            {/* Left Section - Three Parts Stacked */}
            <div className="lg:pr-12 space-y-10">
              {/* Why Choose */}
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  Why Choose Our Hold Cleaning Services?
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Thorough Cleaning:</strong> We use advanced techniques and equipment to ensure your cargo holds are thoroughly cleaned and free of any residue.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Regulatory Compliance:</strong> Stay compliant with international shipping standards and regulations.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Experienced Team:</strong> Our team of skilled professionals has extensive experience in hold cleaning for various types of cargo.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Quick Turnaround:</strong> Minimize downtime with our efficient and prompt cleaning services.
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
                      <strong>Hold Cleaning & Washing.</strong>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Under Water Cleaning & Repairing.</strong>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Propeller Supper Polishing.</strong>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Hold Inspection.</strong>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Tanker Cleaning.</strong>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Airtight Silos Treatment.</strong>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Cargo Fumigation.</strong>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Our Process */}
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  Our Process
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Inspection:</strong> We start with a detailed inspection to assess the condition of your cargo holds.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Customized Plan:</strong> Based on the inspection, we develop a customized cleaning plan tailored to your specific needs.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Cleaning:</strong> Our team uses specialized equipment and eco-friendly cleaning agents to thoroughly clean the holds.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Final Check:</strong> We perform a final inspection to ensure all holds are clean and ready for the next cargo.
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
                    Hold Cleaning and Guidance
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Hold Cleaning Guidelines */}
                  <div className="border-b border-border pb-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">
                        Hold Cleaning Guidelines
                      </h4>
                    </div>
                    <p className="mb-3 text-lg font-bold text-primary">
                      {convertPrice(750)} <span className="text-sm font-normal text-muted-foreground">Per Cleaning</span>
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Depending on past cargo loaded, guiding Vessel's Master for process of cleaning to follow.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Monitoring hold cleaning progress.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Checking area of concern and recommendations for cleaning.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>In case required, physical assistance in port for guidance same can be arranged basis additional cost as per location.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Management of shore cleaning gang */}
                  <div className="pb-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">Management of shore cleaning gang</h4>
                    </div>
                    <p className="mb-3 text-lg font-bold text-primary">
                      {convertPrice(2000)} <span className="text-sm font-normal text-muted-foreground">Per Cleaning</span>
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Arrangement of shore gangs, equipment & chemical for cleaning.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Co-ordination between all parties from start to end.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="border-t border-border pt-4">
                    <h4 className="mb-2 font-semibold text-foreground">Terms & Conditions</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Base price only includes communication and management fees.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Additional services will be charged as per applicable pricing for the respective port.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Base price does not include cost related to shore gang or cleaning material.</span>
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

export default HoldCleaningGuidance;
