import type { Property } from "../types";
import { PropertyCard } from "./PropertyCard";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton";
import { PropertyEmptyState } from "./PropertyEmptyState";
import { PropertyErrorState } from "./PropertyErrorState";

export interface PropertyGridProps {
  properties: Property[];
  isLoading: boolean;
  isError: boolean;
  onResetFilters: () => void;
  onRetry: () => void;
}

export const PropertyGrid = ({
  properties,
  isLoading,
  isError,
  onResetFilters,
  onRetry,
}: PropertyGridProps) => {
  if (isError) {
    return <PropertyErrorState onRetry={onRetry} />;
  }

  if (isLoading) {
    return (
      <div className="row g-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <PropertyCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return <PropertyEmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="row g-4">
      {properties.map((property) => (
        <div key={property.id} className="col-12 col-md-6 col-lg-4">
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};
