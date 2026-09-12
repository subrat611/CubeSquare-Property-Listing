export const PropertyCardSkeleton = () => {
  return (
    <article
      className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
      aria-hidden="true"
    >
      <div className="placeholder-glow">
        <div
          className="placeholder w-100 bg-secondary"
          style={{ height: "220px", opacity: 0.2 }}
        ></div>
      </div>

      <div className="card-body p-4 d-flex flex-column placeholder-glow">
        <div className="mb-1">
          <span className="placeholder col-9 rounded"></span>
        </div>

        <div className="mb-4">
          <span className="placeholder col-5 rounded"></span>
        </div>

        <div className="mb-4">
          <span className="placeholder col-10 rounded mb-2 d-inline-block"></span>
          <span className="placeholder col-7 rounded mb-2 d-inline-block"></span>
          <span className="placeholder col-8 rounded d-inline-block"></span>
        </div>

        <div className="mb-4">
          <div
            className="placeholder w-100 rounded-pill mb-2"
            style={{ height: "4px" }}
          ></div>
          <span className="placeholder col-6 rounded"></span>
        </div>

        <span className="placeholder w-100 mt-auto rounded-pill py-3"></span>
      </div>
    </article>
  );
};
