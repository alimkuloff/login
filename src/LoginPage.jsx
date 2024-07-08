import React, { useState } from 'react';
import axios from "./api";
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.length >= 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', {
        email: email,
        password: password,
      });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      console.log('Login muvaffaqiyatli, token saqlandi:', token);
    } catch (error) {
      console.error('Xato:', error.response ? error.response.data : error);
      setError(error.response ? error.response.data.message : 'Xatolik yuz berdi');
    }
  };
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="loginpage">
      <h2>Kirish</h2>
      <form onSubmit={handleSubmit}>
        <div className='email'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{ borderColor: emailValid ? 'initial' : 'red' }}
          />
          {!emailValid && <small style={{ color: 'red' }}>Email formati noto'g'ri</small>}
        </div>
        <div className='password'>
          <label>Parol:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ borderColor: passwordValid ? 'initial' : 'red' }}
          />
          {!passwordValid && <small style={{ color: 'red' }}>Parol kamida 6 ta belgidan iborat bo'lishi kerak</small>}
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className='btn'>Kirish</button>
      </form>
    </div>
  );
};

export default LoginPage;
