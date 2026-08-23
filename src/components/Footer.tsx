/**
 * Footer Component
 * 
 * Site footer with navigation links, social links, and copyright.
 * Dark gradient background with organized link columns.
 */

import { Ship, Linkedin, Facebook, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useCopyrightYear } from "@/hooks/use-copyright-year";

const footerLinks = {
  services: [
    { label: "Voyage Operations", href: "/services" },
    { label: "Laytime & Demurrage", href: "/services" },
    { label: "Charter Party Review", href: "/services" },
    { label: "Rice Detention & Calculation", href: "/services" },
    { label: "Ship Brokerage", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/about/company" },
    { label: "Our Founder", href: "/about/founder" },
    { label: "Our Team", href: "/about/team" },
    { label: "Careers", href: "/contact" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/contact" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/bmsa-shipping-india-private-limited/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/people/BMSA-Shipping-India-Pvt-Ltd/61566259599057/", label: "Facebook" },
];

const Footer = () => {
  const copyrightYear = useCopyrightYear();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="wave-gradient text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Policy Column (replacing brand column content) */}
          <div>
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <div className="rounded-md bg-white p-1">
                <img src="/BMSALogo.png" alt="BMSA logo" className="h-10 w-auto object-contain" />
              </div>
            </Link>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Company Policy</h4>
            <ul className="mb-6 space-y-2">
              <li>
                <Link to="/terms" className="text-sm opacity-70 transition-opacity hover:opacity-100">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm opacity-70 transition-opacity hover:opacity-100">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/turn-around-time" className="text-sm opacity-70 transition-opacity hover:opacity-100">Turn Around Time Policy</Link>
              </li>
              <li>
                <Link to="/return-refund" className="text-sm opacity-70 transition-opacity hover:opacity-100">Return &amp; Refund Policy</Link>
              </li>
              <li>
                <Link to="/contact-policy" className="text-sm opacity-70 transition-opacity hover:opacity-100">Contact Us Policy</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about/founder" className="text-sm opacity-70 transition-opacity hover:opacity-100">Our Founder</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm opacity-70 transition-opacity hover:opacity-100">About Services</Link>
              </li>
              <li>
                <Link to="/about/team" className="text-sm opacity-70 transition-opacity hover:opacity-100">Our Team</Link>
              </li>
              <li>
                <Link to="/about/company" className="text-sm opacity-70 transition-opacity hover:opacity-100">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Support Emails */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>chartering@bmsagroup.net</li>
              <li>operations@bmsagroup.net</li>
              <li>Ops@bmsagroup.net</li>
              <li>ops@bmsagroup.net</li>
            </ul>
          </div>

          {/* Social Links + Address */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Social Link</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <h4 className="mb-2 font-display text-sm font-semibold">Address</h4>
            <address className="not-italic text-sm leading-relaxed">
              1911, Solus Building, Hiranandani Business Park, Hiranandani Estate, Thane (West), Maharashtra, India - 400607
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm opacity-70">
              © Copyright {copyrightYear} BMSA SHIPPING INDIA PRIVATE LIMITED. All rights reserved. | CIN: U74999MH2021PTC359483
            </p>
            <p className="text-xs opacity-70">
              Site made and maintained by: <a href="https://www.linkedin.com/in/naman-santosh-kumar/" target="_blank" rel="noopener noreferrer" className="underline">Naman Kumar</a>
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm opacity-70 transition-opacity hover:opacity-100"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
