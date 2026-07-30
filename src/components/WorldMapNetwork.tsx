"use client";
import WorldMap from "@/components/ui/world-map";

export function WorldMapNetwork() {
  return (
    <div className="w-full min-h-72 h-full relative bg-transparent flex items-end justify-center pt-20">
      <WorldMap
        connections={[
          // --- Main Global Loop ---
          {
            start: { lat: 40.7128, lng: -74.006 }, // New York
            end: { lat: 51.5074, lng: -0.1278 }, // London
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 25.2048, lng: 55.2708 }, // Dubai
          },
          {
            start: { lat: 25.2048, lng: 55.2708 }, // Dubai
            end: { lat: 23.8103, lng: 90.4125 }, // Dhaka
          },
          {
            start: { lat: 23.8103, lng: 90.4125 }, // Dhaka
            end: { lat: 1.3521, lng: 103.8198 }, // Singapore
          },
          {
            start: { lat: 1.3521, lng: 103.8198 }, // Singapore
            end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
          },
          {
            start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney
          },
          {
            start: { lat: -33.8688, lng: 151.2093 }, // Sydney
            end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
          },
          {
            start: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
            end: { lat: 40.7128, lng: -74.006 }, // New York
          },

          // --- Extra Branches ---
          {
            start: { lat: 40.7128, lng: -74.006 }, // New York
            end: { lat: -23.5505, lng: -46.6333 }, // Sao Paulo
          },
          {
            start: { lat: -23.5505, lng: -46.6333 }, // Sao Paulo
            end: { lat: -33.9249, lng: 18.4241 }, // Cape Town
          },
          {
            start: { lat: 23.8103, lng: 90.4125 }, // Dhaka
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 25.2048, lng: 55.2708 }, // Dubai
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
          {
            start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
            end: { lat: 64.2008, lng: -149.4937 }, // Alaska
          },
        ]}
      />
    </div>
  );
}
