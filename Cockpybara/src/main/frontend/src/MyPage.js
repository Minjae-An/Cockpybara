import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPage.css';
import { Link } from 'react-router-dom';
import pinkTea from "./photo/pinkTea.png";


const MyPage = () => {
  const handleSaveButtonClick = () => {
    // Update the user data in the state with the changes
    setUserData({
      ...userData,
      name: userData.name, // Keep the name as it is
      email: userData.email,
      password: userData.password,
      nickname: userData.nickname,
      phone: userData.phone,
      gender: userData.gender,
      birthDate: userData.birthDate,
      profileImage: userData.profileImage,
      favoriteRecipes: userData.favoriteRecipes,
      myRecipes: userData.myRecipes,
      commentedRecipes: userData.commentedRecipes,
      background: userData.background,
      representativeRecipe: userData.representativeRecipe,
    });
  
    setIsEditing(false); // Disable editing mode immediately
  
    // Save the updated user data to the server
    // For example, you can send a PUT request to update the user data
    axios
      .put('/user/api/my-page', userData)
      .then(response => {
        console.log('User data updated successfully:', response.data);
        // You can perform additional actions here if needed after a successful update
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        // You can handle the error here if needed
      });
  };
  
  useEffect(() => {
    // Fetch user data from the API and update the state
    // For example:
    axios
      .get('/user/api/my-page')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userData]); // Fetch user data again when userData changes

  // Sample user data, you can replace it with the actual user data fetched from the API
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '*******',
    nickname: 'JDoe',
    phone: '555-5555',
    gender: 'Male',
    birthDate: '1990-01-01',
    profileImage: 'pinkTea',
    favoriteRecipes: [],
    myRecipes: [],
    commentedRecipes: [],
    background: '/photo/background.png',
    representativeRecipe: '',
  });

  // Sample dummy data for favorite, my, and commented recipes
  const dummyRecipes = [
    {
      id: 1,
      name: 'Recipe 1',
      poster:<img src = {pinkTea} alt="poster" />
    },
    {
      id: 2,
      name: 'Recipe 2',
      poster: './photo/pinkTea.png',
    },
    {
      id: 3,
      name: 'Recipe 3',
      poster: './photo/pinkTea.png',
    },
    // Add more dummy recipes as needed
  ];

  
  // State for controlling the editing mode of the profile
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the API and update the state
    // For example:
    axios.get('/user/api/my-page')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  
  const handleProfileImageChange = (e) => {
    // Handle profile image file change
    // For example, you can upload the image to the server and update the profileImage state
    console.log('Profile image changed:', e.target.files[0]);
  };

  const handleBackgroundImageChange = (e) => {
    // Handle background image file change
    // For example, you can upload the image to the server and update the background state
    console.log('Background image changed:', e.target.files[0]);
  };

  const handleRepresentativeRecipeChange = (e) => {
    // Handle representative recipe change
    setUserData({
      ...userData,
      representativeRecipe: e.target.value,
    });
  };

  const handleEditButtonClick = () => {
    // Enable editing mode
    setIsEditing(true);
  };


  return (
    <div className='myPageContainer'>
      <div>
      {isEditing ? (
        // Show editable profile information
        <div>
          <h1>My Page / Edit</h1>
          <h2 className='myPageTitle'>프로필 수정</h2>
          <div className='myPagePhotoContainer'>
            <label className='myPagePhoto'>프로필 사진</label>
            <input
              className='myPageFieldPhoto'
              type="file"
              name="profileImage"
              onChange={handleProfileImageChange}
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <div className='myPageIDContainer'>
            <label className='myPageID'>아이디</label>
            <input className='myPageFieldID' type="email" name="email" value={userData.email} readOnly />
          </div>
          <div className='myPagePWContainer'>
            <label className='myPagePW'>비밀번호</label>
            <input
              className='myPageFieldPW'
              type="password"
              name="password"
              value={userData.password} readOnly
            />
            <Link to="/login/help/begin" className='myPageLink'>
            <button className='myPagePassWordSaveButton'>변경</button>
            </Link>
          </div>
          <div className='myPageNickNameContainer'>
            <label className='myPageNickName'>별명</label>
            <input
              className='myPageFieldNickName'
              type="text"
              name="nickname"
              value={userData.nickname}
              onChange={handleChange}
            />
            <button className='myPageNickNameSaveButton' onClick={handleSaveButtonClick}>중복 확인</button>
          </div>
          <div className='myPagePhoneContainer'>
            <label className='myPagePhone'>전화번호</label>
            <input
              className='myPageFieldPhone'
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
            <button className='myPagePhoneSaveButton' onClick={handleSaveButtonClick}>변경</button>
          </div>
          <div className='myPageSexContainer'>
            <label className='myPageSex'>성별</label>
            <input className='myPageFieldSex' type="text" name="gender" value={userData.gender} readOnly />
          </div>
          <div className='myPageBirthContainer'>
            <label className='myPageBirth'>생년월일</label>
            <input
              className='myPageFieldBirth'
              type="date"
              name="birthDate"
              value={userData.birthDate}
              readOnly
            />
          </div>
          <button className='myPageSaveButton' onClick={handleSaveButtonClick}>저장</button>
          </div>
        ) : (
          // Show non-editable profile information and "Edit Profile" button
          <div>
            <h2>Profile Information</h2>
            <div>
              <img src={process.env.PUBLIC_URL + userData.profileImage} alt={userData.name} />
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Representative Recipe: {userData.representativeRecipe}</p>
            </div>
            <button onClick={handleEditButtonClick}>Edit Profile</button>
          </div>
        )}
      </div>

      {!isEditing && (
        // Show recipe sections only when not in editing mode
        <div>
          <div>
            <h2>즐겨찾기</h2>
            <div className="recipe-list-horizontal">
              {dummyRecipes.map(recipe => (
                <div className="recipe-item-horizontal" key={recipe.id}>
                  <img src={pinkTea} alt={recipe.name} />
                  <p>{recipe.name}</p>
                </div>
              ))}
              <button>즐겨찾기 더 보기</button>
            </div>
          </div>
      <div>
        <h2>나만의 레시피</h2>
        <div className="recipe-list-horizontal">
              {dummyRecipes.map(recipe => (
                <div className="recipe-item-horizontal" key={recipe.id}>
                  <img src={pinkTea} alt={recipe.name} />
                  <p>{recipe.name}</p>
                </div>
          ))}
          <button>나만의 레시피 더 보기</button>
        </div>
      </div>

      <div>
            <h2>댓글 단 레시피</h2>
            <div className="recipe-list-horizontal">
              {dummyRecipes.map(recipe => (
                <div className="recipe-item-horizontal" key={recipe.id}>
                  <img src={pinkTea} alt={recipe.name} />
                  <p>{recipe.name}</p>
                </div>
              ))}
              <button>댓글 단 레시피 더 보기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;