/**
 * Migration utility to move data from localStorage to server
 * Run this once to migrate all stored data
 */

import { apiEndpoints } from "@/config/api";

export const migrateLocalStorageToServer = async (token: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Collect all data from localStorage
    const fleetStats = localStorage.getItem("bmsa_fleet_stats");
    const policies = localStorage.getItem("bmsa_policies");
    const copyrightYear = localStorage.getItem("bmsa_copyright_year");
    const teamMembers = localStorage.getItem("bmsa_team_members");

    const dataToMigrate: Record<string, unknown> = {};
    
    if (fleetStats) {
      try {
        dataToMigrate.fleetStats = JSON.parse(fleetStats);
      } catch (e) {
        console.error("Error parsing fleet stats:", e);
      }
    }

    if (policies) {
      try {
        dataToMigrate.policies = JSON.parse(policies);
      } catch (e) {
        console.error("Error parsing policies:", e);
      }
    }

    if (copyrightYear) {
      dataToMigrate.copyrightYear = Number(copyrightYear);
    }

    if (teamMembers) {
      try {
        dataToMigrate.teamMembers = JSON.parse(teamMembers);
      } catch (e) {
        console.error("Error parsing team members:", e);
      }
    }

    // If there's nothing to migrate, return success
    if (Object.keys(dataToMigrate).length === 0) {
      console.log("No data to migrate from localStorage");
      return { success: true, message: "No data to migrate" };
    }

    // Send to server
    const response = await fetch(apiEndpoints.settings(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToMigrate),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to save to server");
    }

    // Clear localStorage after successful migration
    localStorage.removeItem("bmsa_fleet_stats");
    localStorage.removeItem("bmsa_policies");
    localStorage.removeItem("bmsa_copyright_year");
    localStorage.removeItem("bmsa_team_members");

    console.log("Successfully migrated data to server");
    return { 
      success: true, 
      message: `Successfully migrated ${Object.keys(dataToMigrate).length} settings to server` 
    };
  } catch (error) {
    console.error("Migration error:", error);
    return { 
      success: false, 
      message: `Migration failed: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
};
