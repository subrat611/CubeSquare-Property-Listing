import { useMemo } from "react";
import type { PropertiesFilter } from "../types";
import { mockProperties } from "../../../api/mockData";

export interface PropertyFilterPanelProps {
  filters: PropertiesFilter;
  onFilterChange: (filters: PropertiesFilter) => void;
}

export const PropertyFilterPanel = ({
  filters,
  onFilterChange,
}: PropertyFilterPanelProps) => {
  // Dynamically extract unique locations from our data
  const uniqueLocations = useMemo(() => {
    const locations = mockProperties.map((p) => p.location);
    return Array.from(new Set(locations)).sort();
  }, []);

  return (
    <div className="d-flex flex-column flex-sm-row gap-3">
      <div>
        <select
          className="form-select"
          value={filters.location}
          onChange={(e) =>
            onFilterChange({ ...filters, location: e.target.value })
          }
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="number"
          className="form-control"
          placeholder="Min Yield e.g 7.5 (%)"
          min="0"
          step="0.1"
          value={filters.minYield}
          onChange={(e) => {
            const val = e.target.value;
            onFilterChange({
              ...filters,
              minYield: val === "" ? "" : Number(val),
            });
          }}
        />
      </div>
    </div>
  );
};
