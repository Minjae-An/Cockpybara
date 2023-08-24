import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCommunitySection.css';
import { Link } from 'react-router-dom';
import arrowPhoto from "./photo/arrow.png";
import cockIcon from "./photo/CockIcon.png";

const MyCommunitySection = ({ userId }) => {
  // 상태 초기화: 백엔드에서 받아올 때 사용할 사용자 이름과 사진 URL 상태
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const userResponse = await fetch(`/api/user/${userId}`);
        const userData = await userResponse.json();
        setUserName(userData.name);
        setUserPhoto(userData.photoUrl);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchDataFromBackend();
  }, [userId]);

  // 더미 데이터: 테스트를 위해 하드코딩된 사용자 이름과 사진 URL
  useEffect(() => {
    setUserName('올리브가 올라간 카피바라'); // 더미 데이터로 사용자 이름 상태 초기화
    setUserPhoto('Cockpybara/Cockpybara/src/main/frontend/src/photo/capybaraIcon.png'); // 더미 데이터로 사용자 사진 상태 초기화
  }, []);

  const navigate = useNavigate();

  const handleMyPageButtonClick = () => {
    navigate(`/user/${userId}/my-page`);
  };

  return (
    <div className="myCommunity-box">
      <div className="myCommunity-serve-box">
        <p id="community-title">MY 커뮤니티</p>
        <div className="myPage-box">
          {/* 사진을 보여줄 이미지 태그 */}
          <div className="photo-box">
            <img src={cockIcon} alt="사용자 사진" />
          </div>
          <div className="userName-box">
            <p id="user-name">{userName}</p>
          </div>
          <Link to='/user/{userId}/my-page'>
          <button id="myPagegoButton" onClick={handleMyPageButtonClick}>
            <img src={arrowPhoto} alt="화살표 사진" />
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCommunitySection;
