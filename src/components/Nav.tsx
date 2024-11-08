import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Nav: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/saved-candidates" className="nav-link">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
