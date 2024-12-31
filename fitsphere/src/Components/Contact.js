import React from 'react';
import '../styles/Contact.css';
import Navbar from './Navbar';

function Contact() {
  return (
    <div>
      <Navbar/>
<div className="contact-container">
      <div className="contact-header">
        <h1>Reach Out To Us</h1>
        <p>We're here to help you achieve your fitness goals!</p>
      </div>

      <div className="contact-info">
        <h2>Connect with Us</h2>
        <p>If you have any questions, need personalized fitness advice, or just want to say hi, we’re just a message away. Feel free to get in touch with us via the contact form below or reach out to us on our social media platforms.</p>
        
        <div className="social-links">
          <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      <div className="contact-form">
        <h3>Send Us A Message</h3>
        <form action="#" method="POST">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn-submit">Send Message</button>
        </form>
      </div>

      <div className="motivation">
        <p>Remember, every step you take towards your fitness goals is a step towards a healthier, stronger, and more confident version of yourself. We're here to support you every step of the way!</p>
        <p>Stay consistent, stay positive, and never give up!</p>
        <p>Let's make those goals a reality—together!</p>
      </div>
    </div>
    </div>
    
  );
}

export default Contact;
