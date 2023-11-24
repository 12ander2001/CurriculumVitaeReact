import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Interests = () => {
 const [name, setName] = useState('');
 const [error, setError] = useState('');
 const [token, setToken] = useState(''); 
 const [curriculumId, setCurriculumId] = useState(''); 
 const [interests, setInterests] = useState([]); 

 // Obtén el token del almacenamiento local
 useEffect(() => {
  const curriculumId = Number(localStorage.getItem('curriculumId'));
  const token = localStorage.getItem('authToken');
 
  console.log('curriculumId:', curriculumId);
  console.log('token:', token);
  if (curriculumId && token) {
   axios.get(`http://localhost:8000/curriculumvitae/interests/`, {
     headers: {
       'Authorization': `Token ${token}`
     }
   })
   .then(response => {
     // Filtrar los resultados por contactId
     const filteredResults = response.data.filter(item => item.curriculum === curriculumId);
     console.log('Interests:', filteredResults);
     setInterests(filteredResults);
   })
   .catch(error => {
     console.error('Error al obtener los Intereses:', error);
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

 if (!name) {
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

 const data = { name, curriculum: curriculumId };
 console.log('Data to be sent:', data); // Imprime los datos que se enviarán
 const responsePost = await axios.post('http://localhost:8000/curriculumvitae/interests/', data, { headers });

 // Accede al id correctamente
 console.log('Id del objeto creado:', responsePost.data);

 setName('');
 setError('Interes insertado con éxito');
 setInterests(prevLinks => [...prevLinks, responsePost.data]);
 } catch (error) {
 console.error(error);
 }  
 };

 const handleUpdate = async (id) => {
  try {

   const response = await axios.put(`http://localhost:8000/curriculumvitae/interests/${id}/`, {
     name,
     curriculum: localStorage.getItem('curriculumId'),
   }, {
     headers: {
       'Authorization': `Token ${token}`,
       'Content-Type': 'application/json'
     }
   });
   console.log('Interes actualizado:', response.data);

   setName('');
   setError('Interes actualizado con éxito');
   setInterests(prevLinks => prevLinks.map(link => link.id === id ? response.data : link));

  } catch (error) {
   document.getElementById('error-message').textContent = 'Error al actualizar el Interes: ' + error.message;
  }
  
 };
 

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/curriculumvitae/interests/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Interes eliminado:', response.data);

    setName('');
    setError('Interes eliminado con éxito');
    setInterests(prevLinks => prevLinks.filter(link => link.id !== id));

  } catch (error) {
    console.error('Error al eliminar el Interes:', error);
  }
};

const handleLinkClick = (event, link) => {
  event.preventDefault(); // Evita que la página se refresque
  setName(link.name);
 };

 return (
 <div>
 <h2>Interests</h2>
 {error && <p>{error}</p>}
 <form onSubmit={handleSubmit}>
 <label>
 Name:
 <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
 </label>
 <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Insertar</button>
 </form>
 <h1> Intereses</h1>
  {interests.map((link) => (
 <li key={link.id}>
 <a href={link.name} onClick={(event) => handleLinkClick(event, link)}>Nombre: {link.name}</a>
 <button type="button" onClick={() => handleUpdate(link.id)} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Actualizar</button>
 <button type="button" onClick={() => handleDelete(link.id)} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>Eliminar</button>
</li>
))}
 </div>
 );
};

export default Interests;
