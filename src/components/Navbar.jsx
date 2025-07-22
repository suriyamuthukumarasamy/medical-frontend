import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { SearchContext } from '../Contexts/SearchContext';
import { useCart } from '../Contexts/MedicineContext';
import photo from "../assets/photo/photo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const { bar, setBar, category, setCategory } = useContext(SearchContext);
  const { cartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/medicines');
  };

  const Category = [
    'All', 'Pain Relief', 'Palm', 'Diapers', 'Antibiotic', 'Allergy', 'Diabetes',
    'Heart', 'Digestive', 'General', 'kits', 'Napkins', 'Baby Care', 'Other'
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-2">
      <Link className="navbar-brand d-flex align-items-center" to="/home">
        <img src={photo} alt="Logo" width="60" height="40" className="me-2" />
        <span className="fw-bold text-white">MediKart</span>
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link text-white" to="/home">Home</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/medicines">Medicine List</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/category">Category</Link></li>
        </ul>

        <form className="d-flex ms-auto me-3" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search medicine..."
            value={bar}
            onChange={(e) => setBar(e.target.value)}
          />
          <select
            className="form-select me-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Category.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          
        </form>

        <div className="d-flex align-items-center">
          <Link to="/cart" className="text-white position-relative me-3">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
            {cartCount() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                {cartCount()}
              </span>
            )}
          </Link>
          <Link to="/loginIn">
          <button className="btn btn-danger btn-sm pt-3" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className="me-1" />
            Logout
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
