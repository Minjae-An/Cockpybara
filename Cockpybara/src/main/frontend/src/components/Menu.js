// Menu.js
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './Menu.css';
import menuIcon from '../photo/MenuBar.png'; 

const Menu = ({ isMenuOpen, setIsMenuOpen, menuClassName }) => { // 여기에 menuClassName 추가
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu-container">
      <div className={`collapse${isMenuOpen ? ' show' : ''}`} id="navbarToggleExternalContent">
        {isMenuOpen && (
          <ul className={`menu-list ${menuClassName}`}> {/* 여기에 menuClassName 사용 */}
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