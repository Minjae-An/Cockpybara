import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import the Link, useLocation, and useNavigate hooks

const Recipe = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');
  const navigate = useNavigate();


  useEffect(() => {
    // API를 통해 칵테일 데이터를 가져옵니다.
    // 예시를 위해 데이터를 직접 설정하지만, 실제로는 백엔드 API를 호출하여 데이터를 가져와야 합니다.
    const mockCocktails = [
      { id: '1', name: 'Mojito', ingredients: ['Rum', 'Lime', 'Mint', 'Sugar', 'Soda Water'] },
      { id: '2', name: 'Cosmopolitan', ingredients: ['Vodka', 'Triple Sec', 'Lime Juice', 'Cranberry Juice'] },
      { id: '3', name: 'Old Fashioned', ingredients: ['Bourbon', 'Sugar', 'Bitters', 'Orange Peel'] },
      { id: '4', name: 'Martini', ingredients: ['Gin', 'Dry Vermouth', 'Olives'] },
    ];
    setCocktails(mockCocktails);
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIngredients([...selectedIngredients, value]);
    } else {
      setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient !== value));
    }
  };

  const handleSearch = () => {
    // 현재 검색어를 정리합니다.
    const trimmedSearchValue = searchValue.trim();

    // 검색어가 비어있으면 URL 파라미터에서 검색어를 제거하고 해당 페이지로 이동합니다.
    if (trimmedSearchValue === '') {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete('search');
      navigate(`/recipe?${queryParams.toString()}`);
    } else {
      // 검색어가 있는 경우, URL 파라미터에 검색어를 추가하고 해당 페이지로 이동합니다.
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('search', trimmedSearchValue);
      navigate(`/recipe?${queryParams.toString()}`);
    }
  };


  const filteredCocktails = cocktails.filter((cocktail) => {
    // URL 쿼리 파라미터로 검색어가 주어진 경우, 검색 결과만 보여줍니다.
    if (searchQuery && searchQuery.trim() !== '') {
      return cocktail.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      // 검색어가 주어지지 않은 경우, 모든 칵테일을 보여줍니다.
      if (selectedIngredients.length === 0) {
        return true; // If no ingredients are selected, show all cocktails
      } else {
        return cocktail.ingredients.some((ingredient) => selectedIngredients.includes(ingredient));
      }
    }
  });

  return (
    <div>
      <h1>칵테일 레시피</h1>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="칵테일 검색"
      />
      <button onClick={handleSearch}>검색</button>
      <div>
        <h3>재료 선택</h3>
        <label>
          <input type="checkbox" value="Rum" checked={selectedIngredients.includes('Rum')} onChange={handleIngredientChange} />
          Rum
        </label>
        <label>
          <input type="checkbox" value="Vodka" checked={selectedIngredients.includes('Vodka')} onChange={handleIngredientChange} />
          Vodka
        </label>
        <label>
          <input type="checkbox" value="Gin" checked={selectedIngredients.includes('Gin')} onChange={handleIngredientChange} />
          Gin
        </label>
      </div>
      <ul>
        {filteredCocktails.map(cocktail => (
          <li key={cocktail.name}>
            {/* Update Link to pass the cocktail ID */}
            <Link to={`/recipe/detail/${cocktail.id}`}>{cocktail.name}</Link>
            <ul>
              {cocktail.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;