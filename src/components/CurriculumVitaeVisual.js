import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CurriculumVitaeVisual = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
   
    if (token && userId) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8000/user/users/', {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
          console.log(response.data);
          setUsers(response.data);
        } catch (error) {
          console.error('Error al obtener la lista de usuarios:', error);
        }
      };
    
      fetchUsers();
    }
    }, []);

  return (
    <div>
        <h1>Observa los Currículo de cada Usuario</h1>
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

export default CurriculumVitaeVisual;
