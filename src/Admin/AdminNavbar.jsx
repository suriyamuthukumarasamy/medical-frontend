import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/loginIn");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/admin">Admin Panel</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
        aria-controls="adminNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="adminNavbar">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">User List</Link>
          </li>
          <li className="nav-item">
            <Link to="/order" className="nav-link">View Orders</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger btn-sm ms-lg-2" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
