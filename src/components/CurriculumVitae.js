import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurriculumVitae() {
  const [description, setDescription] = useState('');
  const [curriculumId, setCurriculumId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const curriculumId = localStorage.getItem('curriculumId');
    const token = localStorage.getItem('authToken');

    if (userId && curriculumId && token) {
      axios.get(`http://localhost:8000/curriculumvitae/curriculumvitae/${curriculumId}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        setCurriculumId(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el currículo:', error);
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
          const response = await axios.post('http://localhost:8000/curriculumvitae/curriculumvitae/', {
            id_user: userId,
            description: description
          }, {
            headers: {
              'Authorization': `Token ${token}`
            }
          });

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
          const response = await axios.put(`http://localhost:8000/curriculumvitae/curriculumvitae/${curriculumId}/`, {
            id_user: curriculumId,
            description: description
          }, {
            headers: {
              'Authorization': `Token ${token}`
            }
          });

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
        const response = await axios.delete(`http://localhost:8000/curriculumvitae/curriculumvitae/${curriculumId}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

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
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Crear Currículo</button>
      </form>
      <form>
        <button type="button" onClick={handleUpdate}>Actualizar Currículo</button>
        <button type="button" onClick={handleDelete}>Eliminar Currículo</button>
      </form>
      <div className='containercontact'>
        <h1 className='titlecontact'>Nombre del Currículo</h1>
        {curriculumId && Object.keys(curriculumId).filter(key => fieldsToShow.includes(key)).map((key, index) => (
          <p key={key} className='info'>{displayNames[index]}: {curriculumId[key]}</p>
        ))}
      </div>
    </div>
  );
};

export default CurriculumVitae;
