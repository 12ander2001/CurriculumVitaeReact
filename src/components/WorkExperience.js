import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkExperience = () => {
 const [name, setName] = useState('');
 const [place, setPlace] = useState('');
 const [range, setRange] = useState('');
 const [description, setDescription] = useState('');
 const [error, setError] = useState('');
 const [token, setToken] = useState(''); 
 const [curriculumId, setCurriculumId] = useState('');
 const [workexperience, setWorkExperience] = useState([]); 

 // Obtén el token del almacenamiento local
 useEffect(() => {
  const curriculumId = Number(localStorage.getItem('curriculumId'));
  const token = localStorage.getItem('authToken');
 
  console.log('curriculumId:', curriculumId);
  console.log('token:', token);
  if (curriculumId && token) {
   axios.get(`http://localhost:8000/curriculumvitae/workexperience/`, {
     headers: {
       'Authorization': `Token ${token}`
     }
   })
   .then(response => {
     // Filtrar los resultados por contactId
     const filteredResults = response.data.filter(item => item.curriculum === curriculumId);
     console.log('WorkExperience:', filteredResults);
     setWorkExperience(filteredResults);
   })
   .catch(error => {
     console.error('Error al obtener las Experiencias de Trabajo:', error);
   });
  };
    console.log(curriculumId)
    console.log('Token:', token);
    setToken(token);
    setCurriculumId(curriculumId);
   }, []);
  

 const handleSubmit = async (e) => {
 e.preventDefault();

 //if (!curriculumId) {
 // alert('Por favor inserte el nombre de su currículo.');
 // return;
//}

 if (!name || !place || !range || !description) {
 setError('Please fill in all fields');
 return;
 }

 try {
 const response = await axios.get(`http://localhost:8000/curriculumvitae/curriculumvitae/`, {
 headers: {
 'Authorization': `Token ${token}`
 }
 });
 console.log(curriculumId)
 if (response.data.length > 0) {
 const curriculumId = response.data[0].id;
 setCurriculumId(curriculumId);
 } else {
 console.error('El usuario no tiene un currículo.');
 }

 const headers = {
 'Authorization': `Token ${token}`,
 'Content-Type': 'application/json'
 };

 const data = { name, place, range, description, curriculum: curriculumId };
 console.log('Data to be sent:', data); // Imprime los datos que se enviarán
 const responsePost = await axios.post('http://localhost:8000/curriculumvitae/workexperience/', data, { headers });

 // Accede al id correctamente
 console.log('Id del objeto creado:', responsePost.data);

 setName('');
 setPlace('');
 setRange('');
 setDescription('');
 setError('Experiencia de Trabajo insertada con éxito');
 setWorkExperience(prevLinks => [...prevLinks, responsePost.data]);

 } catch (error) {
 console.error(error);
 }
 };

 const handleUpdate = async (id) => {
  try {

   const response = await axios.put(`http://localhost:8000/curriculumvitae/workexperience/${id}/`, {
     name,
     place,
     range,
     description,
     curriculum: localStorage.getItem('curriculumId'),
   }, {
     headers: {
       'Authorization': `Token ${token}`,
       'Content-Type': 'application/json'
     }
   });
   console.log('WorkExperience actualizado:', response.data);

   setName('');
   setPlace('');
   setRange('');
   setDescription('');
   setError('Experiencia de Trabajo actualizada con éxito');
   setWorkExperience(prevLinks => prevLinks.map(link => link.id === id ? response.data : link));

  } catch (error) {
   document.getElementById('error-message').textContent = 'Error al actualizar la Experiencia de Trabajo: ' + error.message;
  }
  
 };
 

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/curriculumvitae/workexperience/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('WorkExperience eliminado:', response.data);

    setName('');
    setPlace('');
    setRange('');
    setDescription('');
    setError('Experiencia de trabajo eliminada con éxito');
    setWorkExperience(prevLinks => prevLinks.filter(link => link.id !== id));

  } catch (error) {
    console.error('Error al eliminar la Experiencia de Trabajo:', error);
  }
};

const handleLinkClick = (event, link) => {
  event.preventDefault(); // Evita que la página se refresque
  setName(link.name);
  setPlace(link.place);
  setRange(link.range);
  setDescription(link.description);
 };

 return (
 <div className='wrapper'>
 <h2>Experiencia de Trabajo</h2>
 {error && <p>{error}</p>}
 <form onSubmit={handleSubmit}>
 <label>
 Nombre de la Institución:
 <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
 </label>
 <label>
 Plaza:
 <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
 </label>
 <label>
 Rango:
 <input type="text" value={range} onChange={(e) => setRange(e.target.value)} />
 </label>
 <label>
 Descripción:
 <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
 </label>
 <button type="submit" >Insertar</button>
 </form>
 <div className='containercontact'>
 <h1 className='titlecontact'> Mis Experiencias de Trabajo </h1>
  {workexperience.map((link) => (
 <li key={link.id}>
 <a href={link.place} className='info' onClick={(event) => handleLinkClick(event, link)}>Nombre: {link.name}</a>
 <p className='info'>Plaza: {link.place}</p>
 <p className='info'>Rango: {link.range}</p>
 <p>Descripción: {link.description}</p>
 <button type="button" onClick={() => handleUpdate(link.id)} >Actualizar</button>
 <button type="button" onClick={() => handleDelete(link.id)} >Eliminar</button>
</li>
))}
</div>
 </div>
 );
};

export default WorkExperience;
