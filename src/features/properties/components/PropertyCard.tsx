import { formatCurrency } from "../../../utils/currency";
import type { Property } from "../types";

// A dummy array of beautiful real estate images
// You can replace these URLs with any images you like!
const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
];

export interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const percentAvailable =
    (property.availableTokens / property.totalSupply) * 100;
  const isSoldOut = property.availableTokens === 0;
  const isLowStock = percentAvailable > 0 && percentAvailable < 20;

  // Pick an image pseudo-randomly based on the property ID so it stays consistent
  const imageUrl =
    DUMMY_IMAGES[(parseInt(property.id) || 0) % DUMMY_IMAGES.length];

  return (
    <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden p-2">
      <div
        className="bg-dark position-relative rounded-4"
        style={{
          height: "220px",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isLowStock && (
          <span
            className="badge bg-warning text-dark rounded-pill position-absolute top-0 end-0 m-3 px-3 py-2 shadow-sm text-uppercase fw-bold"
            style={{ letterSpacing: "0.5px", fontSize: "0.65rem" }}
          >
            Low Supply • {percentAvailable.toFixed(0)}% Left
          </span>
        )}
        {isSoldOut && (
          <span
            className="badge bg-danger text-white rounded-pill position-absolute top-0 end-0 m-3 px-3 py-2 shadow-sm text-uppercase fw-bold"
            style={{ letterSpacing: "0.5px", fontSize: "0.65rem" }}
          >
            Sold Out
          </span>
        )}
      </div>

      <div className="card-body px-2 pt-4 pb-2 d-flex flex-column">
        <h2 className="h5 mb-1">{property.name}</h2>

        <div className="text-muted small mb-4 d-flex align-items-center gap-1">
          <i className="bi bi-geo-alt text-primary"></i>
          <span className="text-truncate">{property.location}</span>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-6">
            <div
              className="text-uppercase text-muted fw-semibold mb-1"
              style={{ fontSize: "0.65rem", letterSpacing: "1px" }}
            >
              Price / Token
            </div>
            <div className="fw-bold">
              {formatCurrency(property.pricePerToken)}
            </div>
          </div>

          <div className="col-6">
            <div
              className="text-uppercase text-muted fw-semibold mb-1"
              style={{ fontSize: "0.65rem", letterSpacing: "1px" }}
            >
              Projected Yield
            </div>
            <div className="fw-bold text-success">
              {property.yieldPercent}% p.a.
            </div>
          </div>

          <div className="col-6">
            <div
              className="text-uppercase text-muted fw-semibold mb-1"
              style={{ fontSize: "0.65rem", letterSpacing: "1px" }}
            >
              Total Supply
            </div>
            <div className="fw-bold">
              {property.totalSupply.toLocaleString()} tokens
            </div>
          </div>

          <div className="col-6">
            <div
              className="text-uppercase text-muted fw-semibold mb-1"
              style={{ fontSize: "0.65rem", letterSpacing: "1px" }}
            >
              Available
            </div>
            <div
              className={`fw-bold ${isLowStock ? "text-warning" : "text-primary"}`}
            >
              {property.availableTokens.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="progress rounded-pill mb-2" style={{ height: "4px" }}>
            <div
              className={`progress-bar ${isLowStock ? "bg-warning" : "bg-primary"}`}
              role="progressbar"
              style={{ width: `${percentAvailable}%` }}
              aria-valuenow={percentAvailable}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
            {isSoldOut
              ? "0% of token supply remaining"
              : `Only ${percentAvailable.toFixed(0)}% of token supply remaining`}
          </div>
        </div>

        <button
          className="btn btn-warning w-100 mt-auto rounded-pill py-2 fw-bold text-dark d-flex justify-content-center align-items-center gap-2"
          disabled={isSoldOut}
        >
          {isSoldOut ? "Join Waitlist" : "View Property"}
          {!isSoldOut && <i className="bi bi-arrow-right"></i>}
        </button>
      </div>
    </article>
  );
};
