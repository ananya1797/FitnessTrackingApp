import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('http://localhost:5000/api/contact', formData, {
      headers: {
        'auth-token': localStorage.getItem('token') // ✅ Make sure token is stored after login
      }
    });
    alert(res.data.message);
    setFormData({ name: '', message: '' });
  } catch (err) {
    alert(err.response?.data?.error || 'Something went wrong');
    console.error(err);
  }
};


  return (
    <>
    <Navbar/>
    <div className="container my-5 p-4 border rounded bg-light shadow-sm">
      <h1 className="mb-3 text-center">Contact Us</h1>
      <p className="text-center mb-4">If you have any questions, feel free to reach out!</p>

     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input 
      type="text"
      className="form-control"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Your full name"
      required
    />
  </div>

  <div className="mb-3">
    <label htmlFor="message" className="form-label">Message</label>
    <textarea 
      className="form-control"
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      rows="4"
      placeholder="Type your message here"
      required
    ></textarea>
  </div>

  <div className="text-center">
    <button type="submit" className="btn btn-primary px-4">Send</button>
  </div>
</form>

    </div>
    <Footer />
    </>
  );
};

export default Contact;
