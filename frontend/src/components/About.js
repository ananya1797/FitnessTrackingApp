import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const About = () => {
  return (
    <>
      <Navbar />
      <div className="container py-5" style={{ paddingTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 text-center">
            <h1 className="mb-4 fw-bold">🌟 About FitTrack</h1>
            <p className="lead text-muted mb-4">
              FitTrack is your personalized fitness companion – helping you stay on track with your <strong>diet, workouts, water intake, and health goals</strong>.
            </p>
            <p className="text-muted">
              Our application is built to make your fitness journey smoother and more enjoyable by giving you all your health data in one place. Whether you're trying to lose weight, gain muscle, or simply stay healthy — we've got you covered.
            </p>

            <div className="my-4">
              <Link to="/contact" className="btn btn-outline-primary btn-lg">
                Contact Us <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>

            <hr className="my-5" />

            <blockquote className="blockquote fst-italic text-secondary">
              “Take care of your body. It's the only place you have to live.” – Jim Rohn
            </blockquote>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
