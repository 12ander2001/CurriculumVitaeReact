import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Skills = () => {
 const [name, setName] = useState('');
 const [assessment, setAssessment] = useState('');
 const [error, setError] = useState('');
 const [token, setToken] = useState(''); 
 const [curriculumId, setCurriculumId] = useState(); 
 const [skills, setSkills] = useState([]); 

 // Obtén el token del almacenamiento local
 useEffect(() => {
  const curriculumId = Number(localStorage.getItem('curriculumId'));
  const token = localStorage.getItem('authToken');
 
  console.log('curriculumId:', curriculumId);
  console.log('token:', token);
  if (curriculumId && token) {
   axios.get(`http://localhost:8000/curriculumvitae/skills/`, {
     headers: {
       'Authorization': `Token ${token}`
     }
   })
   .then(response => {
     // Filtrar los resultados por contactId
     const filteredResults = response.data.filter(item => item.curriculum === curriculumId);
     console.log('Skills:', filteredResults);
     setSkills(filteredResults);
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

 if (!name || !assessment) {
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

 const data = { name, assessment, curriculum: curriculumId };
 console.log('Data to be sent:', data); // Imprime los datos que se enviarán
 const responsePost = await axios.post('http://localhost:8000/curriculumvitae/skills/', data, { headers });

 // Accede al id correctamente
 console.log('Id del objeto creado:', responsePost.data);

 setName('');
 setAssessment('');
 setError('Habilidad insertada con éxito');
 setSkills(prevLinks => [...prevLinks, responsePost.data]);
 } catch (error) {
 console.error(error);
 }
 };

 const handleUpdate = async (id) => {
  try {

   const response = await axios.put(`http://localhost:8000/curriculumvitae/skills/${id}/`, {
     name,
     assessment,
     curriculum: localStorage.getItem('curriculumId'),
   }, {
     headers: {
       'Authorization': `Token ${token}`,
       'Content-Type': 'application/json'
     }
   });
   console.log('Skills actualizado:', response.data);

   setName('');
   setAssessment('');
   setError('Habilidad actualizada con éxito');
   setSkills(prevLinks => prevLinks.map(link => link.id === id ? response.data : link));

  } catch (error) {
   document.getElementById('error-message').textContent = 'Error al actualizar la Habilidad: ' + error.message;
  }
  
 };
 

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/curriculumvitae/skills/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Skills eliminado:', response.data);

    setName('');
    setAssessment('');
    setError('Habilidad eliminada con éxito');
    setSkills(prevLinks => prevLinks.filter(link => link.id !== id));

  } catch (error) {
    console.error('Error al eliminar la Habilidad:', error);
  }
};

const handleLinkClick = (event, link) => {
  event.preventDefault(); // Evita que la página se refresque
  setName(link.name);
  setAssessment(link.assessment);
 };

 return (
 <div className='wrapper'>
 <h1>Habilidad</h1>
 {error && <p>{error}</p>}
 <form onSubmit={handleSubmit}>
 <label>
   Nombre:
   <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
 </label>
 <label>
   Descripcion de la habilidad:
   <input type="text" value={assessment} onChange={(e) => setAssessment(e.target.value)} />
 </label>
 <button type="submit" >Insertar</button>
 </form>
 <div className='containercontact'>
 <h1 className='titlecontact'>Mis Habilidades</h1>
  {skills.map((link) => (
 <li key={link.id}>
 <a href={link.assessment} className='info' onClick={(event) => handleLinkClick(event, link)}>Nombre: {link.name}</a>
 <p className='info'>Habilidad: {link.assessment}</p>
 <button type="button" onClick={() => handleUpdate(link.id)} >Actualizar</button>
 <button type="button" onClick={() => handleDelete(link.id)} >Eliminar</button>
</li>
))}
</div>
 </div>
 );
};

export default Skills;


