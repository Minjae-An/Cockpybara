import React, { useState } from "react";
import image1 from "./photo/Search.png";
import { Link } from "react-router-dom";
import "./IDFinder.css";

const IDFinder = () => {
  const users = [
    {
      userId: "user1",
      id: "ruby1363@naver.com",
      nickname: "John Doe",
      phoneNumber: "111-111-1111",
    },
    {
      userId: "user2",
      id: "jeonsojin1363@naver.com",
      nickname: "Jane Smith",
      phoneNumber: "222-222-2222",
    },
    {
      userId: "user3",
      id: "jeonsojin0313@naver.com",
      nickname: "Michael Johnson",
      phoneNumber: "333-333-3333",
    },
  ];

  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foundID, setFoundID] = useState("");
  const [isEmailFound, setIsEmailFound] = useState(false);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFindID = () => {
    const foundUser = users.find(
      (user) => user.nickname === nickname && user.phoneNumber === phoneNumber
    );
    if (foundUser) {
      setFoundID(foundUser.id);
      setIsEmailFound(true);
    } else {
      setFoundID("입력하신 정보를 다시 확인해주세요!");
      setIsEmailFound(false); 
    }
  };

  const maskEmail = (email) => {
    const [prefix, domain] = email.split("@");
    const maskedPrefix = prefix.slice(0, 2) + "*".repeat(prefix.length - 2);
    return maskedPrefix + "@" + domain;
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
        <Link to="/login">
        <button class="headerLogin">로그인</button>
        </Link>
      </div>
      <div className="idFinder-container">
        <Link to="/">
          <h2 className="idFinder-title">Cockpybara</h2>
        </Link>
        <div className="email">아이디 찾기</div>
        <form>
          <div
            className={`idFinder-nicknameField ${
              foundID ? "foundUser" : "notFoundUser"
            }`}
          >
            <input
              type="text"
              name="userNickname"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임"
              className="input-field-nickname"
            />
          </div>
          <div
            className={`idFinder-telnumField ${
              foundID ? "foundUser" : "notFoundUser"
            }`}
          >
            <input
              type="text"
              name="userTelnum"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="휴대전화"
              className="input-field-telPhone"
            />
          </div>
          <div
        className={`idFinder-result ${
          foundID === "입력하신 정보를 다시 확인해주세요!" || foundID === ""
            ? "NotFoundUser"
            : "foundUser"
        }`}
      >
        {foundID !== "" && (
          <span>
            {foundID === "입력하신 정보를 다시 확인해주세요!" ||
            foundID === ""
              ? "입력하신 정보를 다시 확인해주세요!"
              : maskEmail(foundID)}
          </span>
        )}
      </div>
      <button
        type="button"
        className="FindIdButton"
        onClick={() => {
          if (isEmailFound) {
            window.location.href = "/login";
          } else {
            handleFindID();
          }
        }}
      >
        {isEmailFound ? "로그인 페이지로" : "아이디 찾기"}
      </button>
        </form>
        <div className="thinkId">
          이메일이 생각나셨나요? 
          <Link to="/login">
          <button>로그인하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IDFinder;
