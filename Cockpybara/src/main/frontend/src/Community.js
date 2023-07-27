import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Community = () => {
  const navigate = useNavigate();


  const handleMyPageButtonClick = () => {
    // Navigate to the MyPage component when the button is clicked
    navigate('/user/{userId}/my-page');
  };

  

  return (
    <div>
      <div style={{ backgroundColor: 'skyblue' }}>
        <h2>MY 커뮤니티</h2>
        
        <button onClick={handleMyPageButtonClick}>마이 페이지로 이동</button>
      </div>
      <div style={{ backgroundColor: 'pink' }}>
        <h2>월간 인기</h2>
      </div>
      <div style={{ backgroundColor: 'lightgreen' }}>
        <h2>칵테일 나열</h2>
      </div>
    </div>
  );
};

export default Community;
