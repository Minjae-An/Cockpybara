import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyCommunitySection = ({ userId }) => {
  // 상태 초기화: 백엔드에서 받아올 때 사용할 사용자 이름과 사진 URL 상태
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  // 주석 처리: 백엔드와의 통신 코드
  /*
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
  */

  // 더미 데이터: 테스트를 위해 하드코딩된 사용자 이름과 사진 URL
  useEffect(() => {
    setUserName('John Doe'); // 더미 데이터로 사용자 이름 상태 초기화
    setUserPhoto('Cockpybara/Cockpybara/src/main/frontend/src/photo/capybaraIcon.png'); // 더미 데이터로 사용자 사진 상태 초기화
  }, []);

  const navigate = useNavigate();

  const handleMyPageButtonClick = () => {
    navigate(`/user/${userId}/my-page`);
  };

  return (
    <div style={{ backgroundColor: 'skyblue' }}>
      <h2>MY 커뮤니티</h2>
      <p>사용자 이름: {userName}</p>
      {/* 사진을 보여줄 이미지 태그 */}
      <img src={userPhoto} alt="사용자 사진" style={{ width: '200px', height: '200px' }} />
      <button onClick={handleMyPageButtonClick}>마이 페이지로 이동</button>
    </div>
  );
};

export default MyCommunitySection;
