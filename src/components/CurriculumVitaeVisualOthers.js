import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CurriculumVitaeVisualOthers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/users/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        setError('Error al obtener la lista de usuarios.');
      } finally {
        setIsLoading(false);
      }
    };

    if (token && userId) {
      fetchUsers();
    } else {
      // Manejar el caso en el que no hay token o usuario
      navigate('/'); // Redirigir a la página de inicio de sesión, por ejemplo
    }
  }, [navigate]);

  return (
    <div>
      <h1>Observa los Currículos de otros Usuarios</h1>
      {isLoading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/curriculum-vitae/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link to="/curriculum-vitae">Ver tu propio Currículum</Link>
      </p>
    </div>
  );
};

export default CurriculumVitaeVisualOthers;
