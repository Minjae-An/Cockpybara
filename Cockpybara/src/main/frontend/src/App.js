import React, { useState } from 'react';
import Menu from './components/Menu';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginButtonClick = () => {
    // 로그인 버튼 클릭 시 처리할 로직 작성
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    // 검색 로직 작성
    console.log('Search value:', searchValue);
  };

  return (
    <div className="app">
      <div className="button-container">
        <button onClick={handleLoginButtonClick}>로그인</button>
      </div>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`content ${isMenuOpen ? 'content-shifted' : ''}`}>
        <h1>Hello, This is Cockpybara Main Domain</h1>
        <div>We are alcohol-free</div>
        <div className="search-container">
          <input
            type="text"
            placeholder="칵테일 이름을 입력하세요"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
      </div>
    </div>
  );
}

export default App;
