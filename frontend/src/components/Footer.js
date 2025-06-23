import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          {/* Brand & Description */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">
              Fit-Track
            </h5>
            <p>
              Your all-in-one fitness companion – track your workouts, diet, water intake, and reach your health goals smarter.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Quick Links</h5>
            <p><Link to="/home" className="text-light text-decoration-none">Home</Link></p>
            <p><Link to="/about" className="text-light text-decoration-none">About</Link></p>
            <p><Link to="/contact" className="text-light text-decoration-none">Contact</Link></p>
            <p><Link to="/diets" className="text-light text-decoration-none">Diet</Link></p>
            <p><Link to="/workout" className="text-light text-decoration-none">Workout</Link></p>
          </div>

          {/* Useful Links */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Tools</h5>
            <p><Link to="/workout" className="text-light text-decoration-none">Workout</Link></p>
            <p><Link to="/water" className="text-light text-decoration-none">Water Tracker</Link></p>
            <p><Link to="/login" className="text-light text-decoration-none">Login</Link></p>
            <p><Link to="/signup" className="text-light text-decoration-none">Sign Up</Link></p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Contact</h5>
            <p><i className="fas fa-home me-3"></i> Mysore, India</p>
            <p><i className="fas fa-envelope me-3"></i> support@fittrack.com</p>
            <p><i className="fas fa-phone me-3"></i> +91 98765 43210</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Copyright */}
        <div className="row text-center">
          <div className="col">
            <p className="mb-0">&copy; {new Date().getFullYear()} <strong>FitTrack</strong>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
