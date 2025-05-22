// File: frontend/src/pages/CreateSoftware.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateSoftware = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState('Read,Write,Admin');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/software',
        {
          name,
          description,
          accessLevels: accessLevels.split(',').map(level => level.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Software created successfully');
      setName('');
      setDescription('');
      setAccessLevels('Read,Write,Admin');
    } catch (err) {
      console.error(err);
      alert('Creation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Software</h2>
      <input
        type="text"
        placeholder="Software Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Access Levels (comma-separated)"
        value={accessLevels}
        onChange={(e) => setAccessLevels(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateSoftware;
