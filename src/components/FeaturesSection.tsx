/**
 * Features / Why Choose Us Section
 * 
 * Highlights key differentiators with icon cards.
 * Clean grid layout with hover effects.
 */

import { Award, TrendingUp, Shield, Heart } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expertise & Experience",
    description: "With over 25 years of industry experience, we have honed our skills to deliver exceptional results in every voyage.",
  },
  {
    icon: TrendingUp,
    title: "Proven Track Record",
    description: "Our customer satisfaction rate speaks volumes about the trust our clients place in our shipping solutions.",
  },
  {
    icon: Shield,
    title: "Commitment to Excellence",
    description: "Our commitment to excellence drives us to go above and beyond, ensuring every project exceeds expectations.",
  },
  {
    icon: Heart,
    title: "Customer-Centric Approach",
    description: "We prioritize your needs and build lasting partnerships through transparent communication and reliable service.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Why Choose Us
          </p>
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-4xl">
            Your Trusted Partner in{" "}
            <span className="text-gradient">Global Service</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We combine decades of maritime expertise with modern technology to deliver unparalleled shipping solutions worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                <feature.icon className="h-8 w-8 text-secondary-foreground transition-colors group-hover:text-primary-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
