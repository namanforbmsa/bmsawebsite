/**
 * Voyage Operations Page
 * 
 * Detailed information about voyage operation services.
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

const VoyageOperations = () => {
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
                const isActive = service.slug === "voyage-operations";
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
                <Ship className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Voyage Operations
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Are you looking to enhance your shipping efficiency and reduce operational costs?
            </p>
            <p className="mt-4 text-foreground max-w-3xl mx-auto">
              Effective voyage operations are critical to the success of any shipping company. Our professional voyage operation services ensure smooth sailing from port to port, maximizing efficiency while minimizing costs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,1px,1fr] lg:gap-0 opacity-0 animate-fade-in-up animation-delay-200">
            {/* Left Section - Three Parts Stacked */}
            <div className="lg:pr-12 space-y-10">
              {/* Why Choose */}
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  Why Choose Our Voyage Operation Services?
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Expert Management:</strong> Our team of experienced maritime professionals handles every aspect of your voyage, ensuring optimal performance.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Cost Efficiency:</strong> We have past records showing saving over Million Dollars by optimizing voyages/efficiently handling the issues before it become loss.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Real-Time Monitoring:</strong> Our team ensures 24 x7 availability, so you can utilise our services for any time zone.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Regulatory Compliance:</strong> Ensure all operations meet international maritime regulations and standards.
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
                      <strong>Initial Consultation:</strong> We discuss your specific needs and goals to tailor our services to your requirements. We can cater to all your needs whether you own 1 ship or fleet of 100 ships.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Voyage Planning:</strong> Our experts develop a comprehensive plan covering every aspect of the voyage. Team is having experience to handle 1000+ voyages in period of last 12 months and overall industry experience over 25 years.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Execution and Monitoring:</strong> We oversee the entire voyage, providing real-time updates and addressing any issues promptly.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <strong>Reporting and Analysis:</strong> After completion, receive detailed reports and analysis to continuously improve operations.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Our Services Include */}
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  Our Services Include
                </h2>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Route Planning:</strong> Optimized routes for fuel efficiency and timely arrivals.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Port Coordination:</strong> Seamless coordination with ports for smooth docking and cargo handling.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Weather Routing:</strong> Advanced weather forecasting to avoid delays and ensure safety.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Fuel Management:</strong> Strategies to minimize fuel consumption and costs.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Cargo Handling:</strong> Efficient loading and unloading processes to reduce turnaround time.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Compliance Management:</strong> Ensuring adherence to all maritime regulations and environmental standards.</span>
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
                    Post Fixture Voyage Operations
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Package 1: Time Chartered In / Time Chartered Out */}
                  <div className="border-b border-border pb-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">
                        Time Chartered In / Time Chartered Out
                      </h4>
                    </div>
                    <p className="mb-3 text-lg font-bold text-primary">
                      {convertPrice(50)} <span className="text-sm font-normal text-muted-foreground">Per Day</span>
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Execution of fixture from the day of fixing till final settlement.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Route planning & performance monitoring.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Bunker planning (if needed).</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Cargo optimization.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Account management.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Package 2: Time Chartered In Voyage out */}
                  <div className="border-b border-border pb-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">
                        Time Chartered In Voyage out
                      </h4>
                    </div>
                    <p className="mb-3 text-lg font-bold text-primary">
                      {convertPrice(75)} <span className="text-sm font-normal text-muted-foreground">Per Day</span>
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Execution of fixture from the day of fixing till final settlement.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Route planning & performance monitoring.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Bunker planning (if needed).</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Cargo optimization.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Account management.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Agency appointments.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Laytime settlement.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Package 3: Relet */}
                  <div className="pb-6">
                    <div className="mb-3">
                      <h4 className="font-semibold text-foreground">Relet</h4>
                    </div>
                    <p className="mb-3 text-lg font-bold text-primary">
                      {convertPrice(50)} <span className="text-sm font-normal text-muted-foreground">Per Day</span>
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Execution of fixture from the day of fixing till final settlement.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Agency appointment (if applicable).</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Account management.</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Laytime settlement.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="border-t border-border pt-4">
                    <h4 className="mb-2 font-semibold text-foreground">Terms & Conditions.</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>To be discussed depending on the type of voyage</span>
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

export default VoyageOperations;
