import React, { useState } from "react";
import "./MyPage.css";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./components/Menu.js";
import searchImage from "./photo/Search.png";
import cockpyPhoto from "./photo/cock-circle.png";
import polygon from "./photo/polygon.png"

export const MyPage = () => {
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
    <div className="myPageContainer">
      <div className="headerContainer">
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
              <img className="detailLogin" src={cockpyPhoto} alt="로그인" />
            </Link>
          </div>
        </div>
      </div>
      <div className={`content ${isMenuOpen ? "content-shifted" : ""}`}></div>
      <div className="line"></div>
      <div className="screen">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="overlap-group">
              <div className="bg" />

              <div>
                <div> </div>
              </div>
              <div className="rectangle-3" />
              <div className="group-2">
                <div className="text-wrapper-4">올리브가 올라간 카피바라</div>
                <div className="text-wrapper-5">
                  안녕하세요! 올리브가 올라간 카피바라입니다.
                </div>
              </div>
              <img className="mask-group" alt="Mask group" src={cockpyPhoto} />
              <div className="ellipse-wrapper">
                <div className="ellipse-2" />
              </div>
              <div className="view-2" />
              <Link to="/user/editProfile">
                <button className="text-wrapper-6">프로필 수정</button>
              </Link>
            </div>
            <div className="overlap-2">
              <Link to = '/recipe'>
              <button className="rectangle-4">추가하기</button>
              <button className="rectangle-5">추가하기</button>
              <button className="rectangle-6">추가하기</button>
              </Link>
              <button className="rectangle-7"></button>
              <div className="view-3">
              </div>
              <div className="flexcontainer">
                <p className="text">
                  <span className="span">
                    회원님이 등록한 레시피 중<br />
                    가장 먼저 뜨면 좋을 레시피를 등록해 주세요.
                  </span>
                </p>
              </div>
            </div>
            <div className="moveMargin">
            <div className="text-wrapper-12">즐겨찾기</div>
            <div className="text-wrapper-13">대표 레시피 등록</div>
            <div className="text-wrapper-14">나만의 레시피</div>
            <div className="text-wrapper-15">댓글 단 레시피</div>
            <div className="star-wrapper">
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 2">
                  <circle
                    id="Ellipse 20"
                    cx="20.5"
                    cy="20.5"
                    r="20.5"
                    fill="#FFD952"
                  />
                  <path
                    id="Star 1"
                    d="M18.6839 9.72542C19.3987 8.17567 21.6013 8.17567 22.3161 9.72542L24.1818 13.7703C24.4732 14.4019 25.0717 14.8368 25.7625 14.9187L30.1859 15.4431C31.8807 15.6441 32.5613 17.7389 31.3083 18.8976L28.038 21.9219C27.5273 22.3942 27.2987 23.0978 27.4342 23.7801L28.3023 28.1491C28.6349 29.823 26.853 31.1176 25.3638 30.284L21.4769 28.1083C20.8699 27.7686 20.1301 27.7686 19.5231 28.1083L15.6362 30.284C14.147 31.1176 12.3651 29.823 12.6977 28.1491L13.5658 23.7801C13.7014 23.0978 13.4727 22.3942 12.962 21.9219L9.6917 18.8976C8.4387 17.7389 9.11933 15.6441 10.8141 15.4431L15.2375 14.9187C15.9283 14.8368 16.5268 14.4019 16.8182 13.7703L18.6839 9.72542Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>
            <div className="group-wrapper">
              <div className="group-3">
                <div className="group-4">
                <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Group 93">
<g id="Ellipse 21" filter="url(#filter0_b_312_80)">
<circle cx="52" cy="52" r="26" fill="#7E7E7E" fill-opacity="0.5"/>
</g>
<path id="Line 9" d="M39.272 52H64.772" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
<path id="Line 10" d="M52.4471 39.6748L52.4471 65.1748" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
</g>
<defs>
<filter id="filter0_b_312_80" x="22" y="22" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_312_80"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_312_80" result="shape"/>
</filter>
</defs>
</svg>

                </div>
                <Link to='/user/my-recipe'>
                <button className="text-wrapper-16">레시피 등록하기</button>
                </Link>
              </div>
            </div>
            <div className="overlap-4">
              <img className="polygon" alt="Polygon" src={polygon} />
              <div className="flexcontainer-2">
                <p className="span-wrapper">
                <Link to='/recipe'>
                  <button className="text-wrapper-17">
                    댓글 단 레시피 더 보러가기</button>
                    </Link>
                </p>
              </div>
            </div>
            <div className="overlap-5">
              <img className="polygon" alt="Polygon" src={polygon} />
              <div className="flexcontainer-3">
                <p className="span-wrapper">
                <Link to='/recipe'>
                  <button className="text-wrapper-17">
                    즐겨찾기 더 보러가기</button>
                    </Link>
                    </p>
              </div>
            </div>
            <div className="group-5">
              <div className="overlap-6">
                <div className="group-6">
                  <div className="overlap-group-3">
                    
                  </div>
                </div>
                <Link to ='/recipe/detail/1'>
                <div className="text-wrapper-19">Mojito</div>
                </Link>
              </div>
            </div>
            <div className="group-7">
              <div className="overlap-6">
                <div className="group-6">
                  <div className="overlap-group-4">
                    
                  </div>
                </div>
                <Link to ='/recipe/detail/3'>
                <div className="text-wrapper-19">Old Fashioned</div>
                </Link>
              </div>
            </div>
            <div className="group-8">
              <div className="overlap-6">
                <div className="group-6">
                  <div className="overlap-group-5">
                    
                  </div>
                </div>
                <Link to ='/recipe/detail/4'>
                <div className="text-wrapper-19">Martini</div>
                </Link>
              </div>
            </div>
            <div className="group-9">
              <div className="overlap-6">
                <div className="group-6">
                  <div className="overlap-group-6">
                    
                  </div>
                </div>
                <Link to='/recipe/detail/5'>
                <div className="text-wrapper-19">Daiquiri</div>
                </Link>
              </div>
            </div>
            <div className="group-10">
              <div className="overlap-6">
                <div className="group-6">
                  <div className="overlap-group-7">
                    
                  </div>
                </div>
                <Link to ='/recipe/detail/1'>
                <div className="text-wrapper-19">Mojito</div>
                </Link>
              </div>
            </div>
            <div className="group-11">
              <div className="overlap-6">
                <div className="group-6">
                  <div className="overlap-group-8">
                    
                  </div>
                </div>
                <Link to ='recipe/detail/2'>
                <div className="text-wrapper-19">Cosmopolitan</div>
                </Link>
              </div>
            </div>
            <div className="group-12">
              <div className="overlap-6">
                <div className="group-6">
                  <div className="overlap-group-9">
                  <Link to ='recipe/detail/2'>
                    <div className="text-wrapper-19">Cosmopolitan</div>
                    </Link>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default MyPage;
