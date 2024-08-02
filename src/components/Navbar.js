
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/todos" className="navbar-logo">MyApp</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/todos" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/todos" className="navbar-link">To-Do List</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="navbar-link">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
