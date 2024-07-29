import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Universe from './Universe';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const LandingContact = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const submitButton = document.getElementById('submitButton');
      submitButton.classList.add('loading');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          form.reset();
          const popup = document.getElementById('thankYouPopup');
          popup.classList.remove('hide');
          popup.classList.add('show');
          setTimeout(() => {
            popup.classList.remove('show');
            popup.classList.add('hide');
            setTimeout(() => {
              popup.classList.remove('hide');
              popup.style.display = 'none';
            }, 500); // Wait for the fade-out transition to complete
          }, 2500); // Show for 2.5 seconds before starting fade out
        } else {
          alert('There was a problem submitting the form');
        }
      }).catch(error => {
        alert('There was a problem submitting the form');
      }).finally(() => {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
    };

    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener('submit', handleFormSubmit);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener('submit', handleFormSubmit);
      }
    };
  }, []);

  return (
    <div className="landing-page">
      <Universe />
      <nav>
        <Link to="/" className="contact-link home-link">Home</Link>
      </nav>
      <div className="content-box">
        <h1>Contact ME</h1>
        <form ref={formRef} className="contact-form" action="https://formspree.io/f/mldrjlyq" method="POST" id="contactForm">
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required></textarea>
          <button type="submit" id="submitButton">Send Message</button>
        </form>
        <p className="small-text">I'll get back to you as soon as possible!</p>
        <Link to="/" className="back-link">Back to Home</Link>
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
      <style>
        {`
          /* Style for the popup */
          .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 500px;
            padding: 30px;
            background: #fff;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            border-radius: 10px;
            z-index: 1000;
            text-align: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
          }

          .popup.show {
            display: block;
            opacity: 1;
            visibility: visible;
          }

          .popup.hide {
            display: block;
            opacity: 0;
            visibility: hidden;
          }

          .popup h2 {
            margin-top: 0;
            color: #333;
          }

          .popup p {
            margin: 15px 0;
            color: #666;
          }

          /* Style for loading button */
          .loading {
            background-color: #ddd;
            cursor: not-allowed;
          }
        `}
      </style>
      <div id="thankYouPopup" className="popup hide">
        <h2>Thank You!</h2>
        <p>Your message has been sent successfully.</p>
      </div>
    </div>
  );
};

export default LandingContact;
