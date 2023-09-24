import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RecipeDetail.css";
import searchImage from "./photo/Search.png";
import Menu from "./components/Menu";
import pinkTea from "./photo/pinkTea.png";
import axios from "axios";
import CommentForm from "./CommentForm";
import sob from "./photo/sob.png"; 
import cockImg from "./photo/cock-circle.png"; 
import star from "./photo/star.png"; 

const daiquiri = () => {
  const { state } = useLocation(); 
  const [instruction, setInstruction] = useState("");
  const [commentPopupVisible, setCommentPopupVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [taste, setTaste] = useState("");
  const [overallReview, setOverallReview] = useState("");
  const [comments, setComments] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drinkImgPath, setDrinkImgPath] = useState("");
  const [cocktailName, setCocktailName] = useState(""); 
  const [ingredients, setIngredients] = useState([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleSubmitComment = (commentData) => {
    setComments([...comments, commentData]);
    setIsCommentModalOpen(false);
  };

  const handleCommentButtonClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleVectorClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen); 
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

  const { cocktailId } = useParams();

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

  useEffect(() => {
    // Axios를 사용하여 API 호출
    axios
      .get("/recipe/detail")
      .then((response) => {
        const name = response.data.name; // API에서 받은 데이터의 'name' 필드
        setCocktailName(name); // 상태 업데이트
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Axios를 사용하여 API 호출
    axios.get("/recipe/detail")
      .then((response) => {
        const apiInstruction = response.data.instruction; // API에서 받은 데이터의 'instruction' 필드
        setInstruction(apiInstruction); // 상태 업데이트
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axios.get("/api/ingredients") // 해당 API 엔드포인트로 GET 요청 보내기
      .then((response) => {
        const ingredientsData = response.data; // API에서 받은 재료 데이터
        setIngredients(ingredientsData); // 상태 업데이트
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("Selected Cocktail:", selectedCocktail); // 선택된 칵테일 로깅
  console.log("Recipe Detail:", state); // 전달된 레시피 디테일 로깅

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
          <div className="bg">
            <div className="cock-basic-info">
              <div className="cock-basic-info-img">
              <img
  className="rectangle"
  alt="Rectangle"
  src={sob}
/>

              </div>

              {/* 칵테일 이름 */}
              <div className="cock-info-column">
              <div className="text-wrapper-1">Daiquiri</div>
              <div className="text-wrapper-2">다이키리</div>
              <p className="text-wrapper-16">
              다이키리는 화이트 럼, 라임 주스, 설탕의 간단한 조합으로 만들어진다.<br/>
              상쾌한 맛과 깔끔한 신맛이 특징이다.
            </p>
            </div>
              </div>

         
            </div>
          <div className="bg-2">
            <div className="cocktialInfo">
              {/* 포스터 이미지 불러오기 API */}
             
              {/* 소개 */}
              {/* <div className="text-wrapper-3">칵테일 사진</div> */}

              {/* 재료 */}
              <h2 className="indeTitle">재료</h2>
              <div className="indelist">
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">럼</div>
                      <div className="text-wrapper">0.5 oz</div>
                    </div>
                  </div>
                </div>
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">라임주스</div>
                      <div className="text-wrapper">0.5 count</div>
                    </div>
                  </div>
                </div>
                <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">설탕시럽</div>
                      <div className="text-wrapper">1 tsp</div>
                    </div>
                  </div>
                </div>
                {/* <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">물</div>
                      <div className="text-wrapper">1 dash</div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />

                      <div className="textWrapper">탄산수</div>
                      <div className="text-wrapper">fill</div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="indegroup">
                  <div className="overlap-2">
                    <div className="ellipse-wrapper">
                      <div className="ellipse-3" />
                      <div className="textWrapper">탄산수</div>
                      <div className="text-wrapper">2oz</div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* 일단 각주 처리  밑에 자료 코드 다시 짬 */}
              {/* <h2 className="indeTitle">재료</h2> */}
      <div className="indelist">
        {ingredients.map((ingredient, index) => (
          <div className="indegroup" key={index}>
            <div className="overlap-2">
              <div className="ellipse-wrapper">
                <div className="ellipse-3" />
                <div className="textWrapper">{ingredient.name}</div>
                <div className="text-wrapper">{`${ingredient.quantity} ${ingredient.unit}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
              {/* 레시피 */}
              <h2 className="recipeRecipe">레시피</h2>
              <div className="recipeWrapper">
              <div className="ellipse">
                <div className="text-wrapper-15">
                  1</div>
                  </div>
                  <div className="text-wrapper-13">
                  <p className="step">모든 재료를 얼음이 든 쉐이커에 부어준다.
                  </p>
                  </div>
              </div>
                <div className="recipeWrapper">
                <div className="ellipse">
                <div className="text-wrapper-15">
                  2</div>
                  </div>
                  <div className="text-wrapper-13">
                  <p className="step">쉐이커를 이용해 잘 흔들어주고 잔에 부어준다.
                    </p>
                  </div>
                </div>
                <div className="recipeWrapper">
                <div className="ellipse">
                <div className="text-wrapper-15">
                  3</div>
                  </div>
                  <div className="text-wrapper-13">
                  <p className="step">레몬 껍질에서 나오는 오일을 음료위로 짜고 올리브를 장식한다.
                    </p>
                  </div>
                </div>

              {/* 코멘트 */}
              <div className="commentBox">
                  {/* <h2 className="comment">코멘트</h2> */}
                  {/* 댓글 달기 버튼
                  <button className="commentButton" onClick={handleCommentButtonClick}>
                    코멘트 달기
                  </button>
                  <div>
                    코멘트코멘트코멘트코멘트
                  </div> */}
                  {/* 댓글 모달 */}
                  {/* {isCommentModalOpen && (
                    <div className="commentModal">
                      <textarea value={comment} onChange={handleCommentChange} />
                      <button onClick={handleCommentSubmit}>Submit</button>
                    </div>
                  )} */}
                  {/* 댓글 목록 */}
                  {/* <div className="comments">
                    {comments.map((c, index) => (
                      <div key={index} className="commentItem">
                        {c}
                      </div>
                    ))}
                  </div> */}
                  <div className="comment-info">
                    <div className="comment-title">
                      코멘트
                    </div>
                    <div className="commnent-btn">
                      <button>코멘트 달기</button>
                    </div>
                  </div>
                  <div className="commentList">
                    <div className="comment-user-img">
                      <img src={cockImg}  style={{ width: '200px' }} />
                    </div>
                    <div className="commnet-text-box">
                      <div className="comment-top-box">
                        <div className="comment-top-title">
                          @ 올리브가 올라간 카피바라
                        </div>
                        <div className="commnet-top-star">
                          <img src={star}/>
                        </div>
                      </div>
                      <div className="commnet-intro-box">
                        평소에 칵테일을 자주 만들어 먹는데 간단하고 좋았어요!
                      </div>
                      <div className="comment-flavor-box">
                        <button>상큼한 맛</button>
                        <button>달달한 맛</button>
                      </div>
                    </div>
                  </div>
              </div>
              {/* 코멘트 끝 */}

            </div>
            </div>
            </div>
        </div>
        </div>
  );
};

export default daiquiri;