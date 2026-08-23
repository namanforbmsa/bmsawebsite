/**
 * Team Page
 * 
 * Meet the leadership team and key personnel.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { apiEndpoints } from "@/config/api";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  email?: string;
  linkedin?: string;
  bio?: string;
  photo?: string;
  initials?: string;
};

const normalizeTeamPhotoUrl = (photo?: string): string | undefined => {
  if (!photo) return undefined;
  if (photo.startsWith('data:')) return photo;
  if (photo.startsWith('/uploads/')) return photo;
  if (photo.startsWith('http://') || photo.startsWith('https://')) {
    try {
      const url = new URL(photo);
      if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return url.pathname;
      }
      return photo;
    } catch {
      return photo;
    }
  }
  return photo;
};

// Team members are managed via Admin Console - no hardcoded defaults
const DEFAULT_TEAM_MEMBERS: TeamMember[] = [];

const Team = () => {
  const [teamMembers, setTeamMembers] = useState(DEFAULT_TEAM_MEMBERS);

  useEffect(() => {
    // Load team members from server only
    const loadTeamMembers = async () => {
      try {
        const response = await fetch(apiEndpoints.settings());
        if (response.ok) {
          const data = await response.json();
          if (data.teamMembers && Array.isArray(data.teamMembers)) {
            // Add initials to team members
            const membersWithPhotos = data.teamMembers.map((member: TeamMember) => {
              const normalizedPhoto = normalizeTeamPhotoUrl(member.photo);
              const hasValidPhoto = Boolean(normalizedPhoto && typeof normalizedPhoto === 'string' &&
                (normalizedPhoto.startsWith('http://') || normalizedPhoto.startsWith('https://') || normalizedPhoto.startsWith('data:') || normalizedPhoto.startsWith('/uploads/')));
              return {
                ...member,
                initials: member.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase(),
                photo: hasValidPhoto ? normalizedPhoto : undefined,
              };
            });
            setTeamMembers(membersWithPhotos);
          }
        }
      } catch (error) {
        console.error("Failed to load team members from server:", error);
      }
    };

    loadTeamMembers();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-ocean-light/10 py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center opacity-0 animate-fade-in-up">
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                Our People
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Meet the <span className="text-primary">Team</span>
              </h1>
                <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                The talented individuals who make BMSA the trusted name in global shipping.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 opacity-0 animate-fade-in-up animation-delay-200">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-elegant"
                >
                  {/* Avatar */}
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" style={{ objectPosition: 'center 20%' }} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-3xl font-bold text-primary transition-transform group-hover:scale-110">
                          {member.initials}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>

                    {/* Social Links */}
                    <div className="mt-4 flex gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.email && (
                        <div className="relative group/email">
                          <a
                            href={`mailto:${member.email}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover/email:bg-orange-500 group-hover/email:text-white"
                            title={member.email}
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                          <span
                            className="pointer-events-none absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-orange-500 px-3 py-1 text-sm font-medium text-white opacity-0 transition-opacity group-hover/email:opacity-100"
                          >
                            {member.email}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join the Team CTA */}
        <section className="bg-primary py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                Join Our Growing Team
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                We're always looking for talented individuals to join our global family. 
                Explore career opportunities at BMSA.
              </p>
              <a
                href="https://www.linkedin.com/company/bmsa-shipping-india-private-limited/jobs/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-card px-8 py-4 font-medium text-foreground transition-all hover:bg-card/90 hover:shadow-lg"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
