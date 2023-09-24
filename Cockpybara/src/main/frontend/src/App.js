import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Join from './Join';
import AddRecipe from './AddRecipe';
import Recipe from './Recipe';
import IDFinder from './IDFinder';
import PWFinder from './PWFinder';
import About from './About';
import Community from './Community';
import MyPage from './MyPage';
import RecipeDetail from './RecipeDetail';
import Error from './Error';
import DetailHeader from './DetailHeader';
import Footer from './footer';
import FooterV2 from './footerV2';
import AddRecipe2 from './AddRecipe2';
import CockMojito from './cockMojito';
import Cosmopolitan from './cosmopolitan'; 
import OldFashioned from './oldFashioned'; 
import JoinComplete from './JoinComplete';
import Martini from './Martini'; 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { cocktailId } = useParams();
  const handleLogin = async () => {
    try {
      // Make the API call to login endpoint
      const response = await axios.post('/login', {
        // Pass the necessary login data in the request body
        // For example, you can pass the ID and password as follows
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
      console.log('error:', error);
      navigate('/error');
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
        <Route path="/recipe" element={<Recipe/>} />
        <Route path="/login/help/idInQuiry" element={<IDFinder />} />
        <Route path="/login/help/begin" element={<PWFinder />} />
        <Route path="/community/{userId}" element={<Community />} />
        <Route path="/user/{userId}/my-page" element={<MyPage />} />
        <Route path="/user/my-recipe" element={<AddRecipe/>} />
        <Route path="/recipe/detail" element={<RecipeDetail />} />
        <Route path="/community" element={<Community/>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/DetailHeader" element={<DetailHeader/>} />{/*확인용*/}
        <Route path="/footer" element={<Footer/>} />{/*확인용*/}
        <Route path="/footerV2" element={<FooterV2/>} />{/*확인용*/}
        <Route path="/user/my-recipe-2" element={<AddRecipe2/>} />{/*확인용*/}
        <Route path="/recipe/detail/1" element={<CockMojito/>} />
        <Route path="/recipe/detail/2" element={<Cosmopolitan/>} />
        <Route path="/recipe/detail/6" element={<OldFashioned/>} />
        <Route path="/JoinComplete" element={<JoinComplete/>} />
        <Route path="/recipe/detail/4" element={<Martini/>} />
      </Routes>
    </div>
  );
}

export default App;