import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Join from './Join';
import AddRecipe from './AddRecipe';
import Recipe from './Recipe';
import CocktailDetail from './CocktailDetail';
import IDFinder from './IDFinder';
import PWFinder from './PWFinder';
import About from './About';
import Community from './Community';
import MyPage from './MyPage';

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
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/join" element={<Join />} />
        <Route path="/user/my-receipe" element={<AddRecipe/>} />
        <Route path="/recipe" element={<Recipe/>} />
        <Route path="/recipe/detail/:cocktailId" element={<CocktailDetail />} />
        <Route path="/login/help/idInQuiry" element={<IDFinder />} />
        <Route path="/login/help/begin" element={<PWFinder />} />
        <Route path="/community/{userId}" element={<Community />} />
        <Route path="/user/{userId}/my-page" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
