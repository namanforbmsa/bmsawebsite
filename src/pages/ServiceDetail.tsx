/**
 * Dynamic Service Detail Page
 * 
 * Displays service details based on the URL slug.
 * Falls back to 404 if service not found.
 */

import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCart } from "@/contexts/CartContext";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { 
  fetchServiceBySlug, 
  fetchServicesFromServer, 
  iconMap,
  type Service,
  type SubService 
} from "@/components/ServicesSection";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { convertPrice } = useCurrency();
  const { addItem, items, decrementItem } = useCart();
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    
    // Load service data from server
    const loadServices = async () => {
      try {
        const services = await fetchServicesFromServer();
        setAllServices(services);
        
        if (slug) {
          const foundService = await fetchServiceBySlug(slug);
          setService(foundService || null);
        }
      } catch (error) {
        console.error("Error loading service:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadServices();
  }, [slug]);

  // Get icon component from iconMap
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || iconMap["Ship"];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If service not found, redirect to 404
  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const ServiceIcon = getIconComponent(service.icon);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 md:py-24">
        {/* Fixed left sidebar on large screens */}
        <aside className="hidden lg:block fixed top-24 left-0 z-40 h-[calc(100vh-6rem)] w-[340px] overflow-y-auto">
          <div className="mx-4 min-h-full rounded-2xl border border-border bg-card p-4 shadow-card">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">Other Services</h3>
            <div className="space-y-2">
              {allServices.map((s) => {
                const isActive = s.slug === slug;
                const Icon = getIconComponent(s.icon);
                return (
                  <Link
                    key={s.id}
                    to={s.link}
                    className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? "bg-primary-foreground/20" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive ? "text-primary-foreground" : "text-secondary-foreground"
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-sm font-semibold line-clamp-1 ${isActive ? "text-primary-foreground" : "text-foreground"}`}>
                        {s.name}
                      </h4>
                      <p className={`text-xs line-clamp-2 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {s.shortDescription || s.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="container lg:pl-[340px]">
          {/* Back Button for Mobile */}
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          {/* Main Content Area */}
          <div>
            {/* Top Header Section */}
            <div className="mb-12 text-center opacity-0 animate-fade-in-up">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <ServiceIcon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  {service.name}
                </h1>
              </div>
              {service.shortDescription && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {service.shortDescription}
                </p>
              )}
            </div>

            {/* Description */}
            {service.description && (
              <div className="mb-12 text-center opacity-0 animate-fade-in-up animation-delay-100">
                <p className="text-foreground max-w-3xl mx-auto">
                  {service.description}
                </p>
              </div>
            )}

            {/* Main Two-Column Layout (like VoyageOperations) */}
            {((service.whyChoose && service.whyChoose.length > 0) || 
              (service.howItWorks && service.howItWorks.length > 0) || 
              (service.servicesInclude && service.servicesInclude.length > 0) ||
              (service.subServices && service.subServices.length > 0)) && (
              <div className="grid gap-8 lg:grid-cols-[1fr,1px,1fr] lg:gap-0 opacity-0 animate-fade-in-up animation-delay-200">
                {/* Left Section - Content Sections */}
                <div className="lg:pr-12 space-y-10">
                  {/* Why Choose */}
                  {service.whyChoose && service.whyChoose.length > 0 && (
                    <div>
                      <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                        Why Choose Our {service.name}?
                      </h2>
                      <ul className="space-y-4">
                        {service.whyChoose.map((item) => (
                          <li key={item.id} className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            <div>
                              <strong>{item.title}:</strong> {item.description}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* How It Works */}
                  {service.howItWorks && service.howItWorks.length > 0 && (
                    <div>
                      <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                        How It Works
                      </h2>
                      <ul className="space-y-4">
                        {service.howItWorks.map((item) => (
                          <li key={item.id} className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            <div>
                              <strong>{item.title}:</strong> {item.description}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Our Services Include */}
                  {service.servicesInclude && service.servicesInclude.length > 0 && (
                    <div>
                      <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                        Our Services Include
                      </h2>
                      <ul className="space-y-3">
                        {service.servicesInclude.map((item) => (
                          <li key={item.id} className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong>{item.title}:</strong> {item.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Orange Divider */}
                <div className="hidden lg:block w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

                {/* Right Section - Packages */}
                <div className="lg:pl-8">
                  {service.subServices && service.subServices.length > 0 && (
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                      <div className="mb-6">
                        <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                          📦 Package
                        </h3>
                        <h2 className="font-display text-2xl font-bold text-foreground">
                          {service.name}
                        </h2>
                      </div>

                      <div className="space-y-6">
                        {service.subServices.map((subService) => {
                          const cartItem = items.find(
                            (item) => item.id === `${service.slug}-${subService.id}`
                          );
                          const quantity = cartItem?.quantity || 0;

                          return (
                            <div key={subService.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                              <div className="mb-3">
                                <h4 className="font-semibold text-foreground">
                                  {subService.name}
                                </h4>
                              </div>
                              <p className="mb-3 text-lg font-bold text-primary">
                                {convertPrice(subService.price)} <span className="text-sm font-normal text-muted-foreground">{subService.unit}</span>
                              </p>
                              {subService.features && subService.features.length > 0 && (
                                <ul className="space-y-2 text-sm text-foreground">
                                  {subService.features.map((feature, idx) => (
                                    <li key={idx} className="flex gap-2">
                                      <span>•</span>
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Service Image Banner - moved below content */}
            {service.image && (
              <div className="my-12 rounded-2xl overflow-hidden opacity-0 animate-fade-in-up animation-delay-300">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            )}

            {/* Terms & Conditions */}
            {service.termsAndConditions && service.termsAndConditions.length > 0 && (
              <div className="mb-12 opacity-0 animate-fade-in-up animation-delay-400">
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                    Terms & Conditions
                  </h2>
                  <ul className="space-y-3">
                    {service.termsAndConditions.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary font-bold">{idx + 1}.</span>
                        <span className="text-muted-foreground">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="text-center opacity-0 animate-fade-in-up animation-delay-500">
              <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/5 to-ocean-light/10 p-8">
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
                  Ready to Get Started?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Contact us today to discuss your {service.name.toLowerCase()} requirements and receive a customized quote.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
