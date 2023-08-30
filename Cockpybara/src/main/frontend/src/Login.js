import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handlIdChange = (e) => {
    setId(e.target.value);
  };

  const handleJoinButtonClick = () => {
    navigate('/join');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSuccess = () => { // 임시 로그인 성공창
    setIsLoggedIn(true);
    navigate('/'); // 로그인 성공 시 홈 화면으로 이동
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API 호출을 수행합니다.
    axios.post('/login', { id, password })
      .then((response) => {
        // API 응답 처리를 수행합니다.
        console.log(response.data);
        handleSuccess(); // 로그인 성공 시 홈으로 이동
      })
      .catch((error) => {
        // API 호출 실패 처리를 수행합니다.
        console.error(error);
        // 추가적인 에러 처리를 구현할 수 있습니다.
      });

    // 폼 입력값 초기화
    setId('');
    setPassword('');
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  const handleFindId = () => { //아이디 찾기창
    navigate('/login/help/idInQuiry');
  };

  const handleFindPassword = () => { //비밀번호 찾기창
    navigate('/login/help/begin');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {
        id: 'your_id',
        password: 'your_password'
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/login'); 
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title" onClick={() => navigate('/')}>Cockpybara</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userId" value={id} onChange={handlIdChange} placeholder="아이디" className="input-field-id" />
        <input type="password" name="userPassword" value={password} onChange={handlePasswordChange} placeholder="비밀번호" className="input-field-pw" />
        <label for="remember-check" className="login-maintain">
          <input type="checkbox" id="remember-check" /><span>로그인 유지</span>
        </label>
        <button type="submit" className="login-field" onClick={handleSuccess}>로그인</button>
      </form>
      <div className="find-infor">
        <button onClick={handleFindId}>아이디 찾기</button>
        <span> | </span>
        <button onClick={handleFindPassword}>비밀번호 찾기</button>
      </div>
      <div className="question">
        아직 카피바라 회원이 아니세요?  <button onClick={handleJoinButtonClick}>회원가입</button>
      </div>
    </div>
  );
};

export default Login;