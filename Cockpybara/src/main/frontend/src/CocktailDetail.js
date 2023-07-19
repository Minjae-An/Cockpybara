import React from 'react';
import { useParams } from 'react-router-dom';

const CocktailDetail = () => {
  const { cocktailId } = useParams();

  // For simplicity, we'll use the mock data here. In a real-world app, you would fetch data from an API.
  const mockCocktails = [
    { id: '1', name: 'Mojito', ingredients: ['Rum', 'Lime', 'Mint', 'Sugar', 'Soda Water'] },
    { id: '2', name: 'Cosmopolitan', ingredients: ['Vodka', 'Triple Sec', 'Lime Juice', 'Cranberry Juice'] },
    { id: '3', name: 'Old Fashioned', ingredients: ['Bourbon', 'Sugar', 'Bitters', 'Orange Peel'] },
    { id: '4', name: 'Martini', ingredients: ['Gin', 'Dry Vermouth', 'Olives'] },
  ];

  // Find the selected cocktail by its ID
  const selectedCocktail = mockCocktails.find(cocktail => cocktail.id === cocktailId);

  if (!selectedCocktail) {
    return <div>Sorry, the cocktail details for ID {cocktailId} were not found.</div>;
  }

  return (
    <div>
      <h2>{selectedCocktail.name}</h2>
      <ul>
        {selectedCocktail.ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default CocktailDetail;
