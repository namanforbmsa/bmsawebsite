/**
 * Laytime & Demurrage Page
 * 
 * Detailed information about laytime & demurrage services.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Ship, Clock, FileCheck, Warehouse, Calculator, Handshake, Truck, ChevronDown, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

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

const termsAndConditions = [
  "The service charge as mentioned is basis per port basis per laytime, irrespective of the fact it's reversible or non-reversible. Also, this is basis single receiver & single shipper.",
  "BMSA will prepare lay me basis the documents (SOF, Recap, NOR BL etc.) uploaded.",
  "BMSA will not co-ordinate with any 3rd party unless agreed upon. BMSA will co-ordinate with the counterparty as specified in the CP/Recap & Fixture note only.",
  "BMSA will calculate the lay me purely basis the CP/Recap/Fixture Note provided.",
  "This service is only limited to calculation & presentation and does not include any support for any type of legal assistance.",
  "Any error in documents or missing documents, laytime charges will be paid two times.",
];

const LaytimeAndDemurrage = () => {
  const { convertPrice } = useCurrency();
  const { addItem, items, decrementItem } = useCart();
  const [expandedPackage, setExpandedPackage] = useState<string | null>("dry-bulk");
  
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
                const isActive = service.slug === "laytime-demurrage";
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
                      <h4
                        className={`text-sm font-semibold line-clamp-1 ${
                          isActive ? "text-primary-foreground" : "text-foreground"
                        }`}
                      >
                        {service.title}
                      </h4>
                      <p
                        className={`text-xs line-clamp-2 ${
                          isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
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
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  Laytime & Demurrage
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Are demurrage charges eating into your profits?
              </p>
              <p className="mt-4 text-foreground max-w-3xl mx-auto">
                LTC is crucial in the shipping industry to ensure smooth operations and avoid costly delays. Our expert laytime calculation services help you optimize your operations, save money, and stay ahead of the competition.
              </p>
            </div>

          {/* Main Content with 2-column layout */}
          <div className="grid gap-8 lg:grid-cols-[1fr,1px,1fr] lg:gap-0 opacity-0 animate-fade-in-up animation-delay-200">
            {/* Left Section - Content */}
            <div className="lg:pr-12">

              <div className="space-y-8">
                {/* Why Choose */}
                <div>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                    Why Choose Our Laytime Calculation Services?
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Expertise:</strong> Our team of experienced professionals specializes in precise laytime calculations.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Accuracy:</strong> Eliminate errors and ensure accurate calculations to avoid unnecessary demurrage charges.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Efficiency:</strong> Streamline your operations and reduce turnaround time with our efficient processes.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Compliance:</strong> Stay compliant with industry standards and regulations with our up-to-date knowledge.
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
                        <strong>Laytime Calculation:</strong> Calculation of laytime, including identifying when laytime starts and ends based on the charter party terms.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Demurrage & Despatch Monitoring:</strong> Tracking delays and calculating demurrage or despatch.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Laytime Statements Preparation:</strong> Preparation of laytime statements detailing the amount of time used, deductions and any time that should be counted against the total allowed laytime.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Port and Berth Coordination:</strong> Coordinating with port authorities and terminals to optimize the ship's stay in port and ensure that laytime is used efficiently.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* How Our Service Works */}
                <div>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                    How Our Service Works
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Data Collection:</strong> We gather all relevant data, including charter parties, statements of facts, and time logs.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Detailed Analysis:</strong> Our experts analyze the data to calculate laytime accurately.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Reporting:</strong> Receive comprehensive reports detailing laytime calculations and any potential demurrage or dispatch fees.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <strong>Support:</strong> Ongoing support to address any queries and ensure smooth operations.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Orange Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

            {/* Right Section - Packages */}
            <div className="lg:pl-8 space-y-8">
              {/* Dry Bulk Laytime */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <button
                  onClick={() => setExpandedPackage(expandedPackage === "dry-bulk" ? null : "dry-bulk")}
                  className="flex items-center justify-between w-full mb-6"
                >
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Dry Bulk Laytime
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-foreground transition-transform ${
                      expandedPackage === "dry-bulk" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedPackage === "dry-bulk" && (
                  <div className="space-y-6">
                    {/* Advance Laytime */}
                    <div className="border-b border-border pb-6">
                      <div className="mb-3">
                        <h4 className="font-semibold text-foreground">Advance Laytime Preparation</h4>
                      </div>
                      <p className="mb-3 text-lg font-bold text-primary">
                        {convertPrice(100)} <span className="text-sm font-normal text-muted-foreground">Per Port</span>
                      </p>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Including Basic Laytime Preparation.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Negotiation of Laytime with counter party.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Settling any legal related matter with counter party.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Basic Laytime */}
                    <div>
                      <div className="mb-3">
                        <h4 className="font-semibold text-foreground">Basic Laytime</h4>
                      </div>
                      <p className="mb-3 text-lg font-bold text-primary">
                        {convertPrice(20)} <span className="text-sm font-normal text-muted-foreground">Per Port</span>
                      </p>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Preparation of Laytime.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Splitting of Laytime as per receiver/Shipper.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Presentation of Laytime Summary Report.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Tanker Laytime */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <button
                  onClick={() => setExpandedPackage(expandedPackage === "tanker" ? null : "tanker")}
                  className="flex items-center justify-between w-full mb-6"
                >
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Tanker Laytime
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-foreground transition-transform ${
                      expandedPackage === "tanker" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedPackage === "tanker" && (
                  <div className="space-y-6">
                    {/* Advance Laytime */}
                    <div className="border-b border-border pb-6">
                      <div className="mb-3">
                        <h4 className="font-semibold text-foreground">Advance Laytime Preparation</h4>
                      </div>
                      <p className="mb-3 text-lg font-bold text-primary">
                        {convertPrice(100)} <span className="text-sm font-normal text-muted-foreground">Per Port</span>
                      </p>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Preparation of Laytime.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Negotiation of Laytime with counter party.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Settling any legal related matter with counter party.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Basic Laytime */}
                    <div>
                      <div className="mb-3">
                        <h4 className="font-semibold text-foreground">Basic Laytime</h4>
                      </div>
                      <p className="mb-3 text-lg font-bold text-primary">
                        {convertPrice(20)} <span className="text-sm font-normal text-muted-foreground">Per Port</span>
                      </p>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Preparation of Laytime.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Splitting of Laytime as per receiver/Shipper.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Presentation of Laytime Summary Report.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Gas Carrier Laytime */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <button
                  onClick={() => setExpandedPackage(expandedPackage === "gas-carrier" ? null : "gas-carrier")}
                  className="flex items-center justify-between w-full mb-6"
                >
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Gas Carrier Laytime
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-foreground transition-transform ${
                      expandedPackage === "gas-carrier" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedPackage === "gas-carrier" && (
                  <div className="space-y-6">
                    {/* Advance Laytime */}
                    <div className="border-b border-border pb-6">
                      <div className="mb-3">
                        <h4 className="font-semibold text-foreground">Advance Laytime Preparation</h4>
                      </div>
                      <p className="mb-3 text-lg font-bold text-primary">
                        {convertPrice(100)} <span className="text-sm font-normal text-muted-foreground">Per Port</span>
                      </p>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Including Basic Laytime Preparation.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Negotiation of Laytime with counter party.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Settling any legal related matter with counter party.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Basic Laytime */}
                    <div className="border-b border-border pb-6">
                      <div className="mb-3">
                        <h4 className="font-semibold text-foreground">Basic Laytime</h4>
                      </div>
                      <p className="mb-3 text-lg font-bold text-primary">
                        {convertPrice(20)} <span className="text-sm font-normal text-muted-foreground">Per Port</span>
                      </p>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Preparation of Laytime.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Splitting of Laytime as per receiver/Shipper.</span>
                        </li>
                        <li className="flex gap-2">
                          <span>•</span>
                          <span>Presentation of Laytime Summary Report.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Standalone Terms & Conditions - Always Visible */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="mb-6 font-display text-xl font-bold text-foreground">
                  Terms & Conditions
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {termsAndConditions.map((tc, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{tc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Section */}
              <div className="mt-12">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Contact Now
                </a>
              </div>
            </div>
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

export default LaytimeAndDemurrage;
