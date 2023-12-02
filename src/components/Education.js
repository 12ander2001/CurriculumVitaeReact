import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Education = () => {
 const [nameinst, setNameinst] = useState('');
 const [title, setTitle] = useState('');
 const [range, setRange] = useState('');
 const [curse, setCurse] = useState('');
 const [description, setDescription] = useState('');
 const [error, setError] = useState('');
 const [token, setToken] = useState(''); 
 const [curriculumId, setCurriculumId] = useState(''); 
 const [education, setEducation] = useState([]);

 // Obtén el token del almacenamiento local
 useEffect(() => {
  const curriculumId = Number(localStorage.getItem('curriculumId'));
  const token = localStorage.getItem('authToken');
 
  console.log('curriculumId:', curriculumId);
  console.log('token:', token);
  if (curriculumId && token) {
   axios.get(`http://localhost:8000/curriculumvitae/education/`, {
     headers: {
       'Authorization': `Token ${token}`
     }
   })
   .then(response => {
     // Filtrar los resultados por contactId
     const filteredResults = response.data.filter(item => item.curriculum === curriculumId);
     console.log('Education:', filteredResults);
     setEducation(filteredResults);
   })
   .catch(error => {
     console.error('Error al obtener los enlaces sociales:', error);
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

 if (!nameinst || !title || !range || !curse || !description) {
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

 const data = { nameinst, title, range, curse, description, curriculum: curriculumId };
 console.log('Data to be sent:', data); // Imprime los datos que se enviarán
 const responsePost = await axios.post('http://localhost:8000/curriculumvitae/education/', data, { headers });

 // Accede al id correctamente
 console.log('Id del objeto creado:', responsePost.data);

 setNameinst('');
 setTitle('');
 setRange('');
 setCurse('');
 setDescription('');
 setError('Educación insertada con éxito');
 setEducation(prevLinks => [...prevLinks, responsePost.data]);
 } catch (error) {
 console.error(error);
 }
 };

 const handleUpdate = async (id) => {
  try {

   const response = await axios.put(`http://localhost:8000/curriculumvitae/education/${id}/`, {
     nameinst,
     title,
     range,
     curse,
     description,
     curriculum: localStorage.getItem('curriculumId'),
   }, {
     headers: {
       'Authorization': `Token ${token}`,
       'Content-Type': 'application/json'
     }
   });
   console.log('Education actualizado:', response.data);

   setNameinst('');
   setTitle('');
   setRange('');
   setCurse('');
   setDescription('');
   setError('Educación actualizada con éxito');
   setEducation(prevLinks => prevLinks.map(link => link.id === id ? response.data : link));

  } catch (error) {
   document.getElementById('error-message').textContent = 'Error al actualizar la Educación: ' + error.message;
  }
  
 };
 

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/curriculumvitae/education/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Education eliminado:', response.data);

    setNameinst('');
    setTitle('');
    setRange('');
    setCurse('');
    setDescription('');
    setError('Educación eliminada con éxito');
    setEducation(prevLinks => prevLinks.filter(link => link.id !== id));

  } catch (error) {
    console.error('Error al eliminar la Educación:', error);
  }
};

const handleLinkClick = (event, link) => {
  event.preventDefault(); // Evita que la página se refresque
  setNameinst(link.nameinst);
  setTitle(link.title);
  setRange(link.range);
  setCurse(link.curse);
  setDescription(link.description);
 };

 return (
 <div className='wrapper'>
 <h1>Educación</h1>
 {error && <p>{error}</p>}
 <form onSubmit={handleSubmit}>
 <label>
  Nombre de la Institución:
  <input type="text" value={nameinst} onChange={(e) => setNameinst(e.target.value)} />
 </label>
 <label>
  Título:
  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
 </label>
 <label>
  Rango:
  <input type="text" value={range} onChange={(e) => setRange(e.target.value)} />
 </label>
 <label>
  Curso:
  <input type="text" value={curse} onChange={(e) => setCurse(e.target.value)} />
 </label>
 <label>
  Descripción:
  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
 </label>
 <button type="submit" >Insertar</button>
 </form>
 <div className='containercontact'>
 <h1 className='titlecontact'>Mis Educaciones</h1>
  {education.map((link) => (
 <li key={link.id}>
 <a href={link.title} className='info' onClick={(event) => handleLinkClick(event, link)}>Nombre de la Institución: {link.nameinst}</a>
 <p className='info'>Título: {link.title}</p>
 <p className='info'>Rango: {link.range}</p>
 <p className='info'>Curso: {link.curse}</p>
 <p className='info'>Descripción: {link.description}</p>
 <button type="button" onClick={() => handleUpdate(link.id)} >Actualizar</button>
 <button type="button" onClick={() => handleDelete(link.id)} >Eliminar</button>
</li>
))}
</div>
 </div>
 );
};

export default Education;
