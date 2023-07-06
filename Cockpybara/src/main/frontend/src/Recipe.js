import React, { useState } from 'react';

const Recipe = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cocktails, setCocktails] = useState([
    { name: 'Mojito', ingredients: ['Rum', 'Lime', 'Mint', 'Sugar', 'Soda Water'] },
    { name: 'Cosmopolitan', ingredients: ['Vodka', 'Triple Sec', 'Lime Juice', 'Cranberry Juice'] },
    { name: 'Old Fashioned', ingredients: ['Bourbon', 'Sugar', 'Bitters', 'Orange Peel'] },
    { name: 'Martini', ingredients: ['Gin', 'Dry Vermouth', 'Olives'] },
  ]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIngredients([...selectedIngredients, value]);
    } else {
      setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== value));
    }
  };

  const filteredCocktails = cocktails.filter(cocktail => {
    if (selectedIngredients.length === 0) {
      return true; // If no ingredients are selected, show all cocktails
    } else {
      return cocktail.ingredients.some(ingredient => selectedIngredients.includes(ingredient));
    }
  }).filter(cocktail => cocktail.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div>
      <h1>칵테일 레시피</h1>
      <input type="text" value={searchValue} onChange={handleSearchChange} placeholder="칵테일 검색" />
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
        {/* Add more ingredient checkboxes as needed */}
      </div>
      <ul>
        {filteredCocktails.map(cocktail => (
          <li key={cocktail.name}>
            <h3>{cocktail.name}</h3>
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
