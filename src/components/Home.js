import React, {useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
 const [description, setDescription] = useState('');
 const navigate = useNavigate();

 const handleClick = () => {
  navigate("/curriculum-vitae");
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (description) {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
 
      if (token && userId) {
        console.log('User ID:', userId);
        console.log({
          id_user: userId,
          description: description
        });
        console.log('Token:', token);
        const response = await axios.post('http://localhost:8000/curriculumvitae/curriculumvitae/', {
          id_user: userId,
          description: description
        }, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log('Objeto devuelto por mi backend:', response);
        // Guardar el ID del currículo en el almacenamiento local
        localStorage.setItem('curriculumId', response.data.id);
        navigate('/crear-curriculum');
      }
    } catch (error) {
      console.error('Error al guardar el currículum:', error);
    }
  }
 };

 const handleUpdate = async (e) => {
  e.preventDefault();
  if (description) {
    try {
      const token = localStorage.getItem('authToken');
      const curriculumId = localStorage.getItem('curriculumId');
 
      if (token && curriculumId) {
        console.log('Curriculum ID:', curriculumId);
        console.log({
          id_user: curriculumId,
          description: description
        });
        console.log('Token:', token);
        const response = await axios.put(`http://localhost:8000/curriculumvitae/curriculumvitae/${curriculumId}/`, {
          id_user: curriculumId,
          description: description
        }, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
 
        console.log('Objeto devuelto por mi backend:', response);
        // Actualizar el ID del currículum en el almacenamiento local
        localStorage.setItem('curriculumId', response.data.id);
        navigate('/crear-curriculum');
      }
    } catch (error) {
      console.error('Error al actualizar el currículum:', error);
    }
  }
 };
 
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
     const token = localStorage.getItem('authToken');
     const curriculumId = localStorage.getItem('curriculumId');
   
     if (token && curriculumId) {
       console.log('Curriculum ID:', curriculumId);
       console.log('Token:', token);
       const response = await axios.delete(`http://localhost:8000/curriculumvitae/curriculumvitae/${curriculumId}/`, {
         headers: {
           'Authorization': `Token ${token}`
         }
       });
   
       console.log('Objeto devuelto por mi backend:', response);
       // Eliminar el ID del currículum del almacenamiento local
       localStorage.removeItem('curriculumId');
     }
    } catch (error) {
     console.error('Error al eliminar el currículum:', error);
    }
   };
   

 return (
 <div>
   <h1>Crear tu Propio Currículo</h1>
   <form onSubmit={handleSubmit}>
   <label htmlFor="nameinst">Name Curriculum:</label>
     <input
       type="text"
       value={description}
       onChange={e => setDescription(e.target.value)}
       required
     />
     <button
       type="submit"
       style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}
     >
       Crear Currículo
     </button>
   </form>
   <h1>Actualizar, Eliminar o Visualizar Currículo</h1>
  <form>
    <button
      type="button"
      onClick={handleUpdate}
      style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Actualizar Currículo
    </button>
    <button
      type="button"
      onClick={handleDelete}
      style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Eliminar Currículo
    </button>
    <button 
    type="button"
    onClick={handleClick}
    style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Visualizar Curriculos
    </button>
  </form>
 </div>
 );
};

export default Home;
