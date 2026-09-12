import type { Property } from "../types";
import { PropertyCard } from "./PropertyCard";

export interface PropertyGridProps {
  properties: Property[];
  isLoading: boolean;
  isError: boolean;
}

export const PropertyGrid = ({
  properties,
  isLoading,
  isError,
}: PropertyGridProps) => {
  if (isError) {
    return (
      <div className="alert alert-danger p-4 text-center" role="alert">
        <h4 className="alert-heading h5 mb-2">Unable to load properties</h4>
        <p className="mb-0 text-muted">
          We encountered an issue connecting to our servers. Please try again
          later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading properties...</span>
        </div>
        <p className="mt-3 text-muted">Fetching latest property data...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="py-5 text-center bg-light rounded border border-light">
        <h4 className="h5 text-muted mb-2">No properties found</h4>
        <p className="mb-0 text-muted">
          Try adjusting your yield or location filters to see more results.
        </p>
      </div>
    );
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
