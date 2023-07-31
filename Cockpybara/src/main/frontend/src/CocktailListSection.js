// CocktailListSection.js
import React, { useState, useEffect } from 'react';

const CocktailListSection = () => {
  const [cocktailList, setCocktailList] = useState([]);

  useEffect(() => {
    // 더미 데이터를 사용하여 프론트에서 확인할 수 있도록 함
    const dummyData = [
      { id: 1, name: 'Mojito', description: 'Refreshing cocktail with mint and lime', taste: 'Sweet', recommended: true },
      { id: 2, name: 'Cosmopolitan', description: 'Classic cocktail with vodka and cranberry juice', taste: 'Sour', recommended: true },
      { id: 3, name: 'Martini', description: 'Sophisticated cocktail with gin and vermouth', taste: 'Dry', recommended: false },
      // 더 많은 칵테일들...
    ];
    setCocktailList(dummyData);
  }, []);

  // 추천 상태 변경 함수
  const toggleRecommendation = (id) => {
    setCocktailList((prevCocktails) =>
      prevCocktails.map((cocktail) =>
        cocktail.id === id ? { ...cocktail, recommended: !cocktail.recommended } : cocktail
      )
    );
  };

  return (
    <div style={{ backgroundColor: 'lightgreen' }}>
      <h2>칵테일 나열</h2>
      <ul>
        {cocktailList.map((cocktail) => (
          <li key={cocktail.id}>
            <h3>{cocktail.name}</h3>
            <p>{cocktail.description}</p>
            <p>Taste: {cocktail.taste}</p>
            <p>Recommended: {cocktail.recommended ? 'Yes' : 'No'}</p>
            {/* 추천 유무에 따른 버튼 표시 */}
            <button onClick={() => toggleRecommendation(cocktail.id)}>
              {cocktail.recommended ? '추천 취소' : '추천하기'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CocktailListSection;
