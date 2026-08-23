/**
 * Services Section
 * 
 * Detailed grid of shipping services offered.
 * Each card features icon, title, description, and hover effects.
 * Services are loaded from server.
 */

import { useState, useEffect } from "react";
import { apiEndpoints } from "@/config/api";
import { 
  Ship, 
  Clock, 
  FileCheck, 
  Warehouse, 
  Calculator, 
  Handshake,
  MapPin,
  Truck,
  Anchor,
  Navigation,
  Compass,
  Package,
  Box,
  Briefcase,
  FileText,
  ClipboardList,
  BarChart,
  TrendingUp,
  DollarSign,
  CreditCard,
  Receipt,
  Users,
  UserCheck,
  Shield,
  Award,
  Star,
  Globe,
  Map,
  type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// SubService interface (matching AdminConsole)
export interface SubService {
  id: string;
  name: string;
  price: number;
  unit: string;
  features: string[];
}

// Content item for rich text sections
export interface ContentItem {
  id: string;
  title: string;
  description: string;
}

// Service interface (matching AdminConsole)
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  image?: string;
  link: string;
  subServices: SubService[];
  termsAndConditions?: string[];
  whyChoose?: ContentItem[];
  howItWorks?: ContentItem[];
  servicesInclude?: ContentItem[];
}

type ApiService = Partial<Service> & Pick<Service, "id" | "name" | "slug">;

const iconMap: Record<string, LucideIcon> = {
  Ship, Clock, FileCheck, Warehouse, Calculator, Handshake, MapPin, Truck,
  Anchor, Navigation, Compass, Package, Box, Briefcase, FileText,
  ClipboardList, BarChart, TrendingUp, DollarSign, CreditCard, Receipt,
  Users, UserCheck, Shield, Award, Star, Globe, Map
};

// Default services (fallback if localStorage is empty)
const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    name: "Voyage Operations",
    slug: "voyage-operations",
    description: "End-to-end voyage management including routing optimization, crew coordination, real-time vessel tracking.",
    shortDescription: "End-to-end voyage management including routing optimization, crew coordination, real-time vessel tracking.",
    icon: "Ship",
    link: "/services/voyage-operations",
    subServices: [
      {
        id: "vo-1",
        name: "Time Chartered In / Time Chartered Out",
        price: 50,
        unit: "Per Day",
        features: [
          "Execution of fixture from the day of fixing till final settlement",
          "Route planning & performance monitoring",
          "Bunker planning (if needed)",
          "Cargo optimization",
          "Account management"
        ]
      },
      {
        id: "vo-2",
        name: "Time Chartered In Voyage Out",
        price: 75,
        unit: "Per Day",
        features: [
          "Complete voyage planning and execution",
          "Bunker optimization",
          "Port coordination",
          "Freight and demurrage handling"
        ]
      }
    ],
    termsAndConditions: [],
    whyChoose: [
      { id: "wc-1", title: "Expert Management", description: "Our team of experienced maritime professionals handles every aspect of your voyage, ensuring optimal performance." },
      { id: "wc-2", title: "Cost Efficiency", description: "We have past records showing saving over Million Dollars by optimizing voyages/efficiently handling the issues before it become loss." },
      { id: "wc-3", title: "Real-Time Monitoring", description: "Our team ensures 24x7 availability, so you can utilise our services for any time zone." },
      { id: "wc-4", title: "Regulatory Compliance", description: "Ensure all operations meet international maritime regulations and standards." }
    ],
    howItWorks: [
      { id: "hw-1", title: "Initial Consultation", description: "We discuss your specific needs and goals to tailor our services to your requirements." },
      { id: "hw-2", title: "Voyage Planning", description: "Our experts develop a comprehensive plan covering every aspect of the voyage." },
      { id: "hw-3", title: "Execution and Monitoring", description: "We oversee the entire voyage, providing real-time updates and addressing any issues promptly." },
      { id: "hw-4", title: "Reporting and Analysis", description: "After completion, receive detailed reports and analysis to continuously improve operations." }
    ],
    servicesInclude: [
      { id: "si-1", title: "Route Planning", description: "Optimized routes for fuel efficiency and timely arrivals." },
      { id: "si-2", title: "Port Coordination", description: "Seamless coordination with ports for smooth docking and cargo handling." },
      { id: "si-3", title: "Weather Routing", description: "Advanced weather forecasting to avoid delays and ensure safety." },
      { id: "si-4", title: "Fuel Management", description: "Strategies to minimize fuel consumption and costs." },
      { id: "si-5", title: "Cargo Handling", description: "Efficient loading and unloading processes to reduce turnaround time." },
      { id: "si-6", title: "Compliance Management", description: "Ensuring adherence to all maritime regulations and environmental standards." }
    ]
  },
  {
    id: "2",
    name: "Laytime & Demurrage",
    slug: "laytime-demurrage",
    description: "Precise calculation and documentation of laytime, demurrage, and despatch to protect your commercial interests.",
    shortDescription: "Precise calculation and documentation of laytime, demurrage, and despatch to protect your commercial interests.",
    icon: "Clock",
    link: "/services/laytime-demurrage",
    subServices: [
      {
        id: "ld-1",
        name: "Advance Laytime Preparation",
        price: 100,
        unit: "Per Port",
        features: [
          "Including Basic Laytime Preparation",
          "Negotiation of Laytime with counter party",
          "Settling any legal related matter with counter party"
        ]
      },
      {
        id: "ld-2",
        name: "Basic Laytime",
        price: 20,
        unit: "Per Port",
        features: [
          "Standard laytime calculation",
          "Demurrage/Despatch calculation",
          "Documentation preparation"
        ]
      }
    ],
    termsAndConditions: [
      "The service charge as mentioned is basis per port basis per laytime.",
      "BMSA will prepare laytime basis the documents uploaded.",
      "This service is only limited to calculation & presentation."
    ]
  },
  {
    id: "3",
    name: "Charter Party Review",
    slug: "charter-party-review",
    description: "Expert analysis of charter party agreements ensuring favorable terms and risk mitigation strategies.",
    shortDescription: "Expert analysis of charter party agreements ensuring favorable terms and risk mitigation strategies.",
    icon: "FileCheck",
    link: "/services/charter-party-review",
    subServices: [],
    termsAndConditions: []
  },
  {
    id: "4",
    name: "Hold Cleaning & Guidance",
    slug: "hold-cleaning-guidance",
    description: "Professional guidance on cargo hold preparation meeting the highest industry cleanliness standards.",
    shortDescription: "Professional guidance on cargo hold preparation meeting the highest industry cleanliness standards.",
    icon: "Warehouse",
    link: "/services/hold-cleaning-guidance",
    subServices: [],
    termsAndConditions: []
  },
  {
    id: "5",
    name: "Ship Brokerage",
    slug: "ship-brokerage",
    description: "Connecting ship owners with charterers through our extensive global network of maritime contacts.",
    shortDescription: "Connecting ship owners with charterers through our extensive global network of maritime contacts.",
    icon: "Handshake",
    link: "/services/ship-brokerage",
    subServices: [],
    termsAndConditions: []
  },
  {
    id: "6",
    name: "Rice Detention & Calculation",
    slug: "rice-detention-calculation",
    description: "Specialist rice detention assessment and precise cargo calculation services for accurate grain handling.",
    shortDescription: "Specialist rice detention assessment and precise cargo calculation services for accurate grain handling.",
    icon: "Calculator",
    link: "/services/rice-detention-calculation",
    subServices: [],
    termsAndConditions: []
  },
  {
    id: "7",
    name: "Portcaptain",
    slug: "portcaptain",
    description: "Professional vessel attendance, crew changes, supplies coordination, and ship-shore liaison services.",
    shortDescription: "Professional vessel attendance, crew changes, supplies coordination, and ship-shore liaison services.",
    icon: "Truck",
    link: "/services/portcaptain",
    subServices: [],
    termsAndConditions: []
  },
];

const ServicesSection = () => {
  // Load services from server API (synced with Admin Console)
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = apiEndpoints.services();
        console.log("Fetching services from:", apiUrl);
        const response = await fetch(apiUrl);
        console.log("Services response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Services data received:", data);
          
          if (Array.isArray(data) && data.length > 0) {
            console.log("Mapping", data.length, "services from server");
            // Map stored services to display format with full data including subServices
            const mappedServices: Service[] = data.map((s: ApiService) => ({
              id: s.id,
              name: s.name,
              slug: s.slug,
              description: s.description || "",
              shortDescription: s.shortDescription || s.description || "",
              icon: s.icon || "Ship",
              image: s.image,
              link: s.link || `/services/${s.slug}`,
              subServices: s.subServices || [],
              termsAndConditions: s.termsAndConditions || [],
              whyChoose: s.whyChoose || [],
              howItWorks: s.howItWorks || [],
              servicesInclude: s.servicesInclude || [],
            }));
            console.log("Setting mapped services:", mappedServices);
            setServices(mappedServices);
          } else {
            console.warn("No services received from server or data is not an array");
          }
        } else {
          console.error("Services response not ok:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error loading services from server:", error);
        // Keep default services on error
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="bg-secondary/30 py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16 opacity-0 animate-fade-in-up">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Our Services
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Comprehensive{" "}
            <span className="text-gradient">Shipping Solutions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From voyage planning to port operations, we offer a full spectrum of maritime services tailored to your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 opacity-0 animate-fade-in-up animation-delay-200">
          {services.map((service) => {
            // Get the icon component from the map, fallback to Ship
            const IconComponent = iconMap[service.icon] || Ship;
            const sharedClassName = "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 block no-underline";
            const sharedContent = (
              <>
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary transition-all duration-300 group-hover:bg-primary">
                    <IconComponent className="h-7 w-7 text-secondary-foreground transition-colors group-hover:text-primary-foreground" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.shortDescription}
                  </p>
                </div>
              </>
            );
            
            return service.link ? (
              <Link
                key={service.id}
                to={service.link}
                className={sharedClassName}
              >
                {sharedContent}
              </Link>
            ) : (
              <div
                key={service.id}
                className={sharedClassName}
              >
                {sharedContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Helper function to fetch services from server (async)
export const fetchServicesFromServer = async (): Promise<Service[]> => {
  try {
    const apiUrl = apiEndpoints.services();
    console.log("fetchServicesFromServer - API URL:", apiUrl);
    const response = await fetch(apiUrl);
    console.log("fetchServicesFromServer - Response status:", response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log("fetchServicesFromServer - Data:", data);
      
      if (Array.isArray(data) && data.length > 0) {
        return data.map((s: ApiService) => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          description: s.description || "",
          shortDescription: s.shortDescription || s.description || "",
          icon: s.icon || "Ship",
          image: s.image,
          link: s.link || `/services/${s.slug}`,
          subServices: s.subServices || [],
          termsAndConditions: s.termsAndConditions || [],
          whyChoose: s.whyChoose || [],
          howItWorks: s.howItWorks || [],
          servicesInclude: s.servicesInclude || [],
        }));
      }
    } else {
      console.error("fetchServicesFromServer - Response not ok:", response.status);
    }
  } catch (error) {
    console.error("Error loading services from server:", error);
  }
  console.log("fetchServicesFromServer - Falling back to DEFAULT_SERVICES");
  return DEFAULT_SERVICES;
};

// Helper function to get a single service by slug from server (async)
export const fetchServiceBySlug = async (slug: string): Promise<Service | undefined> => {
  try {
    const apiUrl = apiEndpoints.serviceDetail(slug);
    console.log("fetchServiceBySlug - API URL:", apiUrl);
    const response = await fetch(apiUrl);
    console.log("fetchServiceBySlug - Response status:", response.status);
    
    if (response.ok) {
      const service = await response.json();
      console.log("fetchServiceBySlug - Service data:", service);
      
      return {
        id: service.id,
        name: service.name,
        slug: service.slug,
        description: service.description || "",
        shortDescription: service.shortDescription || service.description || "",
        icon: service.icon || "Ship",
        image: service.image,
        link: service.link || `/services/${service.slug}`,
        subServices: service.subServices || [],
        termsAndConditions: service.termsAndConditions || [],
        whyChoose: service.whyChoose || [],
        howItWorks: service.howItWorks || [],
        servicesInclude: service.servicesInclude || [],
      };
    } else {
      console.error("fetchServiceBySlug - Response not ok:", response.status);
    }
  } catch (error) {
    console.error("Error loading service from server:", error);
  }
  return undefined;
};

// Legacy sync helper (for backward compatibility) - now uses defaults
export const getServicesFromStorage = (): Service[] => {
  return DEFAULT_SERVICES;
};

// Legacy sync helper (for backward compatibility)
export const getServiceBySlug = (slug: string): Service | undefined => {
  return DEFAULT_SERVICES.find(s => s.slug === slug);
};

// Export icon map for use by other components
export { iconMap };

export default ServicesSection;