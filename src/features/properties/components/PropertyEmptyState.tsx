export interface PropertyEmptyStateProps {
  onReset: () => void;
}

export const PropertyEmptyState = ({ onReset }: PropertyEmptyStateProps) => {
  return (
    <div
      className="card border-0 text-center d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "400px" }}
    >
      <div className="mb-4 text-warning" style={{ fontSize: "3rem" }}>
        <i className="bi bi-house"></i>
      </div>

      <h3 className="h4 mb-3">No properties match your filter</h3>

      <p className="text-muted mb-4" style={{ maxWidth: "500px" }}>
        No assets in the registry satisfy the current yield and emirate
        criteria. Broaden the filters to see the full registry.
      </p>

      <button
        onClick={onReset}
        className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold"
      >
        Reset filters
      </button>
    </div>
  );
};
