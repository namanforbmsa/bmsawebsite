/**
 * useCopyrightYear Hook
 * 
 * Retrieves the copyright year from the server.
 * Falls back to current year if not available.
 */

import { useEffect, useState } from "react";
import { apiEndpoints } from "@/config/api";

export const useCopyrightYear = (): number => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const fetchCopyrightYear = async () => {
      try {
        const response = await fetch(apiEndpoints.settings());
        if (response.ok) {
          const data = await response.json();
          setYear(data.copyrightYear || new Date().getFullYear());
        }
      } catch (error) {
        console.error("Error fetching copyright year:", error);
        setYear(new Date().getFullYear());
      }
    };

    fetchCopyrightYear();
  }, []);

  return year;
};
