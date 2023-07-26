import React, { useState } from 'react';

const PWFinder = () => {
  // Sample list of users with their information including password
  const users = [
    { id: 'user1', name: 'John Doe', phone: '1234567890', email: 'john@example.com', password: 'password1' },
    { id: 'user2', name: 'Jane Smith', phone: '9876543210', email: 'jane@example.com', password: 'password2' },
    { id: 'user3', name: 'Michael Johnson', phone: '5555555555', email: 'michael@example.com', password: 'password3' },
    // Add more users as needed
  ];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [foundUser, setFoundUser] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFindUser = () => {
    const user = users.find((user) => user.name === name && user.phone === phone && user.email === email);
    setFoundUser(user);
  };

  const handleUpdatePassword = () => {
    if (!foundUser) {
      alert('User not found or incorrect information');
      return;
    }

    if (!password) {
      alert('Please enter a new password');
      return;
    }

    // Here you can implement the logic to update the user's password in your backend or state management system.
    // For simplicity, let's just show an alert message here.
    alert(`Password for ${foundUser.name} updated successfully!`);
  };

  return (
    <div>
      <h1>Password Finder and Update</h1>
      <div>
        <input type="text" value={name} onChange={handleNameChange} placeholder="Enter name" />
        <input type="text" value={phone} onChange={handlePhoneChange} placeholder="Enter phone number" />
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
        {foundUser && (
          <div>
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter new password" />
          </div>
        )}
        <button onClick={handleFindUser}>Find User</button>
        <button onClick={handleUpdatePassword} disabled={!foundUser}>Update Password</button>
      </div>
      {foundUser && (
        <div>
          <p>User found: {foundUser.name}</p>
          {/* Optionally, you can show additional user information here */}
        </div>
      )}
    </div>
  );
};

export default PWFinder;