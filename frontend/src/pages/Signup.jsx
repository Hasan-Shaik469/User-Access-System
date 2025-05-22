import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password,
        role,
      });
      alert('Signup successful');
      navigate('/login');
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Sign Up</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
};

export default Signup;
