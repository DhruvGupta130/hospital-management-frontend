import "../Styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">AyuMed</h2>
            <p className="footer-tagline">
              Empowering your healthcare journey with precision and care.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h3>Support</h3>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h3>Contact</h3>
              <ul>
                <li><a href="mailto:support@ayumed.com">support@ayumed.com</a></li>
                <li><a href="tel:+02254545252">+022 5454 5252</a></li>
                <li><a href="https://www.ayumed.com">www.ayumed.com</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-social">
          <ul className="social-icons">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© 2024 AyuMed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
