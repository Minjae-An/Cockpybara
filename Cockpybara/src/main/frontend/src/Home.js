import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./components/Menu.js";
import searchImage from "./photo/Search.png";
import userCock from "./photo/cock-circle.png";
import MainMain from "./MainMain";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

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

  return (
    <div>
      <div className="headerContainer">
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className={`menuBar ${isMenuOpen ? "menuBar-open" : ""}`}>
          <div className="headerbox">
            <svg
              className="vector"
              width="35"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleVectorClick}
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
            <Link to="/">
              <div className="mainHome">Cockpybara</div>
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
            <Link to="/user/{userId}/my-page">
              <button className="detailLogin">
                <img src={userCock}   width="90"  />
              </button>
              {/* 이미지 변경 후 경로 변경 */}
            </Link></div>
        </div>
      <div className={`content ${isMenuOpen ? "content-shifted" : ""}`}></div>
      </div>
      <MainMain />
    </div>
  );
}

export default Home;
