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
      id: "1",
      title: "Mojito",
      image:  image1,
      description: "A refreshing cocktail with rum, lime, mint, and soda water.",
      ingredient: ["Rum", "Lime", "Mint", "Sugar", "Soda Water"],
      tastes: ["신 맛", "달달한 맛", "짠 맛"],
      popularity: 5,
      date: "2023-09-07",
    },
    {
      id: "2",
      title: "Cosmopolitan",
      image: image1,
      description: "A classic cocktail with vodka, triple sec, and cranberry juice.",
      ingredient: ["Vodka", "Triple Sec", "Lime Juice", "Cranberry Juice"],
      tastes: ["짠 맛"],
      popularity: 3,
      date: "2023-09-06",
    },
    {
      id: "3",
      title: "Old Fashioned",
      image: image1,
      description: "A timeless cocktail with bourbon, sugar, and bitters.",
      ingredient: ["Bourbon", "Sugar", "Bitters", "Orange Peel"],
      tastes: ["달달한 맛"],
      popularity: 4,
      date: "2023-09-05",
    },
    {
      id: "4",
      title: "Martini",
      image: image1,
      description: "A classic cocktail with gin, dry vermouth, and olives.",
      ingredient: ["Gin", "Dry Vermouth", "Olives"],
      tastes: ["달달한 맛"],
      popularity: 2,
      date: "2023-09-04",
    },
    {
      id: "5",
      title: "Daiquiri",
      image: image1,
      description: "A classic cocktail with rum, lime juice, and simple syrup.",
      ingredient: ["Rum", "Lime Juice", "Simple Syrup"],
      tastes: ["신 맛", "짠 맛"],
      popularity: 4,
      date: "2023-09-24",
    },
    {
      id: "6",
      title: "Piña Colada",
      image: image1,
      description: "A tropical cocktail with rum, coconut cream, and pineapple juice.",
      ingredient: ["Rum", "Coconut Cream", "Pineapple Juice"],
      tastes: ["달달한 맛", "짠 맛"],
      popularity: 3,
      date: "2023-09-24",
    },
    {
      id: "7",
      title: "Negroni",
      image: image1,
      description: "A classic cocktail with gin, Campari, and sweet vermouth.",
      ingredient: ["Gin", "Campari", "Sweet Vermouth"],
      tastes: ["신 맛", "짠 맛"],
      popularity: 5,
      date: "2023-09-24",
    },
    {
      id: "8",
      title: "Whiskey Sour",
      image: image1,
      description: "A whiskey-based cocktail with lemon juice and simple syrup.",
      ingredient: ["Bourbon", "Lemon Juice", "Simple Syrup"],
      tastes: ["달달한 맛", "짠 맛"],
      popularity: 2,
      date: "2023-09-24",
    },
    {
      id: "9",
      title: "Mojito",
      image: image1,
      description: "A refreshing cocktail with rum, lime, mint, and soda water.",
      ingredient: ["Rum", "Lime", "Mint", "Sugar", "Soda Water"],
      tastes: ["신 맛", "달달한 맛", "짠 맛"],
      popularity: 1,
      date: "2023-09-24",
    },
    {
      id: "10",
      title: "Blue Lagoon",
      image: image1,
      description: "A vibrant blue cocktail with vodka, blue curaçao, and lemonade.",
      ingredient: ["Vodka", "Blue Curaçao", "Lemonade"],
      tastes: ["신 맛", "달달한 맛"],
      popularity: 4,
      date: "2023-09-24",
    },
    {
      id: "11",
      title: "Tequila Sunrise",
      image: image1,
      description: "A colorful cocktail with tequila, orange juice, and grenadine syrup.",
      ingredient: ["Tequila", "Orange Juice", "Grenadine Syrup"],
      tastes: ["신 맛", "달달한 맛"],
      popularity: 3,
      date: "2023-09-24",
    },
    {
      id: "12",
      title: "Sazerac",
      image: image1,
      description: "A classic New Orleans cocktail with rye whiskey and absinthe.",
      ingredient: ["Rye Whiskey", "Absinthe", "Sugar Cube", "Peychaud's Bitters"],
      tastes: ["달달한 맛", "신 맛", "짠 맛"],
      popularity: 5,
      date: "2023-09-24",
    },
    {
      id: "13",
      title: "Gin and Tonic",
      image: image1,
      description: "A simple and refreshing cocktail with gin and tonic water.",
      ingredient: ["Gin", "Tonic Water", "Lime Wedge"],
      tastes: ["짠 맛"],
      popularity: 4,
      date: "2023-09-24",
    },
    {
      id: "14",
      title: "Mai Tai",
      image: image1,
      description: "A tropical cocktail with light and dark rum, lime, and orgeat syrup.",
      ingredient: ["Light Rum", "Dark Rum", "Lime Juice", "Orgeat Syrup"],
      tastes: ["달달한 맛", "신 맛"],
      popularity: 3,
      date: "2023-09-24",
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
                    <img className="middle-image" src={item.image} alt="이미지" />
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
