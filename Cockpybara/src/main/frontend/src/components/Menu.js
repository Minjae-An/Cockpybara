import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Page1 from './Page1';

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu-container">
      <div className={`collapse${isMenuOpen ? ' show' : ''}`} id="navbarToggleExternalContent">
        {isMenuOpen && (
          <div className="bg-dark p-4">
            <h5 className="text-white h4">Collapsed content</h5>
            <span className="text-muted">Toggleable via the navbar brand.</span>
            <ul className="menu-list">
              <li><Link to="/Page1">Page 1_검색</Link></li>
              <li><Link to="/Page2">Page 2_자세히보기</Link></li>
              <li><Link to="/Page3">Page 3_메뉴</Link></li>
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
    </div>
  );
};

export default Menu;
