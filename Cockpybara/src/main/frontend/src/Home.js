import React, { useState } from 'react';
import Menu from './components/Menu';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    //되나?
    //되나??
    // 검색 로직 작성
    console.log('Search value:', searchValue);
  };

  return (
    <div className="home">
      <div className="button-container">
      <div className="search-container">
          <input
            type="text"
            placeholder="칵테일 이름을 입력하세요"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        <button onClick={handleLoginButtonClick}>로그인</button>
      </div>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`content ${isMenuOpen ? 'content-shifted' : ''}`}>
        <h1>Hello, This is Cockpybara Main Domain</h1>
        <div>We are alcohol-free</div>
      </div>
    </div>
  );
}

export default Home;
