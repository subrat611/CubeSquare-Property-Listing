export interface PropertyErrorStateProps {
  onRetry: () => void;
}

export const PropertyErrorState = ({ onRetry }: PropertyErrorStateProps) => {
  return (
    <div
      className="card border-0 p-5 text-center d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "400px" }}
    >
      <div className="mb-4 text-danger" style={{ fontSize: "3rem" }}>
        <i className="bi bi-exclamation-triangle"></i>
      </div>

      <h3 className="h4 mb-3">Unable to load registry</h3>

      <p className="text-muted mb-4" style={{ maxWidth: "500px" }}>
        We encountered a simulated network disruption while fetching the
        property data. Please verify your connection and try again.
      </p>

      <button
        onClick={onRetry}
        className="btn btn-outline-danger rounded-pill px-4 py-2 fw-semibold"
      >
        <i className="bi bi-arrow-clockwise me-2"></i>
        Retry Connection
      </button>
    </div>
  );
};
