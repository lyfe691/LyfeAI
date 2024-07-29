import React from 'react';
import { Link } from 'react-router-dom';
import Universe from './Universe';
import './LandingPage.css';

const LandingContact = () => {
  return (
    <div className="landing-page">
      <Universe />
      <nav>
        <Link to="/" className="contact-link home-link">Home</Link>
      </nav>
      <div className="content-box">
        <h1>Contact ME</h1>
        <form className="contact-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
        <p className="small-text">I'll get back to you as soon as possible!</p>
        <Link to="/" className="back-link">Back to Home</Link>
        <div className="social-icons">
          <a href="https://github.com/lyfe691" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/yanis-sebastian-z%C3%BCrcher-740a36233/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://yanissebastianzuercher.ch/" target="_blank" rel="noopener noreferrer">Website</a>
        </div>
      </div>
      <footer className="copyright">
        © 2024 Yanis Sebastian Zürcher. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingContact;