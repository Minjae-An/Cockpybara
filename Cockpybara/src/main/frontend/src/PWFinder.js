import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PWFinder.css"; // You can create a separate CSS file for PWFinder if needed
import classnames from "classnames";

const PWFinder = () => {
  // Sample list of users with their email, nickname, and passwords
  const users = [
    {
      userId: "user1",
      email: "ruby1363@naver.com",
      nickname: "John Doe",
      phoneNumber: "111-111-1111",
      password: "mySecretPassword1",
    },
    {
      userId: "user2",
      email: "jeonsojin1363@naver.com",
      nickname: "Jane Smith",
      phoneNumber: "222-222-2222",
      password: "mySecretPassword2",
    },
    {
      userId: "user3",
      email: "jeonsojin0313@naver.com",
      nickname: "Michael Johnson",
      phoneNumber: "333-333-3333",
      password: "mySecretPassword3",
    },
    // Add more users as needed
  ];

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foundPassword, setFoundPassword] = useState("");
  const [isEmailFound, setIsEmailFound] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState("");
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFindPassword = () => {
    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.nickname === nickname &&
        user.phoneNumber === phoneNumber
    );
    if (foundUser) {
      setIsEmailFound(true);
      setFoundPassword("계정이 확인되었습니다. 비밀번호를 수정해주세요.");
      setShowPasswordUpdate(true); // Show the password update fields
    } else {
      setIsEmailFound(false);
      setFoundPassword("입력하신 정보로 등록된 계정이 없습니다.");
      setShowPasswordUpdate(false); // Hide the password update fields
    }
  };

  const editPassword = "비밀번호가 성공적으로 변경되었습니다.";
  const falseEditPassword =
    "새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.";

  const handlePasswordUpdate = () => {
    if (newPassword === confirmNewPassword) {
      // Update the password in the database or state
      setPasswordUpdateMessage(editPassword);
      setPasswordUpdateSuccess(true); // Set passwordUpdateSuccess to true
    } else {
      setPasswordUpdateMessage(falseEditPassword);
    }
  };

  return (
    <div>
      {/* ... (header part similar to IDFinder) ... */}
      <div className="pwFinder-container">
        <Link to="/">
          <h2 className="pwFinder-title">Cockpybara</h2>
        </Link>
        <div className="email">비밀번호 찾기</div>
        <form>
          {isEmailFound && showPasswordUpdate ? (
            <div>
              <div className="pwFinder-newPassword">
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새로운 비밀번호"
                  className="input-field-newPassword"
                />
              </div>
              <div className="pwFinder-confirmNewPassword">
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="새로운 비밀번호 확인"
                  className="input-field-confirmNewPassword"
                />
              </div>
              <div
                className={classnames("pwUpdateMessage", {
                  passwordUpdateSuccess: passwordUpdateMessage === editPassword,
                  passwordUpdateFailed:
                    passwordUpdateMessage === falseEditPassword,
                })}
              >
                {passwordUpdateMessage}
              </div>
              {passwordUpdateSuccess ? (
                <Link to="/login">
                  <button type="button" className="FindPwButton">
                    로그인하기
                  </button>
                </Link>
              ) : (
                <button
                  type="button"
                  className="FindPwButton"
                  onClick={handlePasswordUpdate}
                >
                  비밀번호 변경
                </button>
              )}
            </div>
          ) : (
            <div>
              <div
                className={`pwFinder-emailField ${
                  foundPassword ? "foundUser" : "notFoundUser"
                }`}
              >
                <input
                  type="text"
                  name="userEmail"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="이메일"
                  className="input-field-email"
                />
              </div>
              <div
                className={`pwFinder-nicknameField ${
                  foundPassword ? "foundUser" : "notFoundUser"
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
                className={`pwFinder-telnumField ${
                  foundPassword ? "foundUser" : "notFoundUser"
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
                className={`pwFinder-result ${
                  foundPassword === "입력하신 정보로 등록된 계정이 없습니다." ||
                  foundPassword === ""
                    ? "notFoundUser"
                    : "foundUser"
                }`}
              >
                {foundPassword !== "" && !showPasswordUpdate && (
                  <span>{foundPassword}</span>
                )}
              </div>
              <button
                type="button"
                className={`FindPwButton ${
                  showPasswordUpdate ? "disabled" : ""
                }`}
                onClick={handleFindPassword}
                disabled={showPasswordUpdate}
              >
                {showPasswordUpdate ? "비밀번호 수정" : "비밀번호 찾기"}
              </button>
            </div>
          )}
        </form>
        <div className="thinkPw">
          비밀번호가 기억나셨나요?{" "}
          <Link to="/login">
            <button>로그인하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PWFinder;