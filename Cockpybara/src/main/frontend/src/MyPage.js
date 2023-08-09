import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
  // Sample user data, you can replace it with the actual user data fetched from the API
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: '/photo/copybara.png',
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
      poster: '/photo/recipe1.png',
    },
    {
      id: 2,
      name: 'Recipe 2',
      poster: '/photo/recipe2.png',
    },
    {
      id: 3,
      name: 'Recipe 3',
      poster: '/photo/recipe3.png',
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

  // Rest of the code...

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

  const handleSaveButtonClick = () => {
    // Save the updated user data to the server
    // For example, you can send a PUT request to update the user data
    axios.put('/user/api/my-page', userData)
      .then(response => {
        console.log('User data updated successfully:', response.data);
        setIsEditing(false); // Disable editing mode after successful update
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <div>
      <h1>My Page</h1>
      <div>
        {isEditing ? (
          // Show editable profile information
          <div>
            <h2>Edit Profile</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Profile Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleProfileImageChange}
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div>
              <label>Background Image</label>
              <input
                type="file"
                name="backgroundImage"
                onChange={handleBackgroundImageChange}
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div>
              <label>Representative Recipe</label>
              <input
                type="text"
                name="representativeRecipe"
                value={userData.representativeRecipe}
                onChange={handleRepresentativeRecipeChange}
              />
            </div>
            <button onClick={handleSaveButtonClick}>Save</button>
          </div>
        ) : (
          // Show non-editable profile information
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

      <div>
        <h2>Favorite Recipes</h2>
        <div className="recipe-list">
          {dummyRecipes.map(recipe => (
            <div className="recipe-item" key={recipe.id}>
              <img src={process.env.PUBLIC_URL + recipe.poster} alt={recipe.name} />
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>My Recipes</h2>
        <div className="recipe-list">
          {dummyRecipes.map(recipe => (
            <div className="recipe-item" key={recipe.id}>
              <img src={process.env.PUBLIC_URL + recipe.poster} alt={recipe.name} />
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Commented Recipes</h2>
        <div className="recipe-list">
          {dummyRecipes.map(recipe => (
            <div className="recipe-item" key={recipe.id}>
              <img src={process.env.PUBLIC_URL + recipe.poster} alt={recipe.name} />
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;