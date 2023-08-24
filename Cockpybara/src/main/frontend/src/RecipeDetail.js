import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { state } = useLocation(); // 전달된 상태를 가져옴

  const [commentPopupVisible, setCommentPopupVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [taste, setTaste] = useState('');
  const [overallReview, setOverallReview] = useState('');
  const [comments, setComments] = useState([]);

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
    console.log('Submitted Comment:', {
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
    setComment('');
    setRating(0);
    setTaste('');
    setOverallReview('');
    setCommentPopupVisible(false);
  };

  // Get the cocktailId from the URL parameter
  const { cocktailId } = useParams();

  // Sample dummy cocktail data for demonstration
  const dummyCocktails = [
    { id: 1, title: 'Mojito', explan: 'Refreshing cocktail', ingredient: ['Rum', 'Lime', 'Mint', 'Sugar', 'Soda Water'], step: 'Mix all ingredients...', flavors: ['Sweet', 'Sour', 'Minty'] },
    { id: 2, title: 'Cosmopolitan', explan: 'Classic cocktail', ingredient: ['Vodka', 'Triple Sec', 'Lime Juice', 'Cranberry Juice'], step: 'Combine all ingredients...', flavors: ['Tart', 'Fruity'] },
    { id: 3, title: 'Old Fashioned', explan: 'Classic cocktail with a twist', ingredient: ['Bourbon', 'Angostura Bitters', 'Sugar Cube', 'Orange Peel'], step: 'Muddle sugar and bitters, add bourbon, stir, add ice and garnish', flavors: ['Strong', 'Bitter', 'Citrusy'] },
];
  const selectedCocktail = dummyCocktails.find(cocktail => cocktail.id === parseInt(cocktailId));
  
  console.log("Selected Cocktail:", selectedCocktail); // 선택된 칵테일 로깅
  console.log("Recipe Detail:", state); // 전달된 레시피 디테일 로깅

  // Render the cocktail details
  
  return (
    <div>
      {selectedCocktail ? (
        <div>
          <h2>제목 :{selectedCocktail.title}</h2>
          <p>칵테일 ID: {cocktailId}</p>
          <p>설명: {selectedCocktail.explan}</p>
          <p>재료: {selectedCocktail.ingredient.join(', ')}</p>
          <p>단계: {selectedCocktail.step}</p>
          <p>맛: {selectedCocktail.flavors.join(', ')}</p>
        </div>
      ) : (
        <div>
          <h2>제목: {state.title}</h2>
          <p>칵테일 ID: {state.cocktailId}</p>
          <p>설명: {state.explan}</p>
          <p>재료: {state.ingredient}</p>
          <p>단계: {state.step}</p>
          <p>맛: {state.flavors.join(', ')}</p>
        </div>
      )}
     <div>
        <button onClick={handleCommentPopupToggle}>코멘트 추가</button>
      </div>

      {commentPopupVisible && (
        <div>
          <h3>코멘트 추가</h3>
          <div>
            <label>별점 (1-5): </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
            />
          </div>
          <div>
            <label>칵테일 총평: </label>
            <textarea
              value={overallReview}
              onChange={handleOverallReviewChange}
              rows={4}
            />
          </div>
          <div>
            <label>맛 정보: </label>
            <input
              type="text"
              value={taste}
              onChange={handleTasteChange}
            />
          </div>
          <button onClick={handleCommentSubmit}>코멘트 등록</button>
        </div>
      )}

      <div>
        <h3>코멘트 목록</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>별점: {comment.rating}</p>
              <p>칵테일 총평: {comment.overallReview}</p>
              <p>맛 정보: {comment.taste}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetail;