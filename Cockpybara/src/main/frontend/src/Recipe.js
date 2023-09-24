import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom"; // Import the Link, useLocation, and useNavigate hooks
import pinkTea from "./photo/pinkTea.png";
import "./Recipe.css";
import searchImage from "./photo/Search.png";
import Menu from "./components/Menu";


const Recipe = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedTastes, setSelectedTastes] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("name");
  const [recipeCount, setRecipeCount] = useState(31);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지 당 표시할 항목 수
  const [favoriteCocktails, setFavoriteCocktails] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleVectorClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen); // 이전 상태 값을 이용하여 토글
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // 페이지 변경 시 스크롤을 가장 위로 이동
    window.scrollTo(0, 900);
  };

  // sortedCocktails를 sortCocktails 함수를 사용하여 정의합니다.
  const sortCocktails = (option, cocktailsToSort) => {
    // 칵테일을 소팅하는 함수
    const sortedCocktails = [...cocktailsToSort];

    if (option === "name") {
      sortedCocktails.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "popularity") {
      sortedCocktails.sort((a, b) => a.popularity - b.popularity);
    } else if (option === "newest") {
      sortedCocktails.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return sortedCocktails;
  };

  const mockCocktailImages = [
    "http://www.thecocktaildb.com/images/media/drink/rxtqps1478251029.jpg",
    "http://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg",
    "http://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
    "http://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg",
    "http://www.thecocktaildb.com/images/media/drink/usuuur1439906797.jpg",
    "http://www.thecocktaildb.com/images/media/drink/cpf4j51504371346.jpg",
    "http://www.thecocktaildb.com/images/media/drink/tutwwv1439907127.jpg",
    "http://www.thecocktaildb.com/images/media/drink/o56h041504352725.jpg",
    "http://www.thecocktaildb.com/images/media/drink/2dwae41504885321.jpg",
    "http://www.thecocktaildb.com/images/media/drink/vak0e51504389504.jpg",
    "http://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg",
    "http://www.thecocktaildb.com/images/media/drink/vvpxwy1439907208.jpg",
    "http://www.thecocktaildb.com/images/media/drink/wtyxvx1472405831.jpg",
    "http://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg"
  ];


  useEffect(() => {
    // API를 통해 칵테일 데이터를 가져옵니다.
    // 예시를 위해 데이터를 직접 설정하지만, 실제로는 백엔드 API를 호출하여 데이터를 가져와야 합니다.
    const mockCocktails = [
      {
        id: "1",
        title: "Mojito",
        image: mockCocktailImages[0],
        description: "A refreshing cocktail with rum, lime, mint, and soda water.",
        ingredient: ["Rum", "Lime", "Mint", "Sugar", "Soda Water"],
        tastes: ["신 맛", "달달한 맛", "짠 맛", "톡쏘는 맛"],
        popularity: 5,
        date: "2023-09-07",
      },
      {
        id: "2",
        title: "Cosmopolitan",
        image: mockCocktailImages[1],
        description: "A classic cocktail with vodka, triple sec, and cranberry juice.",
        ingredient: ["Vodka", "Triple Sec", "Lime Juice", "Cranberry Juice"],
        tastes: ["짠 맛"],
        popularity: 3,
        date: "2023-09-06",
      },
      {
        id: "3",
        title: "Old Fashioned",
        image: mockCocktailImages[2],
        description: "A timeless cocktail with bourbon, sugar, and bitters.",
        ingredient: ["Bourbon", "Sugar", "Bitters", "Orange Peel"],
        tastes: ["달달한 맛"],
        popularity: 4,
        date: "2023-09-05",
      },
      {
        id: "4",
        title: "Martini",
        image: mockCocktailImages[3],
        description: "A classic cocktail with gin, dry vermouth, and olives.",
        ingredient: ["Gin", "Dry Vermouth", "Olives"],
        tastes: ["달달한 맛", "부드러운 맛"],
        popularity: 2,
        date: "2023-09-04",
      },
      {
        id: "5",
        title: "Daiquiri",
        image: mockCocktailImages[4],
        description: "A classic cocktail with rum, lime juice, and simple syrup.",
        ingredient: ["Rum", "Lime Juice", "Simple Syrup"],
        tastes: ["신 맛", "짠 맛"],
        popularity: 4,
        date: "2023-09-24",
      },
      {
        id: "6",
        title: "Piña Colada",
        image: mockCocktailImages[5],
        description: "A tropical cocktail with rum, coconut cream, and pineapple juice.",
        ingredient: ["Rum", "Coconut Cream", "Pineapple Juice"],
        tastes: ["달달한 맛", "짠 맛"],
        popularity: 3,
        date: "2023-09-24",
      },
      {
        id: "7",
        title: "Negroni",
        image: mockCocktailImages[6],
        description: "A classic cocktail with gin, Campari, and sweet vermouth.",
        ingredient: ["Gin", "Campari", "Sweet Vermouth"],
        tastes: ["신 맛", "짠 맛"],
        popularity: 5,
        date: "2023-09-24",
      },
      {
        id: "8",
        title: "Whiskey Sour",
        image: mockCocktailImages[7],
        description: "A whiskey-based cocktail with lemon juice and simple syrup.",
        ingredient: ["Bourbon", "Lemon Juice", "Simple Syrup"],
        tastes: ["달달한 맛", "짠 맛"],
        popularity: 2,
        date: "2023-09-24",
      },
      {
        id: "9",
        title: "Malibu Twister",
        image: mockCocktailImages[8],
        description: "A refreshing cocktail with rum, lime, mint, and soda water.",
        ingredient: ["Rum", "Lime", "Mint", "Sugar", "Soda Water"],
        tastes: ["달달한 맛"],
        popularity: 1,
        date: "2023-09-24",
      },
      {
        id: "10",
        title: "Blue Lagoon",
        image: mockCocktailImages[9],
        description: "A vibrant blue cocktail with vodka, blue curaçao, and lemonade.",
        ingredient: ["Vodka", "Blue Curaçao", "Lemonade"],
        tastes: ["신 맛", "달달한 맛"],
        popularity: 4,
        date: "2023-09-24",
      },
      {
        id: "11",
        title: "Tequila Sunrise",
        image: mockCocktailImages[10],
        description: "A colorful cocktail with tequila, orange juice, and grenadine syrup.",
        ingredient: ["Tequila", "Orange Juice", "Grenadine Syrup"],
        tastes: ["신 맛", "달달한 맛"],
        popularity: 3,
        date: "2023-09-24",
      },
      {
        id: "12",
        title: "Sazerac",
        image: mockCocktailImages[11],
        description: "A classic New Orleans cocktail with rye whiskey and absinthe.",
        ingredient: ["Rye Whiskey", "Absinthe", "Sugar Cube", "Peychaud's Bitters"],
        tastes: ["달달한 맛", "신 맛", "짠 맛"],
        popularity: 5,
        date: "2023-09-24",
      },
      {
        id: "13",
        title: "Gin and Tonic",
        image: mockCocktailImages[12],
        description: "A simple and refreshing cocktail with gin and tonic water.",
        ingredient: ["Gin", "Tonic Water", "Lime Wedge"],
        tastes: ["짠 맛","쓴 맛"],
        popularity: 4,
        date: "2023-09-24",
      },
      {
        id: "14",
        title: "Mai Tai",
        image: mockCocktailImages[13],
        description: "A tropical cocktail with light and dark rum, lime, and orgeat syrup.",
        ingredient: ["Light Rum", "Dark Rum", "Lime Juice", "Orgeat Syrup"],
        tastes: ["달달한 맛", "신 맛", "상큼한 맛"],
        popularity: 3,
        date: "2023-09-24",
      },
    ];

    // filteredCocktails를 정의합니다.
    const filteredCocktails = mockCocktails.filter((cocktail) => {
      if (searchQuery && searchQuery.trim() !== "") {
        return (
            cocktail.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedTastes.length === 0 ||
                cocktail.tastes.some((taste) => selectedTastes.includes(taste)))
        );
      } else {
        if (selectedIngredients.length === 0 && selectedTastes.length === 0) {
          return true;
        } else {
          return (
              (selectedIngredients.length === 0 ||
                  cocktail.ingredient.some((ingredient) =>
                      selectedIngredients.includes(ingredient)
                  )) &&
              (selectedTastes.length === 0 ||
                  cocktail.tastes.some((taste) => selectedTastes.includes(taste)))
          );
        }
      }
    });


    // filteredCocktails를 기반으로 sortedCocktails를 정의합니다.
    const sortedCocktails = sortCocktails(sortOption, filteredCocktails).slice(
        0,
        recipeCount
    );

    setCocktails(sortedCocktails);
  }, [searchQuery, selectedIngredients, selectedTastes, sortOption, recipeCount]);

  // 인기 칵테일 데이터
  const popularCocktails = [
    {
      id: "1",
      title: "mojito",
      image: mockCocktailImages[0],
      tastes: ["신 맛", "달달한 맛", "짠 맛"],
    },
    {
      id: "2",
      title: "Cosmopolitan",
      image: mockCocktailImages[1],
      tastes: ["짠 맛"],
    },
    {
      id: "3",
      title: "Old Fashioned",
      image: mockCocktailImages[2],
      tastes: ["달달한 맛"],
    },
  ];

  // Recipe.js의 handleTasteChange 함수를 아래와 같이 수정합니다.
  const handleTasteChange = (e) => {
    const {value, checked} = e.target;
    if (checked) {
      // 이미 선택된 맛인지 확인
      if (!selectedTastes.includes(value)) {
        setSelectedTastes([...selectedTastes, value]);
      }
    } else {
      // 선택 해제된 맛을 제거
      setSelectedTastes(selectedTastes.filter((taste) => taste !== value));
    }
  };

  const handleIngredientChange = (e) => {
    const {value, checked} = e.target;
    if (checked) {
      setSelectedIngredients([...selectedIngredients, value]);
    } else {
      setSelectedIngredients(
          selectedIngredients.filter((ingredient) => ingredient !== value)
      );
    }
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

  const navigateToMyRecipe = useNavigate();

  const navigateToAddRecipe = () => {
    navigateToMyRecipe("/user/my-recipe"); // 변경된 경로로 이동
  };

  const handleSortChange = (e) => {
    // 소트 옵션 변경 핸들러
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
  };

  const handleRecipeCountChange = (e) => {
    const newRecipeCount = parseInt(e.target.value);
    setRecipeCount(newRecipeCount); // 레시피 개수 상태 업데이트
  };

  // 현재 페이지에 표시할 칵테일 목록
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCocktails = cocktails.slice(startIndex, endIndex);

  const totalPages = Math.ceil(cocktails.length / itemsPerPage);


// 이전 페이지로 이동하는 함수
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

// 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  const handleFavoriteToggle = (cocktailId) => {
    // 칵테일의 인덱스를 찾습니다.
    const cocktailIndex = cocktails.findIndex((cocktail) => cocktail.id === cocktailId);

    if (cocktailIndex !== -1) {
      const updatedCocktails = [...cocktails];
      const isFavorite = favoriteCocktails.includes(cocktailId);

      if (isFavorite) {
        // 이미 즐겨찾기한 경우, 즐겨찾기 목록에서 제거
        updatedCocktails[cocktailIndex].favorite = false;
        setFavoriteCocktails(favoriteCocktails.filter((id) => id !== cocktailId));
      } else {
        // 즐겨찾기하지 않은 경우, 즐겨찾기 목록에 추가
        updatedCocktails[cocktailIndex].favorite = true;
        setFavoriteCocktails([...favoriteCocktails, cocktailId]);
      }

      // 칵테일 목록 업데이트
      setCocktails(updatedCocktails);
    }
  };

  return (
      <div className="Recipe">
        <div className="headerContainer">
          <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
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
                    style={{fontSize: "20px"}}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <img src={searchImage} alt="검색" onClick={handleSearch}/>
              </div>
              <Link to="/login">
                <button className="detailLogin">로그인</button>
              </Link></div>
          </div>
        </div>
        <div className={`content ${isMenuOpen ? "content-shifted" : ""}`}>

          <div>
            <h2 className="popularTitle">인기 칵테일</h2>
            <div className="more">
              <Link to="/community/{userId}">더보기 {/* 여기서 123은 임의의 사용자 ID */}
                <svg
                    className="arrow"
                    width="7"
                    height="9"
                    viewBox="0 0 12 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.272733 19.774C0.18628 19.7026 0.117689 19.6177 0.0708891 19.5243C0.0240891 19.4308 -2.92581e-08 19.3307 -3.36803e-08 19.2295C-3.81025e-08 19.1283 0.0240891 19.0281 0.0708891 18.9347C0.117689 18.8413 0.18628 18.7564 0.272733 18.6849L10.7573 9.9998L0.272732 1.31466C0.186419 1.24315 0.117952 1.15826 0.0712398 1.06482C0.0245277 0.971388 0.000485209 0.871244 0.000485205 0.770111C0.000485201 0.66898 0.0245277 0.568836 0.0712398 0.475403C0.117952 0.381968 0.186419 0.297071 0.272732 0.225561C0.359044 0.154049 0.461512 0.0973224 0.574285 0.0586204C0.687058 0.0199184 0.807928 -3.53157e-08 0.929993 -4.06513e-08C1.05206 -4.59869e-08 1.17293 0.0199184 1.2857 0.0586204C1.39847 0.0973224 1.50094 0.154049 1.58725 0.225561L12.7273 9.45525C12.8137 9.52669 12.8823 9.61157 12.9291 9.70501C12.9759 9.79845 13 9.89863 13 9.9998C13 10.101 12.9759 10.2011 12.9291 10.2946C12.8823 10.388 12.8137 10.4729 12.7273 10.5443L1.58725 19.774C1.50102 19.8457 1.39858 19.9025 1.28579 19.9413C1.17301 19.98 1.0521 20 0.929994 20C0.807885 20 0.686977 19.98 0.574193 19.9413C0.46141 19.9025 0.358967 19.8457 0.272733 19.774Z"
                      fill="black"
                  />
                </svg>
              </Link>
            </div>
            <div className="popular-cocktails">
              {popularCocktails.map((cocktail, index) => (
                  <Link to={`/recipe/detail/${cocktail.id}`} key={cocktail.id}>
                    <div className="cocktail-item">
                      <span className="cocktail-ranking">{index + 1}위</span>
                      <img src={cocktail.image} alt={cocktail.title}/>
                      <span className="cocktail-title">{cocktail.title}</span>
                      <p className="cocktail-description">{cocktail.description}</p>
                      <div className="cocktail-tastes">
                        {cocktail.tastes.map((taste, index) => (
                            <span key={index} className="cocktail-taste">
                      {taste}
                              {index !== cocktail.tastes.length - 1 && ", "}
                    </span>
                        ))}
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
          <div className="categories-container">
            <div className="category">
              <div>베이스</div>
            </div>
            <div className="categories">
              <label>
                <input
                    type="checkbox"
                    value="Rum"
                    checked={selectedIngredients.includes("Rum")}
                    onChange={handleIngredientChange}
                />
                Rum
              </label>
              <label>
                <input
                    type="checkbox"
                    value="Vodka"
                    checked={selectedIngredients.includes("Vodka")}
                    onChange={handleIngredientChange}
                />
                Vodka
              </label>
              <label>
                <input
                    type="checkbox"
                    value="Gin"
                    checked={selectedIngredients.includes("Gin")}
                    onChange={handleIngredientChange}
                />
                Gin
              </label>
            </div>
          </div>

          <div className="categories-container">
            <div className="category">
              <div>맛</div>
            </div>
            <div className="categories">
              <label>
                <input
                    type="checkbox"
                    value="상큼한 맛"
                    checked={selectedTastes.includes("상큼한 맛")}
                    onChange={handleTasteChange}
                />
                상큼한 맛
              </label>
              <label>
                <input
                    type="checkbox"
                    value="달달한 맛"
                    checked={selectedTastes.includes("달달한 맛")}
                    onChange={handleTasteChange}
                />
                달달한 맛
              </label>
              <label>
                <input
                    type="checkbox"
                    value="부드러운 맛"
                    checked={selectedTastes.includes("부드러운 맛")}
                    onChange={handleTasteChange}
                />
                부드러운 맛
              </label>
              <label>
                <input
                    type="checkbox"
                    value="신 맛"
                    checked={selectedTastes.includes("신 맛")}
                    onChange={handleTasteChange}
                />
                신 맛
              </label>
              <label>
                <input
                    type="checkbox"
                    value="쓴 맛"
                    checked={selectedTastes.includes("쓴 맛")}
                    onChange={handleTasteChange}
                />
                쓴 맛
              </label>
              <label>
                <input
                    type="checkbox"
                    value="짠 맛"
                    checked={selectedTastes.includes("짠 맛")}
                    onChange={handleTasteChange}
                />
                짠 맛
              </label>
              <label>
                <input
                    type="checkbox"
                    value="톡쏘는 맛"
                    checked={selectedTastes.includes("톡쏘는 맛")}
                    onChange={handleTasteChange}
                />
                톡쏘는 맛
              </label>
            </div>
          </div>
          <div className="sort-container">
            <h2 className="categoryCocktail">칵테일 종류</h2>
            <div className="sort-options">
              <label>
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="name">이름 순</option>
                  <option value="popularity">인기 순</option>
                  <option value="newest">최신 순</option>
                </select>
              </label>
            </div>
            <div className="recipe-count-options">
              <label>
                <select value={recipeCount} onChange={handleRecipeCountChange}>
                  <option value={10}>10개</option>
                  <option value={20}>20개</option>
                  <option value={30}>30개</option>
                </select>
              </label>
            </div>
          </div>
          <div className="line"></div>
          <ul className="cocktailBox">
            {displayedCocktails.map((cocktail) => (
                <li key={cocktail.id} className="cocktail-list-item">
                  {/* 칵테일 포스터 */}
                  <img src={cocktail.image} alt={cocktail.title} className="cocktail-poster"/>
                  {/* 칵테일 제목 */}
                  <div className="cocktail-info">
                    <Link to={`/recipe/detail/${cocktail.id}`} className="cocktail-title2">
                      {cocktail.title}
                    </Link>
                    {/* 칵테일 맛 정보 */}
                    <div className="cocktail-tastes">
                      {cocktail.tastes.map((taste, index) => (
                          <span key={index} className="cocktail-taste">
              {taste}
                            {index !== cocktail.tastes.length - 1 && ", "}
            </span>
                      ))}
                    </div>
                  </div>
                  <button
                      className={`favorite-button ${cocktail.favorite ? "favorite" : ""}`}
                      onClick={() => handleFavoriteToggle(cocktail.id)}
                  >
                    즐겨찾기
                  </button>
                </li>
            ))}
            <button className="add-recipe-button" onClick={navigateToAddRecipe}>
              레시피 추가
            </button>
          </ul>
          <div className="pagination-container">
            <button className="pagination" onClick={goToPreviousPage} disabled={currentPage === 1}>
              이전 페이지
            </button>
            {Array.from({length: totalPages}, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`pagination ${currentPage === index + 1 ? "active" : ""}`}
                >
                  {index + 1}
                </button>
            ))}
            <button className="pagination" onClick={goToNextPage} disabled={currentPage === totalPages}>
              다음 페이지
            </button>
          </div>
        </div>
      </div>
  );
};

export default Recipe;