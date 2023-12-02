import React, {useState, useEffect } from 'react';
import axios from 'axios';

function CurriculumVitae(){
 const [description, setDescription] = useState('');
 const [curriculumId, setCurriculumId] = useState(null);

 useEffect(() => {
  const userId = localStorage.getItem('userId');
  const curriculumId = localStorage.getItem('curriculumId');
  const token = localStorage.getItem('authToken');
 
  console.log('userId:', userId);
  console.log('curriculumId:', curriculumId);
  console.log('token:', token);
 
  if (userId && curriculumId && token) {
    axios.get(`http://localhost:8000/curriculumvitae/curriculumvitae/${curriculumId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      console.log(' CurriculumVitae:', response.data);
      setCurriculumId(response.data);
    })
    .catch(error => {
      console.error('Error al obtener el curriculo:', error);
    });
  }
 }, []);

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

   const fieldsToShow = ['description'];
  const displayNames = ['Nombre'];

 return (
 <div className='wrapper'>
   <h1>Crear tu Propio Currículo</h1>
   <form onSubmit={handleSubmit}>
   <label htmlFor="nameinst">Nombre:</label>
     <input
       type="text"
       value={description}
       onChange={e => setDescription(e.target.value)}
       required
     />
     <button
       type="submit"
     >
       Crear Currículo
     </button>
   </form>
  <form>
    <button
      type="button"
      onClick={handleUpdate}
    >
      Actualizar Currículo
    </button>
    <button
      type="button"
      onClick={handleDelete}
    >
      Eliminar Currículo
    </button>
  </form>
  <div className='containercontact'>
 <h1 className='titlecontact'>Nombre del Currículo</h1>
 {console.log (curriculumId)}
 {curriculumId && Object.keys(curriculumId).filter(key => fieldsToShow.includes(key)).map((key, index) => (
 <p key={key} className='info'>{displayNames[index]}: {curriculumId[key]}</p>
 ))}
</div>
 </div>
 );
};

export default CurriculumVitae;
