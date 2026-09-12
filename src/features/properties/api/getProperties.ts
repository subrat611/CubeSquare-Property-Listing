import { useQuery } from "@tanstack/react-query";
import type { Property } from "../types";
import { mockProperties } from "../../../api/mockData";

// Simulated delay for loading state requirements
const SIMULATED_LATENCY = 800;

// Fetcher Function
export const getProperties = async (): Promise<Property[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a 25% chance of API failure to demonstrate the Error State & Retry mechanism
      if (Math.random() < 0.25) {
        reject(new Error("Simulated Network Error"));
      } else {
        resolve(mockProperties);
      }
    }, SIMULATED_LATENCY);
  });
};

// Query Keys
export const propertiesQueryKeys = {
  all: ["properties"] as const,
};

// The Tanstack Query hook
export const useGetProperties = () => {
  return useQuery({
    queryKey: propertiesQueryKeys.all,
    queryFn: getProperties,
    retry: false, // Disable automatic retries so our custom error UI shows immediately
    refetchOnWindowFocus: false,
  });
};
