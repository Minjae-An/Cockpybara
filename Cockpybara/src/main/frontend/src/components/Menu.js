import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './Menu.css'
import menuIcon from '../photo/MenuBar.png'; 

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu-container">
      <div className={`collapse${isMenuOpen ? ' show' : ''}`} id="navbarToggleExternalContent">
        {isMenuOpen && (
            <ul className="menu-list">
              <li className='about'><Link to="/about">About</Link></li>
              <li className='recipe'><Link to="/recipe">Recipe</Link></li>
              <li className='community'><Link to="/community/{userId}">Community</Link></li>
              <li className='login'><Link to="/login">Login</Link></li>
              <li className='join'><Link to="/join">Join</Link></li>
            </ul>
        )}
      </div>


      <div className="container-fluid">
          <img
            src={menuIcon} 
            alt="Menu Toggle"
            onClick={handleMenuToggle}
            aria-controls="navbarToggleExternalContent"
            aria-expanded={isMenuOpen}
            className="menu-icon"
          />
        </div>


    </div>
  );
};

export default Menu;