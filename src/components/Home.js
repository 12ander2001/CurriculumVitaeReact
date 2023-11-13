import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/users/');
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de usuarios registrados</h1>
      <Link to="/crear-curriculum" style={{ textDecoration: 'none' }}>
        <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
          Crear Currículum
        </button>
      </Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/curriculum-vitae/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
