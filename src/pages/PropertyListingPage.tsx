import { useMemo, useState } from "react";
import {
  useGetProperties,
  type PropertiesFilter,
} from "../features/properties";
import { KYCStatusBanner } from "../components/KYCStatusBanner/KYCStatusBanner";
import { PropertyFilterPanel } from "../features/properties/components/PropertyFilterPanel";
import { PropertyGrid } from "../features/properties/components/PropertyGrid";

export const PropertyListingPage = () => {
  const [filters, setFilters] = useState<PropertiesFilter>({
    minYield: "",
    location: "",
  });

  const { data: properties = [], isLoading, isError } = useGetProperties();

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesLocation = filters.location
        ? property.location === filters.location
        : true;

      const matchesYield = filters.minYield
        ? property.yieldPercent >= Number(filters.minYield)
        : true;

      return matchesLocation && matchesYield;
    });
  }, [properties, filters]);

  return (
    <div className="page-wrapper">
      <KYCStatusBanner status="pending" />

      <div className="container py-4">
        <header className="mb-4">
          <h1 className="h2 mb-1">Property Offerings</h1>
          <p className="text-muted">
            Browse and invest in premium real estate.
          </p>
        </header>

        {/* Filter Section */}
        <div className="mb-4">
          <PropertyFilterPanel filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Grid Section */}
        <PropertyGrid
          properties={filteredProperties}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};
