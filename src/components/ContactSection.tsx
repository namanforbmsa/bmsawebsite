/**
 * Contact Section
 * 
 * Contact form with company information sidebar.
 * Clean form design with validation styling.
 */

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";


const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
      content: (
        <a
          href="https://maps.app.goo.gl/t84k56mTwWuNuHSp9"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          1911, Solus Building, Hiranandani Business Park, Hiranandani Estate, Thane (West), Maharashtra, India - 400607
        </a>
      ),
  },
  {
    icon: Phone,
    title: "Phone",
    content: (
      <>
        <a href="tel:+918450966665" className="underline">+91-84509 66665</a>
        <br />
        <a href="tel:+919004138991" className="underline">+91-90041 38991</a>
      </>
    ),
  },
  {
    icon: Mail,
    title: "Emails",
    content:
      "chartering@bmsagroup.net\noperations@bmsagroup.net\nOps@bmsagroup.net\nops@bmsagroup.net",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "10:00 AM to 4:00 PM",
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const apiBase =
      import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to submit form right now.");
      }

      setStatus({
        type: "success",
        message:
          "Thanks for reaching out. Our team will get back to you shortly.",
      });
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      console.error("Contact form error", error);
      setStatus({
        type: "error",
        message:
          "We could not send your message. Please try again or email chartering@bmsagroup.net directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16 opacity-0 animate-fade-in-up">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Get In Touch
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Ready to <span className="text-gradient">Set Sail?</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Contact our team for personalized shipping solutions. We're here to navigate your maritime logistics needs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 opacity-0 animate-fade-in-up animation-delay-200">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
            >
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Service Required
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="voyage">Voyage Operations</option>
                    <option value="laytime">Laytime & Demurrage</option>
                    <option value="charter">Charter Party Review</option>
                    <option value="rice">Rice Detention & Calculation</option>
                    <option value="brokerage">Ship Brokerage</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Tell us about your shipping requirements..."
                  required
                />
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {status.type !== "idle" && (
                  <p
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl wave-gradient p-6 text-primary-foreground md:p-8">
              <h3 className="mb-6 font-display text-xl font-bold">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold opacity-80">
                        {item.title}
                      </h4>
                      <p className="whitespace-pre-line text-sm">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
