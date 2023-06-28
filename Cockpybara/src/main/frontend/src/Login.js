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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API 호출을 수행합니다.
    axios.post('/login', { id, password })
      .then((response) => {
        // API 응답 처리를 수행합니다.
        console.log(response.data);
        // 추가적인 로직을 구현할 수 있습니다.
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

  const handleLogin = async () => {
    try {
      // Make the API call to login endpoint
      const response = await axios.post('/login', {
        // Pass the necessary login data in the request body
        // For example, you can pass the ID and password as follows:
        id: 'your_id',
        password: 'your_password'
      });

      // Check the response and set isLoggedIn to true upon successful login
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/login'); // Navigate to the Login page after successful login
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.log('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input type="id" value={id} onChange={handlIdChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
