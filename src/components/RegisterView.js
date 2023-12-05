import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const RegisterView = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    firstname: '',
    lastname: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/register/', formData);
      console.log(response.data); // Maneja la respuesta del backend según tus necesidades
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="login-form">
      <h1>Registrar</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleInputChange}
      />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default RegisterView;
