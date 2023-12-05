import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/login/', {
        email,
        password,
      });

      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;

      if (response.data.user_id === 1) {
        navigate('/curriculum-others');
      } else {
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError({ message: error.response.data.error });
      } else {
        setError({ message: 'Ocurrió un error al iniciar sesión' });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    axios.defaults.headers.common['Authorization'] = null;
    navigate('/');
  };

  return (
    <>
      {localStorage.getItem('authToken') && navigate('/home')}
      <div className="login-form">
        <h1>Iniciar sesión</h1>
        {error && <p>{error.message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <Link to="/register">Registrarse</Link>
      </div>
    </>
  );
};

export default Login;
