import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MonthlyPopularSection.css';
import Clicked from "./photo/Clicked.png";
import UnClicked from "./photo/UnClicked.png";
import arrow from "./photo/arrow.png";

const MonthlyPopularSection = () => {
  const [popularData, setPopularData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const period = 'monthly'; // You can customize the period here (e.g., 'weekly', 'monthly', 'yearly')
        const response = await fetch(`/community/period-cocktails?period=${period}`);
        const data = await response.json();
  
        // Sort the data by rank or any other popularity metric
        const sortedData = data.sort((a, b) => a.rank - b.rank);
  
        setPopularData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDataFromBackend();
  }, []);
  
  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  const rankToDisplay = (rank) => {
    return `${rank}.`;
  };

  const renderData = () => {
    const startIndex = (selectedButton - 1) * 5;
    const endIndex = startIndex + 5;
    const dataToDisplay = popularData.slice(startIndex, endIndex);

    return (
      <ul id="rank-name">
        {dataToDisplay.map((item) => (
          <li key={item.id}>
            <div className="rank-box">
              <Link to={`/recipe/detail/${item.id}`}>
                <div className="item-container">
                  <div className="rank-image-and-title">
                    <span className="rank">{rankToDisplay(item.id)}</span>
                    <img className="middle-image" src={item.drinkImgPath} alt="이미지" />
                    <span className="cocktail-title">{item.name}</span>
                  </div>
                  <img className="arrow-image" src={arrow} alt="상세 보기" />
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="MonthlyPopular-box">
      <div className="MonthlyPopular-serve">
        <p id="MonthlyPopular-title">월간 인기</p>
        <div className="rank-box">
          {renderData()}
          <div className="rank-button-box">
            {[1, 2, 3].map((buttonNumber) => (
              <button
                key={buttonNumber}
                className={selectedButton === buttonNumber ? 'selected' : ''}
                onClick={() => handleButtonClick(buttonNumber)}
              >
                <img src={selectedButton === buttonNumber ? Clicked : UnClicked} alt="Image" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPopularSection;
