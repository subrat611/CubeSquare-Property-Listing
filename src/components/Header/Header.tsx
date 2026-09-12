import "./Header.scss";

export const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <a
          className="nav-brand d-inline-flex align-items-center gap-2 fs-4 fw-semibold"
          href="/"
        >
          <span className="brand-word">
            Cube<em>Square</em>.Global
          </span>
        </a>
      </div>
    </header>
  );
};
