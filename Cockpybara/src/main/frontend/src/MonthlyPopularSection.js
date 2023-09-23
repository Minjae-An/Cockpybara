import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MonthlyPopularSection.css';
import Clicked from "./photo/Clicked.png";
import UnClicked from "./photo/UnClicked.png";
import arrow from "./photo/arrow.png";
import image1 from "./photo/image1.png"; 

const MonthlyPopularSection = () => {
  const [popularData, setPopularData] = useState([
    {
      id: 1,
      drinkImgPath: image1,
      name: 'Mojito',
      likes: 10
    },
    {
      id: 2,
      drinkImgPath: image1,
      name: 'Pina Colada',
      likes: 8
    },
    {
      id: 3,
      drinkImgPath: image1,
      name: 'Martini',
      likes: 12
    },
    {
      id: 4,
      drinkImgPath: image1,
      name: 'Cosmopolitan',
      likes: 15
    },
    {
      id: 5,
      drinkImgPath: image1,
      name: 'Bloody Mary',
      likes: 13
    },
    {
      id: 6,
      drinkImgPath: image1,
      name: 'Old Fashioned',
      likes: 11
    },
    {
      id: 7,
      drinkImgPath: image1,
      name: 'Margarita',
      likes: 9
    },
    {
      id: 8,
      drinkImgPath: image1,
      name: 'Daiquiri',
      likes: 14
    },
    {
      id: 9,
      drinkImgPath: image1,
      name: 'Moscow Mule',
      likes: 12
    },
    {
      id: 10,
      drinkImgPath: image1,
      name: 'Whiskey Sour',
      likes: 10
    },
    {
      id: 11,
      drinkImgPath: image1,
      name: 'Tequila Sunrise',
      likes: 9
    },
    {
      id: 12,
      drinkImgPath: image1,
      name: 'Gin and Tonic',
      likes: 11
    },
    {
      id: 13,
      drinkImgPath: image1,
      name: 'Manhattan',
      likes: 13
    },
    {
      id: 14,
      drinkImgPath: image1,
      name: 'Blue Lagoon',
      likes: 8
    },
    {
      id: 15,
      drinkImgPath: image1,
      name: 'Singapore Sling',
      likes: 10
    },
  ]);

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  const rankToDisplay = (rank) => {
    return `${rank}.`;
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPopularData(prevData => {
  //       const newData = [...prevData].sort(() => Math.random() - 0.5);
  //       return newData;
  //     });
  //   }, 10000); // 30초마다 실행

  //   return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 타이머 해제
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPopularData(prevData => {
        const newData = prevData.map(item => {
          if (item.id === selectedButton * 5) {
            return {
              ...item,
              name: item.name // 현재 이름을 그대로 반환합니다.
            };
          }
          return item;
        });
        return newData;
      });
    }, 10000);
  
    return () => clearInterval(interval);
  }, [selectedButton]);
  

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
