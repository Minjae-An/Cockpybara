import React, { useState } from 'react';
import Menu from './components/Menu';
import './NewNavBar.css';

const NewNavBar = () => { 
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="nav-container">
           {/*메뉴바 시작*/}
           <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> {/* 버튼을 누르면 Menu Component 호출*/}
            <div className={`content ${isMenuOpen ? 'content-shifted' : ''}`}>

            </div>
        </div>
    );
};

export default NewNavBar;  
