import React, { useState } from "react";
import image1 from "./photo/Search.png"; // 이미지 경로
import './IDFinder.css'

const IDFinder = () => {
  // Sample list of users with their names and IDs
  const users = [
    { id: "user1", name: "John Doe" },
    { id: "user2", name: "Jane Smith" },
    { id: "user3", name: "Michael Johnson" },
    // Add more users as needed
  ];

  const [name, setName] = useState("");
  const [foundID, setFoundID] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFindID = () => {
    const foundUser = users.find((user) => user.name === name);
    if (foundUser) {
      setFoundID(foundUser.id);
    } else {
      setFoundID("User not found");
    }
  };

  return (
    <div>
      <div class="container">
        <svg
          class="notes"
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_212_178)">
            <path
              d="M6.125 36.75H30.625V32.6667H6.125V36.75ZM6.125 12.25V16.3333H42.875V12.25H6.125ZM6.125 26.5417H42.875V22.4583H6.125V26.5417Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_212_178">
              <rect width="49" height="49" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div class="serch-container">
          <img class="search" src={image1} />
        </div>
        <button class="headerLogin">로그인</button>
        </div>
        <div className="idFinder-container">
          <h2 className="idFinder-title">Cockpybara</h2>
          <div className="email">이메일 찾기</div>
          <form>
          <div className="idFinder-nicknameField">
            <input
              type="text"
              name="userNickname"
              placeholder="닉네임"
              className="input-field-nickname"
            />
            </div>
            <div className="idFinder-telnumField">
            <input
              type="text"
              name="userTelnum"
              placeholder="휴대전화"
              className="input-field-telPhone"
            />
            </div>
            <label for="remember-check" className="login-maintain">
              <div className="idFinder-error" />
              <span>입력하신 휴대전화 번호를 다시 확인해 주세요!</span>
            </label>
            <button class="FindIdButton">아이디 찾기</button>
          </form>
          <div className="thinkId">
            이메일이 생각나셨나요? <button>로그인하기</button>
          </div>
        </div>
    </div>
  );
};

export default IDFinder;
