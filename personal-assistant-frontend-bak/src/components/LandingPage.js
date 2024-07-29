import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import Universe from './Universe';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Universe />
      <nav>
        <Link to="/landing-contact" className="contact-link">Contact</Link>
      </nav>
      <div className="content-box">
        <h1>Welcome to <span className="highlight">lyfeAI🍃</span></h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
          nunc id aliquam tincidunt, nisl nunc tincidunt nunc, vitae aliquam nunc
          nunc vitae nunc. Sed euismod, nunc id aliquam tincidunt, nisl nunc
          tincidunt nunc.
        </p>
        <Link to="/home" className="try-now-button">Try Now</Link>
        <Link to="/landing-contact" className="contact-button contact-link">Contact Me</Link>
        <div className="social-icons">
          <a href="https://github.com/lyfe691" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/yanis-sebastian-z%C3%BCrcher-740a36233/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://yanissebastianzuercher.ch/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGlobe} />
          </a>
        </div>
      </div>
      <footer className="copyright">
        © 2024 Yanis Sebastian Zürcher. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;