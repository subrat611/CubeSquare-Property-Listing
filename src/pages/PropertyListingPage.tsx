import { useMemo, useState } from "react";
import {
  useGetProperties,
  type PropertiesFilter,
} from "../features/properties";
import { KYCStatusBanner } from "../components/KYCStatusBanner/KYCStatusBanner";
import { PropertyFilterPanel } from "../features/properties/components/PropertyFilterPanel";
import { PropertyGrid } from "../features/properties/components/PropertyGrid";
import { Header } from "../components/Header/Header";

export const PropertyListingPage = () => {
  const [filters, setFilters] = useState<PropertiesFilter>({
    minYield: "",
    location: "",
  });

  const {
    data: properties = [],
    isLoading,
    isError,
    refetch,
  } = useGetProperties();

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesLocation = filters.location
        ? property.location === filters.location
        : true;

      const matchesYield =
        filters.minYield !== ""
          ? property.yieldPercent >= filters.minYield
          : true;

      return matchesLocation && matchesYield;
    });
  }, [properties, filters]);

  const handleResetFilters = () => {
    setFilters({ minYield: "", location: "" });
  };

  return (
    <div className="page-wrapper">
      <Header />
      <KYCStatusBanner status="pending" />

      <div className="container py-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end mb-4 gap-3">
          <div>
            <h2 className="h3 mb-1">Property Offerings</h2>
            <p className="text-muted mb-0">
              Browse and invest in premium real estate.
            </p>
          </div>
          <div>
            <PropertyFilterPanel
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        </div>

        <PropertyGrid
          properties={filteredProperties}
          isLoading={isLoading}
          isError={isError}
          onResetFilters={handleResetFilters}
          onRetry={refetch}
        />
      </div>
    </div>
  );
};
