/**
 * Header Component
 * 
 * Navigation header with logo, nav links, dropdown menus, and CTA button.
 * Features sticky positioning and backdrop blur effect.
 */

import { Button } from "@/components/ui/button";
import { Ship, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [desktopAboutOpen, setDesktopAboutOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const currencies = ["USD", "INR", "CHF", "SGD"] as const;

  const isCurrency = (value: string): value is (typeof currencies)[number] => {
    return currencies.includes(value as (typeof currencies)[number]);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];

  const aboutLinks = [
    { label: "Company", href: "/about/company", desc: "Our history, mission & vision" },
    { label: "Founder", href: "/about/founder", desc: "Meet our visionary leader" },
    { label: "Team", href: "/about/team", desc: "Our leadership & experts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between md:h-20">
        {/* Logo - use BMSA image */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img src="/BMSALogo.png" alt="BMSA logo" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          
          {/* About Us Dropdown */}
          <NavigationMenu value={desktopAboutOpen ? "about" : undefined} onValueChange={(value) => setDesktopAboutOpen(value === "about")}>
            <NavigationMenuList>
              <NavigationMenuItem value="about" onMouseLeave={() => setDesktopAboutOpen(false)}>
                <NavigationMenuTrigger 
                  onClick={() => setDesktopAboutOpen(true)}
                  className="bg-transparent px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent"
                >
                  About Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-3">
                    {aboutLinks.map((item) => (
                      <li key={item.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none text-foreground">
                              {item.label}
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                              {item.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact link moved to appear after About Us */}
          <Link
            to="/contact"
            className="px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Currency Selector */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => {
                const nextCurrency = e.target.value;
                if (isCurrency(nextCurrency)) {
                  setCurrency(nextCurrency);
                }
              }}
              className="appearance-none rounded-lg border-2 border-coral bg-transparent px-4 py-2 pr-10 text-sm font-medium text-coral transition-all hover:bg-coral/10 focus:outline-none focus:ring-2 focus:ring-coral/20 cursor-pointer"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coral" />
          </div>
          
          {/* Checkout removed */}
          
          {/* Login button removed */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-border bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile About Us Accordion */}
            <div>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
              >
                About Us
                <ChevronDown className={cn("h-4 w-4 transition-transform", aboutOpen && "rotate-180")} />
              </button>
              {aboutOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Mobile: Contact link after About Us */}
            <Link
              to="/contact"
              className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Checkout removed */}

            {/* Currency Selector - Mobile */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => {
                  const nextCurrency = e.target.value;
                  if (isCurrency(nextCurrency)) {
                    setCurrency(nextCurrency);
                  }
                }}
                className="w-full appearance-none rounded-lg border-2 border-coral bg-transparent px-4 py-3 pr-10 text-sm font-medium text-coral transition-all hover:bg-coral/10 focus:outline-none focus:ring-2 focus:ring-coral/20 cursor-pointer"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coral" />
            </div>

            {/* Login button removed from mobile menu */}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
