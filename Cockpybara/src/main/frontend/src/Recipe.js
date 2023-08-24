import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import the Link, useLocation, and useNavigate hooks
import pinkTea from "./photo/pinkTea.png";
import "./Recipe.css";

const Recipe = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const navigate = useNavigate();

  useEffect(() => {
    // API를 통해 칵테일 데이터를 가져옵니다.
    // 예시를 위해 데이터를 직접 설정하지만, 실제로는 백엔드 API를 호출하여 데이터를 가져와야 합니다.
    const mockCocktails = [
      {
        id: "1",
        title: "Mojito",
        ingredient: ["Rum", "Lime", "Mint", "Sugar", "Soda Water"],
      },
      {
        id: "2",
        title: "Cosmopolitan",
        ingredient: ["Vodka", "Triple Sec", "Lime Juice", "Cranberry Juice"],
      },
      {
        id: "3",
        title: "Old Fashioned",
        ingredient: ["Bourbon", "Sugar", "Bitters", "Orange Peel"],
      },
      {
        id: "4",
        title: "Martini",
        ingredient: ["Gin", "Dry Vermouth", "Olives"],
      },
    ];
    setCocktails(mockCocktails);
  }, []);

  const popularCocktails = [
    { id: "1", title: "Mojito", image: pinkTea },
    { id: "2", title: "Cosmopolitan", image: pinkTea },
    { id: "3", title: "Old Fashioned", image: pinkTea },
    // Add more popular cocktails here
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
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

  const filteredCocktails = cocktails.filter((cocktail) => {
    // URL 쿼리 파라미터로 검색어가 주어진 경우, 검색 결과만 보여줍니다.
    if (searchQuery && searchQuery.trim() !== "") {
      return cocktail.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      // 검색어가 주어지지 않은 경우, 모든 칵테일을 보여줍니다.
      if (selectedIngredients.length === 0) {
        return true; // If no ingredients are selected, show all cocktails
      } else {
        return cocktail.ingredient.some((ingredient) =>
          selectedIngredients.includes(ingredient)
        );
      }
    }
  });

  return (
    <div>
      <h1>칵테일 레시피</h1>
      <div>
        <h2>인기 칵테일</h2>
        <div>더보기</div>
        <div className="popular-cocktails">
    {popularCocktails.map((cocktail, index) => (
      <Link to={`/recipe/detail/${cocktail.id}`} key={cocktail.id}>
        <div className="cocktail-item">
          <span className="cocktail-ranking">{index + 1}위</span>
          <img src={cocktail.image} alt={cocktail.title} />
          <span className="cocktail-title">{cocktail.title}</span>
        </div>
      </Link>
    ))}
  </div>
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="칵테일 검색"
      />
      <button onClick={handleSearch}>검색</button>
      <div>
      <div className="categories">
  <div className="category">
        <div>알콜 유무</div>
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
      </div>
      <div>
      <div className="categories">
  <div className="category">
        <div>재료</div>
        <label>
          <input
            type="checkbox"
            value="LIQUID"
            checked={selectedIngredients.includes("LIQUID")}
            onChange={handleIngredientChange}
          />
          LIQUID
        </label>
        <label>
          <input
            type="checkbox"
            value="SYRUP"
            checked={selectedIngredients.includes("SYRUP")}
            onChange={handleIngredientChange}
          />
          SYRUP
        </label>
        <label>
          <input
            type="checkbox"
            value="FRUIT"
            checked={selectedIngredients.includes("FRUIT")}
            onChange={handleIngredientChange}
          />
          FRUIT
        </label>
        <label>
          <input
            type="checkbox"
            value="ETC"
            checked={selectedIngredients.includes("ETC")}
            onChange={handleIngredientChange}
          />
          ETC
        </label>
      </div>
      <div>
        </div>
        </div>
      <div className="categories">
  <div className="category">
        <div>맛</div>
        <label>
          <input
            type="checkbox"
            value="REFRESH"
            checked={selectedIngredients.includes("REFRESH")}
            onChange={handleIngredientChange}
          />
          상큼한 맛
        </label>
        <label>
          <input
            type="checkbox"
            value="SWEET"
            checked={selectedIngredients.includes("SWEET")}
            onChange={handleIngredientChange}
          />
          달달한 맛
        </label>
        <label>
          <input
            type="checkbox"
            value="SOFT"
            checked={selectedIngredients.includes("SOFT")}
            onChange={handleIngredientChange}
          />
          부드러운 맛
        </label>
        <label>
          <input
            type="checkbox"
            value="SOUR"
            checked={selectedIngredients.includes("SOUR")}
            onChange={handleIngredientChange}
          />
          새콤한 맛
        </label>
        <label>
          <input
            type="checkbox"
            value="BITTER"
            checked={selectedIngredients.includes("BITTER")}
            onChange={handleIngredientChange}
          />
          쓴 맛
        </label>
        <label>
          <input
            type="checkbox"
            value="SALTY"
            checked={selectedIngredients.includes("SALTY")}
            onChange={handleIngredientChange}
          />
          짠 맛
        </label>
        <label>
          <input
            type="checkbox"
            value="SPARKING"
            checked={selectedIngredients.includes("SPARKING")}
            onChange={handleIngredientChange}
          />
          톡쏘는 맛
        </label>
        </div>
        </div>
        </div>
    </div>
      </div>
      <h2>칵테일 종류</h2>
      <ul>
        {filteredCocktails.map((cocktail) => (
          <li key={cocktail.title}>
            {/* Update Link to pass the cocktail ID */}
            <Link to={`/recipe/detail/${cocktail.id}`}>{cocktail.title}</Link>
            <ul>
              {cocktail.ingredient.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={navigateToAddRecipe}>레시피 추가</button>{" "}
      {/* 버튼 추가 */}
    </div>
  );
};

export default Recipe;
