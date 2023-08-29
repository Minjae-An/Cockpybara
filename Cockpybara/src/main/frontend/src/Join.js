import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Join.css'
import image1 from './photo/capybaraIcon.png';

const Join = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alias, setAlias] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [isJoinSuccess, setIsJoinSuccess] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(true); 
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true); 

  const handleNextClick = () => {
    if (isIdValid && isPhoneNumberValid) { // 전화번호 유효성도 체크
      setIsNextClicked(true);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    setEmail(newEmail);

    // 아이디 유효성 검사
    const isValidLength = newEmail.length >= 2 && newEmail.length <= 10;
    const hasValidChars = /^[a-zA-Z0-9가-힣]+$/.test(newEmail);

    setIsIdValid(isValidLength && hasValidChars);
    setIsIdAvailable(true); // 초기에 중복 가능하다고 가정
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
  
    setPassword(newPassword);
  
    // 비밀번호 조건 검사
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword);
    const isValidLength = newPassword.length >= 8 && newPassword.length <= 15;
  
    setIsPasswordValid(hasLowerCase && hasDigit && hasSpecialChar && isValidLength);
  };
  
  const handleSubmit = async (e) => {
    {/* 백엔드 API 요청 코드 */ }
    e.preventDefault();

    const formData = {
      email: email,
      password: password,
      alias: alias,
      phoneNumber: phoneNumber,
      gender: gender,
      birth: birth
    };

    try {
      const response = await fetch('/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('회원가입 성공:', responseData);
        setIsJoinSuccess(true);
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('API 요청 에러(제출버튼):', error);
    }
  }; {/* 백엔드 API 요청 코드 */ }

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAliasChange = (e) => {
    setAlias(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;

    setPhoneNumber(newPhoneNumber);

    // 전화번호 유효성 검사
    const phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/;
    const isValidPhoneNumber = phoneNumberPattern.test(newPhoneNumber);

    setIsPhoneNumberValid(isValidPhoneNumber);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleBirthChange = (e) => {
    setBirth(e.target.value);
  };

  return (
    <div className='join-container'>
      <h1 className="join-title" onClick={() => navigate('/')}>cockpybara</h1>
      {isJoinSuccess ? (
        <div>
          <p>카피바라 님,</p>
          <p>가입을 축하합니다.</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img src={image1} alt="Image 1" style={{ marginRight: '70px', marginTop: '-130px' }} />
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
              <input
              className={`join-input-id ${!isIdValid ? 'invalid' : ''}`}
              placeholder="아이디"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            {!isIdValid && email.length > 0 && (
              <p style={{ color: 'red' }}>
                아이디는 2자 이상 10자 이하의 영어, 숫자, 한글로만 구성되어야 합니다.
              </p>
            )}
              <br />
              <input className="join-input-pw" placeholder="비밀번호" type="password" value={password} onChange={handlePasswordChange} />
              <br />
              <input className="join-input-pw" placeholder="비밀번호 확인" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {confirmPassword !== '' && password !== confirmPassword && (
                <p style={{ color: 'red' }}>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
              )}
              {!isPasswordValid && password.length > 0 && (
                <p style={{ color: 'red' }}>
                  비밀번호는 8자 이상 15자 이하, 소문자, 숫자, 특수문자가 각각 하나 이상 포함되어야 합니다.
                </p>
              )}
              <br />

              <button className={`join-next-button ${password !== confirmPassword ? 'disabled' : ''}`} type="button" onClick={handleNextClick}>
                다음으로
              </button>
              {isIdAvailable === false && (
                <p style={{ color: 'red' }}>이미 사용 중인 아이디입니다.</p>
              )}

            </div>
          ) : (
            <div>
              <button className="join-button" type="button" onClick={() => navigate('/login')}>
                &lt; BACK
              </button>
              <br />
              <input className="join-input-alias" placeholder="별명" type="text" value={alias} onChange={handleAliasChange} />
              <br />
              <input className="join-input-phone" placeholder="전화번호" type="text" value={phoneNumber} onChange={handlePhoneNumberChange}/>
              {!isPhoneNumberValid && (
        <p style={{ color: 'red' }}>올바른 전화번호 형식이 아닙니다.</p>
      )}
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