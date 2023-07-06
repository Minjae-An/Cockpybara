import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Join from './Join';
import Success from './Success';
import axios from 'axios'; // Import the axios library
import Recipe from './Recipe';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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
    <div className="App">
      <Link to="/"></Link>
      {!isLoggedIn && (
        <Link to="/login"></Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </div>
  );
}

export default App;
