import React, { useState } from 'react';
import Menu from './components/Menu';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state

  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginButtonClick = () => {
    if (isLoggedIn) {
      // If logged in, navigate to the user's profile page (My Page)
      navigate('/mypage'); // Replace '/mypage' with your actual URL for the user's profile page
    } else {
      // If not logged in, navigate to the login page
      navigate('/login');
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    // 현재 경로를 확인하여 /recipe 페이지인지 검사합니다.
    const currentPath = window.location.pathname;
    if (currentPath === '/recipe') {
      // /recipe 페이지일 경우, URL 파라미터로 칵테일 검색 쿼리를 넘겨줍니다.
      const queryParams = new URLSearchParams(window.location.search);
      const searchQuery = queryParams.get('search');
      if (searchQuery && searchQuery !== searchValue) {
        navigate(`/recipe?search=${encodeURIComponent(searchValue)}`);
      } else {
        // 현재 검색 쿼리와 이전 검색 쿼리가 같으면 검색 쿼리를 리셋합니다.
        setSearchValue('');
      }
    } else {
      // Home 페이지일 경우, /recipe 페이지로 네비게이션하면서 칵테일 검색 쿼리를 함께 넘겨줍니다.
      navigate(`/recipe?search=${encodeURIComponent(searchValue)}`);
    }
  };

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
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
        <button onClick={handleLoginButtonClick}>{isLoggedIn ? '마이페이지' : '로그인'}</button>
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