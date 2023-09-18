import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCommunitySection.css';
import { Link } from 'react-router-dom';
import arrowPhoto from "./photo/arrow.png";
import cockIcon from "./photo/CockIcon.png";
import searchImage from "./photo/Search.png";
import Menu from "./components/Menu";

const MyCommunitySection = ({ userId }) => {
  // 상태 초기화: 백엔드에서 받아올 때 사용할 사용자 이름과 사진 URL 상태
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleVectorClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen); // 이전 상태 값을 이용하여 토글
  };
  const handleSearch = () => {
    // 현재 검색어를 정리합니다.
    const trimmedSearchValue = searchValue.trim();

    // 검색어가 비어있으면 URL 파라미터에서 검색어를 제거하고 해당 페이지로 이동합니다.
    if (trimmedSearchValue === "") {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete("search");
      navigate(`/recipe?${queryParams.toString()}`);
    } else {
      // 검색어가 있는 경우, URL 파라미터에 검색어를 추가하고 해당 페이지로 이동합니다.
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("search", trimmedSearchValue);
      navigate(`/recipe?${queryParams.toString()}`);
    }
  };

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const userResponse = await fetch(`/api/user/${userId}`);
        const userData = await userResponse.json();
        setUserName(userData.name);
        setUserPhoto(userData.photoUrl);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchDataFromBackend();
  }, [userId]);

  // 더미 데이터: 테스트를 위해 하드코딩된 사용자 이름과 사진 URL
  useEffect(() => {
    setUserName('올리브가 올라간 카피바라'); // 더미 데이터로 사용자 이름 상태 초기화
    setUserPhoto('Cockpybara/Cockpybara/src/main/frontend/src/photo/capybaraIcon.png'); // 더미 데이터로 사용자 사진 상태 초기화
  }, []);

  const navigate = useNavigate();

  const handleMyPageButtonClick = () => {
    navigate(`/user/${userId}/my-page`);
  };

  return (
    <div>
    <div className="headerContainer">
    <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    <div className={`menuBar ${isMenuOpen ? "menuBar-open" : ""}`}>
        <div className="headerbox">
        <svg
          class="vector"
          width="35"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleVectorClick} // 클릭 이벤트 리스너 추가
        >
          <path
            d="M0 38.25H37.5V32H0V38.25ZM0 0.75V7H56.25V0.75H0ZM0 22.625H56.25V16.375H0V22.625Z"
            fill="black"
          />
        </svg>
        <Link to="/about">
          <div className="menuAbout">About</div>
          </Link>
          <Link to="/recipe">
          <div className="menuRecipe">Recipe</div>
          </Link>
          <Link to="/community">
          <div className="menuCommunity">Community</div>
          </Link>
        </div>
        <div className="rightComponent">
        <div className="search-wrap">
          <input
            type="text"
            style={{ fontSize: "20px" }}
            value={searchValue}
            onChange={handleSearchChange}
          />
          <img src={searchImage} alt="검색" onClick={handleSearch} />
        </div>
        <div className="detailLogin">로그인</div>
        </div>
      </div>
      </div>
      <div className={`content ${isMenuOpen ? "content-shifted" : ""}`}>
        </div>
        <div className="myCommunity-box"> 
      <div className="myCommunity-serve-box">
        <p id="community-title">MY 커뮤니티</p>
        <div className="myPage-box">
          {/* 사진을 보여줄 이미지 태그 */}
          <div className="photo-box">
            <img src={cockIcon} alt="사용자 사진" />
          </div>
          <div className="userName-box">
            <p id="user-name">{userName}</p>
          </div>
          <Link to='/user/{userId}/my-page'>
          <button id="myPagegoButton" onClick={handleMyPageButtonClick}>
            <img src={arrowPhoto} alt="화살표 사진" />
          </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyCommunitySection;