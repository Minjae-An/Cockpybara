import React, { useState } from 'react';

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
              <li><a href="/page1">Page 1</a></li>
              <li><a href="/page2">Page 2</a></li>
              <li><a href="/page3">Page 3</a></li>
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
