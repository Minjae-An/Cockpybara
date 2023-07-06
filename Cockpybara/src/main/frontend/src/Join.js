import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Join.css'
import image1 from './photo/image 1.png'; // 이미지 경로

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alias, setAlias] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [isJoinSuccess, setIsJoinSuccess] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);

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

  const handleNextClick = () => {
    setIsNextClicked(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
      alias: alias,
      phoneNumber: phoneNumber,
      gender: gender,
      birth: birth
    };
    console.log('회원가입 정보:', formData);
    setIsJoinSuccess(true);
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className='join-container'>
      <h1 className="join-title" onClick={() => navigate('/')}>cockpybara</h1>
      {isJoinSuccess ? (
        <div>
          <p>카피바라 님,</p>
          <p>가입을 축하합니다.</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <img src={image1} alt="Image 1" style={{ marginRight: '70px', marginTop: '-130px'}} />
      </div>
      <button className="join-button-login" onClick={handleLoginButtonClick}>로그인</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {!isNextClicked ? (
            <div>
              <button className="join-button" type="button" onClick={() => navigate('/login')}>
              &lt; BACK
              </button>
              <br />
                <input className="join-input-id" placeholder="아이디" type="email" value={email} onChange={handleEmailChange} />
              <br />
                <input className="join-input-pw" placeholder="비밀번호" type="password" value={password} onChange={handlePasswordChange} />
              <br />
                <input className="join-input-pw" placeholder="비밀번호 확인" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              <br />
              <button className="join-next-button" type="button" onClick={handleNextClick}>
                다음으로
              </button>
            </div>
          ) : (
            <div>
              <button className="join-button" type="button" onClick={() => navigate('/login')}>
                &lt; BACK
                </button>
                <br />
                <input className="join-input-alias" placeholder="별명" type="text" value={alias} onChange={handleAliasChange} />
              <br />
                <input className="join-input-phone" placeholder="전화번호" type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
              <br />
                <div className="join-select-container">
                  <select className="join-select" value={gender} onChange={handleGenderChange}>
                    <option value="MALE">남성</option>
                    <option value="FEMALE">여성</option>
                  </select>
                </div>
              <br />
                <input className="join-input-birth" type="date" value={birth} onChange={handleBirthChange} />
              <br />
              <button className="join-button-final" type="submit">
                가입하기
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Join;
