import React, { useState } from 'react';
import './Join.css';
import { Link, useNavigate } from 'react-router-dom';

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alias, setAlias] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('FEMALE');
  const [birth, setBirth] = useState('');
  const [isJoinSuccess, setIsJoinSuccess] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAliasChange = (e) => {
    setAlias(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleBirthChange = (e) => {
    setBirth(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 회원가입 로직을 구현하면 됩니다.
    // 예를 들면, 서버로 회원가입 정보를 전송하는 등의 작업을 수행할 수 있습니다.
    const formData = {
      email: email,
      password: password,
      alias: alias,
      phoneNumber: phoneNumber,
      gender: gender,
      birth: birth
    };
    console.log('회원가입 정보:', formData);
    // 여기에서 실제 회원가입을 처리하는 로직을 구현합니다.
    // 회원가입 성공 시 setIsJoinSuccess(true)를 호출합니다.
    // 회원가입 실패 시 에러 처리를 수행합니다.

    // 임시로 회원가입 성공 상태를 설정합니다.
    setIsJoinSuccess(true);
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1 className="join-title">회원가입</h1>
      {isJoinSuccess ? (
        <div>
          <p>회원가입이 성공하였습니다. 축하합니다!</p>
          <button onClick={handleLoginButtonClick}>로그인</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            이메일:
            <input className="join-input" type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            비밀번호:
            <input className="join-input" type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <label>
            비밀번호 확인:
            <input className="join-input" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </label>
          <br />
          <label>
            별명:
            <input className="join-input" type="text" value={alias} onChange={handleAliasChange} />
          </label>
          <br />
          <label>
            전화번호:
            <input className="join-input" type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
          </label>
          <br />
          <label>
            성별:
            <select className="join-select" value={gender} onChange={handleGenderChange}>
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
          </label>
          <br />
          <label>
            생년월일:
            <input className="join-input" type="date" value={birth} onChange={handleBirthChange} />
          </label>
          <br />
          <button className="join-button" type="submit">가입하기</button>
        </form>
      )}
    </div>
  );
};

export default Join;
