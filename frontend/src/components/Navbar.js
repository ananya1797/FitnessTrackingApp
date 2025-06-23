import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  // Manually close offcanvas (needed for React Router <Link>)
  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("settingsOffcanvas");
    const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Fitness-Track
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {[
                { label: "Home", path: "/home" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Diets", path: "/diets" },
                { label: "Workouts", path: "/workout" },
                { label: "Water", path: "/water" },
              ].map(({ label, path }) => (
                <li className="nav-item" key={path}>
                  <Link
                    className={`nav-link ${
                      location.pathname === path ? "active" : ""
                    }`}
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              className="btn btn-outline-light"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#settingsOffcanvas"
              aria-controls="settingsOffcanvas"
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Offcanvas Settings Panel */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="settingsOffcanvas"
        aria-labelledby="settingsOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="settingsOffcanvasLabel">
            Settings
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body">
          <div className="d-grid gap-2">
            <Link to="/diets" className="btn btn-light" onClick={closeOffcanvas}>
              Follow Diet
            </Link>
            <Link to="/water" className="btn btn-light" onClick={closeOffcanvas}>
              Water Intake
            </Link>
            <Link to="/workout" className="btn btn-light" onClick={closeOffcanvas}>
              Workout Plan
            </Link>
            <button
              className="btn btn-light"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
                alert("You have been logged out successfully.");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
