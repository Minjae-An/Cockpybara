import React, { useState } from 'react';

const IDFinder = () => {
  // Sample list of users with their names and IDs
  const users = [
    { id: 'user1', name: 'John Doe' },
    { id: 'user2', name: 'Jane Smith' },
    { id: 'user3', name: 'Michael Johnson' },
    // Add more users as needed
  ];

  const [name, setName] = useState('');
  const [foundID, setFoundID] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFindID = () => {
    const foundUser = users.find((user) => user.name === name);
    if (foundUser) {
      setFoundID(foundUser.id);
    } else {
      setFoundID('User not found');
    }
  };

  return (
    <div>
      <h1>ID Finder</h1>
      <div>
        <input type="text" value={name} onChange={handleNameChange} placeholder="Enter name" />
        <button onClick={handleFindID}>Find ID</button>
      </div>
      <div>
        {foundID && <p>User ID: {foundID}</p>}
      </div>
    </div>
  );
};

export default IDFinder;
