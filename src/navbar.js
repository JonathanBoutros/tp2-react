import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './css/navbar.css';

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger">
      <Link to={"/"} className="navbar-brand">RoastedCup</Link>       
      <button
        className={`navbar-toggler ${menuOpen ? '' : 'collapsed'}`}
        type="button"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav mr-2">
            <li className="nav-item" style={{ alignSelf: 'flex-end' }}>
                <Link to={"/cafe"} className="nav-link">Café</Link>
            </li>
            <li className="nav-item" style={{ alignSelf: 'flex-end' }}>
                <Link to={"/cart"} className="nav-link">Cart</Link>
            </li>
            <li className="nav-item" style={{ alignSelf: 'flex-end' }}>
                <Link to={"/wishlist"} className="nav-link">Wishlist</Link>
            </li>
            <li className="nav-item" style={{ alignSelf: 'flex-end' }}>
                <Link to={"/historique"} className="nav-link">Historique</Link>
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
