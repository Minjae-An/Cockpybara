import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipeDetail = () => {
  const location = useLocation();

  // 폼 데이터를 location.state에서 추출합니다.
  const { title, explan, ingredient, step, flavors } = location.state;

  return (
    <div>
      <h2>{title}</h2>
      <p>설명: {explan}</p>
      <p>재료: {ingredient}</p>
      <p>단계: {step}</p>
      <p>맛: {flavors.join(', ')}</p>
    </div>
  );
};

export default RecipeDetail;