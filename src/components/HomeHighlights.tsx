import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import tankImg from "@/assets/Ships/Tank.jpg";
import containerImg from "@/assets/Ships/Container.jpg";
import bulkImg from "@/assets/Ships/Bulk.jpg";
import StatsGraphs from "./StatsGraphs";
import { apiEndpoints } from "@/config/api";

const HomeHighlights = () => {
  const [stats, setStats] = useState([
    { value: "23", label: "Current Fleet Under Our Management" },
    { value: "610", label: "Total Vessels Handled under Our Management Since 2021" },
    { value: "1012", label: "Voyages Executed Under Our Management" },
  ]);

  useEffect(() => {
    // Load fleet statistics from server only
    const loadFleetStats = async () => {
      try {
        const response = await fetch(apiEndpoints.settings());
        if (response.ok) {
          const data = await response.json();
          if (data.fleetStats) {
            setStats([
              { value: String(data.fleetStats.currentFleet), label: "Current Fleet Under Our Management" },
              { value: String(data.fleetStats.totalVessels), label: "Total Vessels Handled under Our Management Since 2021" },
              { value: String(data.fleetStats.totalVoyages), label: "Voyages Executed Under Our Management" },
            ]);
          }
        }
      } catch (error) {
        console.error("Error loading fleet statistics:", error);
      }
    };
    loadFleetStats();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-4">
            Comprehensive Maritime Services for Businesses Large, Medium and Small
          </h2>
          <p className="text-muted-foreground mb-6">
            Expert maritime services tailored to businesses of all sizes, ensuring smooth, efficient, and cost-effective vessel operations.
          </p>

          <div className="flex gap-3 flex-wrap mb-6">
            <Button variant="coral" size="default">Get a Free Quote</Button>
          </div>

          {/* KPI cards for clarity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {stats.map((s, i) => (
              <div key={s.label} className="p-4 rounded-lg border border-border bg-card">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison chart removed per request - KPI cards remain */}

          <div className="mt-4 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">Dedicated Support Team</h3>
            <p className="text-sm text-muted-foreground">
              Our dedicated support team is always available to assist with your maritime needs, ensuring smooth and efficient operations. Count on us for reliable guidance and expert solutions at every step.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <img src={tankImg} alt="Ship at sea" className="rounded-2xl w-full h-64 object-cover shadow-lg" />
          <div className="grid grid-cols-2 gap-4">
            <img src={containerImg} alt="Ship 2" className="rounded-xl h-36 w-full object-cover" />
            <img src={bulkImg} alt="Ship 3" className="rounded-xl h-36 w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;
