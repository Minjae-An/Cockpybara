import React, { useState } from "react";
import "./EditProfile.css";
import { Link, useNavigate } from "react-router-dom";
import Menu from './components/Menu.js'
import searchImage from "./photo/Search.png";
import camera from "./photo/SLR Camera.png";
import defaultProfileImage from "./photo/cock-circle.png"; // 기본 프로필 사진
import userCock from "./photo/cock-circle.png";

export const EditProfile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(defaultProfileImage);

  const handleCameraClick = () => {
    // 파일 업로드 input 엘리먼트를 클릭합니다.
    const profileImageInput = document.getElementById("profileImageInput");
    profileImageInput.click();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleVectorClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen); // 이전 상태 값을 이용하여 토글
  };

  const handleSearch = () => {
    // 현재 검색어를 정리합니다.
    const trimmedSearchValue = searchValue.trim();

    // 검색어가 비어있으면 URL 파라미터에서 검색어를 제거하고 해당 페이지로 이동합니다.
    if (trimmedSearchValue === "") {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete("search");
      navigate(`/recipe?${queryParams.toString()}`);
    } else {
      // 검색어가 있는 경우, URL 파라미터에 검색어를 추가하고 해당 페이지로 이동합니다.
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("search", trimmedSearchValue);
      navigate(`/recipe?${queryParams.toString()}`);
    }
  };

  const handleProfileImageChange = (e) => {
    const selectedFile = e.target.files[0];
  
    // 파일 업로드 처리를 원하는 API 엔드포인트로 요청합니다.
    // 이 과정에서 서버로 선택한 이미지 파일을 업로드하고, 응답으로 새로운 프로필 이미지 URL을 받아옵니다.
  
    // 예: fetch 또는 axios를 사용하여 서버로 업로드 요청을 보냅니다.
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    fetch("서버 API 엔드포인트 URL", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버로부터 받은 새로운 프로필 이미지 URL을 사용하여 이미지를 업데이트합니다.
        // data.imageUrl를 사용하여 이미지를 업데이트하는 로직을 추가합니다.
        // setImageUrl(data.imageUrl); // 예: setImageUrl 함수를 사용하여 이미지 URL을 업데이트합니다.
  
        // 새로운 이미지 URL을 state에 업데이트합니다.
        setProfileImageUrl(data.imageUrl);
      })
      .catch((error) => {
        console.error("이미지 업로드 실패:", error);
      });
  };

  const handleWithdrawal = () => {
    const userId = 14; // 사용자 ID, 필요에 따라 동적으로 설정
    const url = `http://localhost:8080/user/${userId}/my-page`;
  
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          // 회원탈퇴 성공 시
          // 로그아웃 등 추가적인 로직을 수행할 수 있습니다.
          // 사용자를 로그아웃하거나 다른 작업을 수행하세요.
          setWithdrawalSuccess(true); // 회원탈퇴 성공 상태를 업데이트
        } else {
          // 회원탈퇴 실패 시 오류 처리
          console.error("회원탈퇴에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("회원탈퇴 요청 중 오류 발생:", error);
      });
  };
  
  return (
    <div className="editPro">
      <div className="headerContainer">
        <div className="editProfile">
          <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className={`menuBar ${isMenuOpen ? "menuBar-open" : ""}`}>
            <div className="headerbox">
              <svg
                className="vector"
                width="35"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleVectorClick}
              >
                <path
                  d="M0 38.25H37.5V32H0V38.25ZM0 0.75V7H56.25V0.75H0ZM0 22.625H56.25V16.375H0V22.625Z"
                  fill="black"
                />
              </svg>
              <Link to="/about">
                <div className="menuAbout">About</div>
              </Link>
              <Link to="/recipe">
                <div className="menuRecipe">Recipe</div>
              </Link>
              <Link to="/community">
                <div className="menuCommunity">Community</div>
              </Link>
              <Link to="/">
                <div className="mainHome">Cockpybara</div>
              </Link>
            </div>
            <div className="rightComponent">
              <div className="search-wrap">
                <input
                  type="text"
                  style={{ fontSize: "20px" }}
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <img src={searchImage} alt="검색" onClick={handleSearch} />
              </div>
              <Link to="/user/{userId}/my-page">
              <button className="detailLogin">
                <img src={userCock}   width="90"  />
              </button>
              {/* 이미지 변경 후 경로 변경 */}
            </Link>
            </div>
          </div>
        </div>
        <div className={`content ${isMenuOpen ? "content-shifted" : ""}`}>
        </div>
        <div className="line"></div>
        <div className="editContainer">
          <div className="text-wrapper-6">프로필 수정</div>
          <div className="text-wrapper-7">비밀번호</div>
          <div className="text-wrapper-8">별명</div>
          <div className="text-wrapper-9">전화번호</div>
          <div className="text-wrapper-10">성별</div>
          <div className="text-wrapper-11">생년월일</div>
          <div className="div-wrapper"> 
            <input className="text-wrapper-12" type="text" placeholder="올리브가 올라간 카피바라"/>
          </div>
          <div className="overlap-2">
            <div className="editPW" />
            <div className="ellipse-2" />
            <div className="ellipse-3" />
            <div className="ellipse-4" />
            <div className="ellipse-5" />
            <div className="ellipse-6" />
            <div className="ellipse-7" />
            <div className="ellipse-8" />
            <div className="ellipse-9" />
            <div className="ellipse-10" />
            <div className="ellipse-11" />
          </div>
          <div className="overlap-3">
            <input className="text-wrapper-12" placeholder="010-****-2972"/>
          </div>
          <div className="editId">아이디</div>
          <div className="text-wrapper-14">프로필 사진</div>
          <div className="text-wrapper-15">ruby1363@naver.com</div>
          <div className="text-wrapper-16">여성</div>
          <div className="text-wrapper-17">2001. 03. 13</div>
          <div className="group">
            <div className="overlap-4">
              <Link to ="/user/{userId}/my-page">
              <button className="text-wrapper-18">저장</button>
              </Link>
            </div>
            {withdrawalSuccess ? (
              <div className="withdrawal-success-message">
                회원탈퇴가 완료되었습니다.
                <Link to="/error">메인 페이지로 이동</Link>
              </div>
            ) : (
              <Link to="/error">
              <button className="withdrawal" onClick={handleWithdrawal}>
                회원탈퇴
              </button>
              </Link>
            )}
          </div>
          <div className="overlap-5">
            <div className="ellipse-12" />
            <input
              type="file"
              accept="image/*"
              id="profileImageInput"
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
            />
            <img
              className="SLR-camera"
              alt="Slr camera"
              src={camera}
              onClick={handleCameraClick}
            />
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-6">
              <div className="text-wrapper-19">별명 변경</div>
            </div>
          </div>
          <div className="group-2">
            <div className="overlap-6">
              <div className="text-wrapper-20">비밀번호 수정</div>
            </div>
          </div>
          <div className="group-3">
            <div className="overlap-6">
              <div className="text-wrapper-20">전화번호 변경</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
