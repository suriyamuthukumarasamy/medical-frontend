import { Link } from 'react-router-dom';
import './Home.css';
import tablet from "../assets/photo/tablet.jpg";
import cough from "../assets/photo/cough.jpg";
import spary from "../assets/photo/spary.jpg";

const Home = () => {
  return (
    <div className="container" id="back">
      {/* Hero Section */}
      <div className="hero-section text-center mb-5">
        <h1>Welcome to MediKart</h1>
        <p>Your trusted online medical store for affordable healthcare products.</p>
        <Link to="/medicines" className="btn btn-light btn-lg mt-3 shadow-sm">
          🛒 Shop Medicines
        </Link>
      </div>

      {/* Features Section */}
      <div className="container">
        <div className="row text-center mb-5">
          <div className="col-md-4">
            <div className="feature-icon mb-2">🚚</div>
            <h5>Fast Delivery</h5>
            <p>Get your medicines at your doorstep in no time.</p>
          </div>
          <div className="col-md-4">
            <div className="feature-icon mb-2">✅</div>
            <h5>100% Genuine</h5>
            <p>All products are verified and approved by pharmacists.</p>
          </div>
          <div className="col-md-4">
            <div className="feature-icon mb-2">💰</div>
            <h5>Affordable Prices</h5>
            <p>Best price guarantee on all medicines and health products.</p>
          </div>
        </div>

        {/* Featured Products */}
        <h3 className="text-center">Featured Products</h3>
        <div className="row pt-4">
          {[{ img: tablet, title: 'Paracetamol', text: 'For fever and mild pain relief.' },
            { img: cough, title: 'Cough Syrup', text: 'Soothes dry and wet cough.' },
            { img: spary, title: 'Pain Relief Spray', text: 'Instant relief from joint and muscle pain.' }].map((product, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img src={product.img} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.text}</p>
                  <Link to="/medicines" className="btn btn-outline-primary mt-auto">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
