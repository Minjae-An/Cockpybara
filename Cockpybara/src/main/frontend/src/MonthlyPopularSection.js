// MonthlyPopularSection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MonthlyPopularSection.css'
import Clicked from "./photo/Clicked.png";
import UnClicked from "./photo/UnClicked.png";
import arrow from "./photo/arrow.png";


const MonthlyPopularSection = () => {
  const [popularData, setPopularData] = useState([]);
  const [rankStart, setRankStart] = useState(1);

  useEffect(() => {
    const dummyData = [
      { id: 1, title: 'Mojito', rank: 1 },
      { id: 2, title: 'Cosmopolitan', rank: 2 },
      { id: 3, title: 'Martini', rank: 3 },
      { id: 4, title: 'Daiquiri', rank: 4 },
      { id: 5, title: 'Old Fashioned', rank: 5 },
      { id: 6, title: 'Pina Colada', rank: 6 },
      { id: 7, title: 'Margarita', rank: 7 },
      { id: 8, title: 'Negroni', rank: 8 },
      { id: 9, title: 'White Russian', rank: 9 },
      { id: 10, title: 'Whiskey Sour', rank: 10 },
      { id: 11, title: 'Piña Colada', rank: 11 },
      { id: 12, title: 'Mai Tai', rank: 12 },
      { id: 13, title: 'Mint Julep', rank: 13 },
      { id: 14, title: 'Espresso Martini', rank: 14 },
      { id: 15, title: 'Moscow Mule', rank: 15 },
    ];
    setPopularData(dummyData);

 

    // 5초마다 더미 데이터를 업데이트하는 시뮬레이션
    const intervalId = setInterval(() => {
      setPopularData((prevData) => {
        return prevData.map((item) => ({
          ...item,
          rank: item.rank < 15 ? item.rank + 1 : 1 // 랭킹이 15위 이하인 경우에는 1 증가시키고, 15위를 넘으면 다시 1로 시작
        }));
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const changeRankRange = (start) => {
    setRankStart(start);
  };
  // 버튼의 선택 상태를 관리하는 상태 변수
  const [selectedButton, setSelectedButton] = useState(1);

  // 버튼 클릭 시 선택 상태 변경
  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
    setRankStart(buttonNumber);
  };
  // 각 랭킹 범위에 해당하는 칵테일 정보 필터링
  const filteredData = popularData.filter(
    (item) => item.rank >= rankStart && item.rank <= rankStart + 4
  );


  return (
    <div className="MonthlyPopular-box">
      <div className="MonthlyPopular-serve">
        <p id="MonthlyPopular-title">월간 인기</p>
        <div className="rank-box">
          <ul id="rank-name">
            {filteredData.map((item) => (
              <li key={item.id}>
                <div className="rank-box">
                  <Link to={`/cocktails/${item.id}`}>
                    <div className="item-container">
                      <span className="cocktail-title">{item.rank}. {item.title}</span>
                      <img className="arrow-image" src={arrow} alt="상세 보기" />
                      
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="rank-button-box">
            <button className={selectedButton === 1 ? 'selected' : ''} onClick={() => handleButtonClick(1)}>
              <img src={selectedButton === 1 ? Clicked : UnClicked} alt="Image" />
            </button>
            <button className={selectedButton === 6 ? 'selected' : ''} onClick={() => handleButtonClick(6)}>
              <img src={selectedButton === 6 ? Clicked : UnClicked} alt="Image" />
            </button>
            <button className={selectedButton === 11 ? 'selected' : ''} onClick={() => handleButtonClick(11)}>
              <img src={selectedButton === 11 ? Clicked : UnClicked} alt="Image" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPopularSection;
