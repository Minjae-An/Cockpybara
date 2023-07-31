import React, { useState, useEffect } from 'react';
import './MainMain.css';
import Cock1 from "./photo/Cock1.png";
import Cock2 from "./photo/Cock2.png";
import Cock3 from "./photo/Cock3.png";

const MainMain = () => {
  // 이미지 목록을 배열로 정의합니다.
  const images = [Cock1, Cock2, Cock3];

  // 이미지에 맞는 제목과 내용을 배열로 정의합니다.
  const contents = [
    {
      title: 'Daiquiri',
      description: `라임 주스와 바카디 럼으로 만들어진 칵테일의 비밀.
      세계적인 작가 어니스트 헤밍웨이가 사랑한 2가지의 칵테일로 알려져 있다.`,
    },
    {
      title: 'Screwdriver',
      description: `보드카 베이스의 칵테일. 칵테일하면 떠오르는 대표 주자 중 하나이다.
      이름의 유래와는 무관하게 스크루드라이버에서 스크루(screw)는 오렌지 주스를, 드라이버(driver)는 보드카를 지칭하는 것으로 통용되기도 한다.`,
    },
    {
      title: 'Long Island Iced Tea',
      description: `칵테일의 고전이자 매우 유명한 레시피다.
      외양과 맛이 아이스 티와 비슷해서 이러한 이름이 붙었다.
      시원한 맛이 일품이므로 더운 여름에 마시면 좋다.`,
    }
  ];
  

  // 현재 보여지고 있는 이미지의 인덱스를 상태로 관리합니다.
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 3초마다 이미지를 변경하는 함수를 정의합니다.
  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 컴포넌트가 마운트될 때마다 3초마다 이미지를 변경하는 이벤트를 등록합니다.
  useEffect(() => {
    const interval = setInterval(changeImage, 3000);

    // 컴포넌트가 언마운트될 때 이벤트를 해제합니다.
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Cock1">
      <div className="image-slider">
        <div className="image-container">
          {/* 이미지를 표시하는 부분 */}
          <img src={images[currentImageIndex]} alt={`Cocktail ${currentImageIndex + 1}`} />
        </div>
        <div className="Cock1-text-box">
          <div className="Cock1-title" style={{ fontFamily: 'Poller One, sans-serif' }}>
            {contents[currentImageIndex].title}
          </div>
          <div className="Cock1-contents">
            {contents[currentImageIndex].description}
          </div>
          <div className="go-button"></div>
        </div>
      </div>
    </div>
  );
};

export default MainMain;
