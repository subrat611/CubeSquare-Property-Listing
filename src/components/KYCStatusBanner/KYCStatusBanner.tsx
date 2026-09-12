import { useState } from "react";
import type { KYCStatus } from "../../types";

export interface KYCStatusBannerProps {
  status: KYCStatus;
}

export const KYCStatusBanner = ({ status }: KYCStatusBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (status === "approved" || !isVisible) {
    return null;
  }

  const isPending = status === "pending";

  const alertClass = isPending
    ? "alert-warning text-dark"
    : "alert-danger text-white";
  const iconClass = isPending ? "bi-clock-history" : "bi-exclamation-circle";

  const message = isPending
    ? "Your identity verification is in progress. You can browse but cannot invest yet."
    : "Your identity verification was unsuccessful. Please contact support.";

  return (
    <div className="container mt-3 mb-2">
      <div
        className={`alert ${alertClass} d-flex align-items-center justify-content-between rounded-4 border-1`}
        role="alert"
      >
        <div className="d-flex align-items-center">
          <i className={`bi ${iconClass} fs-4 me-3`}></i>
          <span className="fw-medium">{message}</span>
        </div>

        <button
          type="button"
          className={`btn-close ${!isPending ? "btn-close-white" : ""} position-static p-2 ms-3`}
          aria-label="Close"
          onClick={() => setIsVisible(false)}
        ></button>
      </div>
    </div>
  );
};
