import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MonthlyPopularSection.css';
import Clicked from "./photo/Clicked.png";
import UnClicked from "./photo/UnClicked.png";
import arrow from "./photo/arrow.png";
import image1 from "./photo/image1.png";

const MonthlyPopularSection = () => {
  const [popularData, setPopularData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);

  useEffect(() => {
    // TODO: 실제 백엔드 API URL로 변경
    // const backendApiUrl = 'https://example.com/api/monthly-popular';

    // fetch(backendApiUrl)
    //   .then(response => response.json())
    //   .then(data => setPopularData(data))
    //   .catch(error => console.error('Error fetching data:', error));

    // 임시 데이터 (테스트용)
    const dummyData = [
      { title: 'Mojito', rank: 1 },
      { title: 'Cosmopolitan', rank: 2 },
      { title: 'Martini', rank: 3 },
      { title: 'Daiquiri', rank: 4 },
      { title: 'Old Fashioned', rank: 5 },
      { title: 'Pina Colada', rank: 6 },
      { title: 'Margarita', rank: 7 },
      { title: 'Negroni', rank: 8 },
      { title: 'White Russian', rank: 9 },
      { title: 'Whiskey Sour', rank: 10 },
      { title: 'Piña Colada', rank: 11 },
      { title: 'Mai Tai', rank: 12 },
      { title: 'Mint Julep', rank: 13 },
      { title: 'Espresso Martini', rank: 14 },
      { title: 'Moscow Mule', rank: 15 },
    ];

    setPopularData(dummyData);
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
          <li key={item.title}>
            <div className="rank-box">
              <Link to={`/recipe/detail/${item.rank}`}>
                <div className="item-container">
                  <div className="rank-image-and-title">
                    <span className="rank">{rankToDisplay(item.rank)}</span>
                    <img className="middle-image" src={image1} alt="이미지" />
                    <span className="cocktail-title">{item.title}</span>
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
