import React from 'react';
import { Link } from 'react-router-dom';
import './NewMenu.css';

const NewMenu = () => { 

    return (
        <div className="menu-container">
            <ul className="menuClassName"> 
                <li className='new_about'><Link to="/about">About</Link></li>
                <li className='new_recipe'><Link to="/recipe">Recipe</Link></li>
                <li className='new_community'><Link to="/community/{userId}">Community</Link></li>
            </ul>
        </div>
    );
};

export default NewMenu; 
