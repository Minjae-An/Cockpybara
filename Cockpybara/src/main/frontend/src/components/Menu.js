import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Page1 from './Page1';
import Recipe from '../Recipe';
import Page3 from './Page3';
import Join from '../Join';
import Login from '../Login' 
import './Menu.css'

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu-container">
      <div className={`collapse${isMenuOpen ? ' show' : ''}`} id="navbarToggleExternalContent">
        {isMenuOpen && (
          <div className="bg-dark p-4">
            <ul className="menu-list">
              <li className='about'><Link to="/page1">About</Link></li>
              <li className='recipe'><Link to="/recipe">Recipe</Link></li>
              <li className='community'><Link to="/page3">Community</Link></li>
              <li className='login'><Link to="/login">Login</Link></li>
              <li className='join'><Link to="/join">Join</Link></li>
            </ul>
          </div>
        )}
      </div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleMenuToggle}
            aria-controls="navbarToggleExternalContent"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/page1" element={<Page1 />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </div>
  );
};

export default Menu;
