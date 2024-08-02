import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'

const API_URL = 'https://claw-server.onrender.com/api/auth/register'; 

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { email, password });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data); 
      } else {
        setError('An unexpected error occurred.'); 
      }
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='auth-container'>
      
      
      <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Register</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">*{error}</p>}
    </div>
  );
}

export default Register;
