// CocktailListSection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CocktailListSection.css';
import image1 from "./photo/image1.png";
import pinkTea from "./photo/pinkTea.png";
import good from "./photo/good.png";
import chat from "./photo/chat.png";
import axios from 'axios'; 

const CocktailListSection = () => {
  const [cocktailList, setCocktailList] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedButton, setSelectedButton] = useState('recommended');
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [userData, setUserData] = useState({ username: '' }); // 초기값을 비워둡니다.


  const handleCommentButtonClick = () => {
    setShowCommentPopup(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/community/period-cocktails');
        setCocktailList(response.data);
      } catch (error) {
        console.error('Error fetching cocktail data:', error);
      }
    };

    const fetchCocktailData = async () => {
      try {
        const response = await axios.get('/community/period-cocktails');
        setCocktailList(response.data);
      } catch (error) {
        console.error('Error fetching cocktail data:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/community'); // 백엔드 API에서 사용자 데이터를 가져옵니다.
        setUserData({ username: response.data.username }); // 사용자 데이터를 업데이트합니다.
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); 
    fetchCocktailData();

    // 더미 데이터를 사용하여 프론트에서 확인할 수 있도록 함
    // const dummyData = [
    //   { id: 1, name: 'Mojito', description: 'Refreshing cocktail with mint and lime', taste: 'Sweet', recommended: true },
    //   { id: 2, name: 'Cosmopolitan', description: 'Classic cocktail with vodka and cranberry juice', taste: 'Sour', recommended: true },
    //   { id: 3, name: 'Martini', description: 'Sophisticated cocktail with gin and vermouth', taste: 'Dry', recommended: false },
    //   // 더 많은 칵테일들...
    // ];
    // setCocktailList(dummyData);
  }, []);

  // 추천 상태 변경 함수
  const toggleRecommendation = (id) => {
    setCocktailList((prevCocktails) =>
      prevCocktails.map((cocktail) =>
        cocktail.id === id ? { ...cocktail, recommended: !cocktail.recommended } : cocktail
      )
    );
  };

  const handleSortByClick = (sortType) => {
    setSortBy(sortType);
    setSelectedButton(sortType);

    if (sortType === 'alphabetical') {
      // 가나다순으로 정렬하는 로직을 추가합니다.
      setCocktailList(prevCocktails =>
        prevCocktails.slice().sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };
  
  const filterCocktails = () => {
    let filteredCocktails = cocktailList;

    // 필터링 로직을 적용합니다.
    if (sortBy === 'popular') {
      filteredCocktails = filteredCocktails.filter(cocktail => cocktail.recommended);
    } else if (sortBy === 'latest') {
      // 최신순 필터링 로직 추가
      filteredCocktails = filteredCocktails.sort((a, b) => b.id - a.id); // 가장 높은 ID 값부터 정렬
    } else if (sortBy === 'alphabetical') {
      // 가나다순 필터링 로직 추가
      filteredCocktails = filteredCocktails.sort((a, b) => a.name.localeCompare(b.name)); // 이름순으로 정렬
    }

    // 최대 3개만 표시
    return filteredCocktails.slice(0, 3);
  };

  const getTimeAgo = (postedTime) => {
    const now = new Date();
    const diffInMillis = now - new Date(postedTime);
    const minutes = Math.floor(diffInMillis / (1000 * 60));
    return `${minutes}분`;
  };

  // API 호출로 데이터를 가져오는 부분을 주석처리해둡니다.
  // fetchCocktailData(); // 가정: API를 호출하여 데이터를 가져오는 함수

  // const fetchCocktailData = async () => {
  //   try {
  //     const response = await fetch('your-api-url-here'); // API의 실제 URL을 입력하세요
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     setCocktailList(data); // 가져온 데이터를 상태로 업데이트
  //   } catch (error) {
  //     console.error('Error fetching cocktail data:', error);
  //   }
  // };

  const handleRecommendationToggle = async (cocktailId) => {
    try {
      // 백엔드에 추천 상태를 업데이트하는 요청을 보냅니다.
      // (실제 백엔드와 연결할 때는 주석 해제하고 사용하시면 됩니다)
      // const response = await fetch(`/api/updateRecommendation/${cocktailId}`, {
      //   method: 'POST',
      //   // 필요한 헤더나 데이터를 추가할 수 있습니다.
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // 추천 상태를 프론트에서 업데이트합니다.
      setCocktailList((prevCocktails) =>
        prevCocktails.map((cocktail) => {
          if (cocktail.id === cocktailId) {
            const updatedCocktail = { ...cocktail, recommended: !cocktail.recommended };
            console.log('Updated Cocktail:', updatedCocktail); // 업데이트된 칵테일 정보 출력
            return updatedCocktail;
          } else {
            return cocktail;
          }
        })
      );
    } catch (error) {
      console.error('Error updating recommendation:', error);
    }
  };

  

  return (
    <div className="cockList-box">
      <div className="selectList-box">
        <div className="selectList-contents">
          <button
            className={selectedButton === 'popular' ? 'selected' : ''}
            onClick={() => handleSortByClick('popular')}
          >
            인기순
          </button>
          <button
            className={selectedButton === 'latest' ? 'selected' : ''}
            onClick={() => handleSortByClick('latest')}
          >
            최신순
          </button>
          <button
            className={selectedButton === 'alphabetical' ? 'selected' : ''}
            onClick={() => handleSortByClick('alphabetical')}
          >
            가나다순
          </button>
        </div>
      </div>
      <div className="cockList-contents">
        <ul>
          {filterCocktails().map((cocktail) => (
            <li key={cocktail.id}>
              <div className="cockList-contents-text">
                <div className="cockList-contents-user-info">
                  {/* 백엔드에서 가져온 유저 정보를 표시 */}
                  <div className="user-profile-image">
                    <img src={cocktail.userImage} alt={userData.username} />
                  </div>
                  <div className="user-profile-text">
                    <p id="name">{userData.username}</p>
                    <p id="time">{getTimeAgo("2023-08-09T10:30:00")}전</p>
                  </div>
                </div>
                <div className="cockList-Cockinfo-box">
                  <p id="cock-name">
                    {/* Wrap the cocktail name in a Link */}
                    <Link to={`/recipe/detail/${cocktail.id}`}>{cocktail.name}</Link>
                  </p>
                  <div className="cockList-Cockinfo-explan">
                    <p id="explan">{cocktail.description}</p>
                    <p id="taste">{cocktail.taste}</p>
                  </div>
                  <div className="cockList-Cockinfo-recommended">
                    <button
                      className={`recommend-button ${cocktail.recommended ? 'recommended' : ''}`}
                      onClick={() => handleRecommendationToggle(cocktail.id)}
                    >
                      <img src={good} alt="따봉버튼" />
                    </button>
                    <button className="comment-button" onClick={handleCommentButtonClick}>
                      <img src={chat} alt="댓글 아이콘" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="cockList-contents-image">
                {/* 이미지를 백엔드에서 가져올 때의 코드 */}
                {/* <img
            src={cocktail.imageUrl} // 백엔드에서 이미지 URL을 가져옴
            alt={cocktail.name}
          /> */}
                <img src={cocktail.imageUrl} alt={cocktail.name} />
              </div>
            </li>
          ))}
        </ul>
        {showCommentPopup && (
        <div className="comment-popup">
          {/* 팝업 창 내용 */}
          <p>댓글을 작성하세요.</p>
          <button onClick={() => setShowCommentPopup(false)}>닫기</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default CocktailListSection;
