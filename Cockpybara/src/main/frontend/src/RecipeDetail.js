import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RecipeDetail.css";
import searchImage from "./photo/Search.png";
import Menu from "./components/Menu";
import pinkTea from "./photo/pinkTea.png";
import axios from "axios";

const RecipeDetail = () => {
  const { state } = useLocation(); // 전달된 상태를 가져옴

  const [commentPopupVisible, setCommentPopupVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [taste, setTaste] = useState("");
  const [overallReview, setOverallReview] = useState("");
  const [comments, setComments] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drinkImgPath, setDrinkImgPath] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleVectorClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen); // 이전 상태 값을 이용하여 토글
  };

  const handleSearch = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/recipe") {
      const queryParams = new URLSearchParams(window.location.search);
      const searchQuery = queryParams.get("search");
      if (searchQuery && searchQuery !== searchValue) {
        navigate(`/recipe?search=${encodeURIComponent(searchValue)}`);
      } else {
        setSearchValue("");
      }
    } else {
      // Home 페이지일 경우, /recipe 페이지로 네비게이션하면서 칵테일 검색 쿼리를 함께 넘겨줍니다.
      navigate(`/recipe?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleCommentPopupToggle = () => {
    setCommentPopupVisible(!commentPopupVisible);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleTasteChange = (e) => {
    setTaste(e.target.value);
  };

  const handleOverallReviewChange = (e) => {
    setOverallReview(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log("Submitted Comment:", {
      rating,
      taste,
      overallReview,
      comment,
    });
    setComments([
      ...comments,
      {
        rating,
        taste,
        overallReview,
        comment,
      },
    ]);
    setComment("");
    setRating(0);
    setTaste("");
    setOverallReview("");
    setCommentPopupVisible(false);
  };

  // Get the cocktailId from the URL parameter
  const { cocktailId } = useParams();

  // Sample dummy cocktail data for demonstration
  const dummyCocktails = [
    {
      id: 1,
      title: "Mojito",
      explan: "Refreshing cocktail",
      ingredient: ["Rum", "Lime", "Mint", "Sugar", "Soda Water"],
      step: "Mix all ingredients...",
      flavors: ["Sweet", "Sour", "Minty"],
    },
    {
      id: 2,
      title: "Cosmopolitan",
      explan: "Classic cocktail",
      ingredient: ["Vodka", "Triple Sec", "Lime Juice", "Cranberry Juice"],
      step: "Combine all ingredients...",
      flavors: ["Tart", "Fruity"],
    },
    {
      id: 3,
      title: "Old Fashioned",
      explan: "Classic cocktail with a twist",
      ingredient: ["Bourbon", "Angostura Bitters", "Sugar Cube", "Orange Peel"],
      step: "Muddle sugar and bitters, add bourbon, stir, add ice and garnish",
      flavors: ["Strong", "Bitter", "Citrusy"],
    },
  ];
  const selectedCocktail = dummyCocktails.find(
    (cocktail) => cocktail.id === parseInt(cocktailId)
  );

  useEffect(() => {
    // Axios를 사용하여 API 호출
    axios.get("/recipe/detail")
      .then((response) => {
        const imgPath = response.data.drinkImgPath;
        setDrinkImgPath(imgPath);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("Selected Cocktail:", selectedCocktail); // 선택된 칵테일 로깅
  console.log("Recipe Detail:", state); // 전달된 레시피 디테일 로깅

  // Render the cocktail details

  return (
    <div>
      <div className="recipeDetail">
        <div className="headerContainer">
          <div className={`menuBar ${isMenuOpen ? "menuBar-open" : ""}`}>
            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className="headerbox">
              <svg
                class="vector"
                width="35"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 38.25H37.5V32H0V38.25ZM0 0.75V7H56.25V0.75H0ZM0 22.625H56.25V16.375H0V22.625Z"
                  fill="black"
                  onClick={handleVectorClick}
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
      </div>
      <div className={`overlap ${isMenuOpen ? "content-shifted" : ""}`}>
        <div className="overlap">
          <div className="line"></div>
          <div className="bg" />
          <div className="bg-2">
            <div className="cocktialInfo">
              {/* 포스터 이미지 불러오기 API */}
              <img
          className="rectangle"
          alt="Rectangle"
          src={drinkImgPath}
        />

              {/* 칵테일 이름 */}
              <div className="text-wrapper-1">Morning Cocktail</div>
              <div className="text-wrapper-2">모닝 칵테일</div>
              <p className="text-wrapper-16">
                  새콤달콤한 칵테일. 아주 약간의 탄산이 있고 목넘김이 부드럽다.
                  위스키가 들어가 강한 맛이 느껴질 것<br />
                  같지만 생각보다 쎄지 않다.
                </p>
              {/* 소개 */}
              <div className="text-wrapper-3">칵테일 사진</div>

              {/* 재료 */}
              <h2 className="indeTitle">재료</h2>
              <div className="indelist">
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">스카치 위스키</div>
                      <div className="text-wrapper">2oz</div>
                    </div>
                  </div>
                </div>
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">레몬즙</div>
                      <div className="text-wrapper">1/2oz</div>
                    </div>
                  </div>
                </div>
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">라임즙</div>
                      <div className="text-wrapper">1/2oz</div>
                    </div>
                  </div>
                </div>
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">설탕 시럽</div>
                      <div className="text-wrapper">1ea</div>
                    </div>
                  </div>
                </div>
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">압생트</div>
                      <div className="text-wrapper">2dash</div>
                    </div>
                  </div>
                </div>
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />
                      <div className="textWrapper">탄산수</div>
                      <div className="text-wrapper">2oz</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 레시피 */}
              <h2 className="recipeRecipe">레시피</h2>
              <div className="recipeWrapper">
              <div className="ellipse">
                <div className="text-wrapper-15">
                  1</div>
                  </div>
                  <div className="text-wrapper-13">
                  <p className="step">준비한 재료를 모두 넣어 잘 저은 후 칵테일 잔에 따른다.
                  </p>
                  </div>
              </div>
                <div className="recipeWrapper">
                <div className="ellipse">
                <div className="text-wrapper-15">
                  2</div>
                  </div>
                  <div className="text-wrapper-13">
                  <p className="step">  마라스키노 체리를 칵테일 핀에 꽂아 장식한 후, 레몬 필을 짜
                    넣으면 완성!
                    </p>
                  </div>
                </div>
             

              {/* 코멘트 */}
              <div className="commentBox">
                <h2 className="comment">코멘트</h2>
            <button className="commentButton">코멘트 달기</button>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
  );
};

export default RecipeDetail;