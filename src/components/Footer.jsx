import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-bg text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">

          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-light mb-3">💊 MediKart</h4>
            <p>Your one-stop trusted partner for genuine medicines and healthcare products, delivered at your doorstep.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-light border-bottom pb-2 mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/home" className="footer-link">🏠 Home</Link></li>
              <li><Link to="/medicines" className="footer-link">💊 Medicine List</Link></li>
              <li><Link to="/categories" className="footer-link">📦 Categories</Link></li>
              <li><Link to="/cart" className="footer-link">🛒 Cart</Link></li>
            </ul>
          </div>

          {/* Contact and Social */}
          <div className="col-md-4 mb-4">
            <h5 className="text-light border-bottom pb-2 mb-3">Contact & Social</h5>
            <p><FaEnvelope className="me-2" /> support@medikart.com</p>
            <p><FaPhone className="me-2" /> +91-9000-00000</p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" className="social-icon" ><FaFacebookF /></a>
              <a href="https://twitter.com" className="social-icon" ><FaTwitter /></a>
              <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <hr className="bg-white" />
        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} <strong>MediKart</strong>. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
