/**
 * Port Captain Page
 * 
 * Detailed information about port captain services.
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

const PortCaptain = () => {
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
                const isActive = service.slug === "portcaptain";
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
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Port Captain
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Are your port operations running smoothly and efficiently?
            </p>
            <p className="mt-4 text-foreground max-w-3xl mx-auto">
              A seasoned Port Captain is crucial for managing port operations, ensuring safety, and maintaining efficiency. Our professional Port Captain services provide you with experienced leadership to streamline your maritime operations.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,1px,1fr] lg:gap-0 opacity-0 animate-fade-in-up animation-delay-200">
            {/* Left Section - Three Parts Stacked */}
            <div className="lg:pr-12 space-y-10">
              {/* Why Choose */}
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  Why Choose Our Port Captain Services?
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Experienced Leadership:</strong> Our Port Captains bring years of maritime experience and expertise.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Operational Efficiency:</strong> Ensure smooth and efficient cargo handling, berthing, and departure processes.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Safety and Compliance:</strong> Maintain the highest safety standards and comply with international maritime regulations.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Problem Resolution:</strong> Quick and effective resolution of any issues that arise during port operations.
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
                      <strong>Cargo Operations Management:</strong> Oversee loading and unloading to ensure efficiency and safety.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Berthing and Mooring Supervision:</strong> Coordinate berthing and mooring operations for optimal vessel positioning.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Safety Inspections:</strong> Conduct regular safety inspections and implement best practices.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Crew Coordination:</strong> Manage and coordinate with the vessel's crew for seamless operations.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Documentation and Reporting:</strong> Handle all necessary documentation and provide detailed reports on port operations.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Regulatory Compliance:</strong> Ensure adherence to local and international maritime regulations
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
                      <strong>Initial Consultation:</strong> Discuss your specific needs and operational challenges.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Assignment:</strong> Assign a fully experienced Port Captain to your operations.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Operational Oversight:</strong> Our Port Captain oversees all aspects of port operations, ensuring efficiency and compliance.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Continuous Improvement:</strong> Receive regular reports and recommendations for continuous operational improvements.
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
                    Port Captain
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Vessel Co-ordination and Management */}
                  <div className="border-b border-border pb-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">
                        Vessel Co-ordination and Management
                      </h4>
                    </div>
                    <p className="mb-3 text-lg font-bold text-primary">
                      {convertPrice(200)} <span className="text-sm font-normal text-muted-foreground">Per Day</span>
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Berthing and unberthing operations.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Docking and undocking assistance.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Mooring and anchorage management.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Tugboat co-ordination.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Cargo Handling and Operations */}
                  <div className="pb-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">Cargo Handling and Operations</h4>
                    </div>
                    <p className="mb-3 text-lg font-bold text-primary">
                      {convertPrice(200)} <span className="text-sm font-normal text-muted-foreground">Per Day</span>
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Cargo loading and unloading supervision.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Cargo stowage planning.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Hazardous cargo management.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Cargo damage inspection and reporting.</span>
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

export default PortCaptain;
