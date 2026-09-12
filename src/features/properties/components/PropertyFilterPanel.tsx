import type { PropertiesFilter } from "../types";

export interface PropertyFilterPanelProps {
  filters: PropertiesFilter;
  onFilterChange: (newFilters: PropertiesFilter) => void;
}

export const PropertyFilterPanel = ({
  filters,
  onFilterChange,
}: PropertyFilterPanelProps) => {
  return <div></div>;
};
