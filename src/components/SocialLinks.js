import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialLinks = () => {
 const [nombre, setNombre] = useState('');
 const [url, setUrl] = useState('');
 const [error, setError] = useState('');
 const [token, setToken] = useState(''); 
 const [contactId, setcontactId] = useState(''); 
 const [socialLinks, setSocialLinks] = useState([]);


 // Obtén el token del almacenamiento local
 useEffect(() => {
 const contactId = Number(localStorage.getItem('contactId'));
 const token = localStorage.getItem('authToken');

 console.log('contactId:', contactId);
 console.log('token:', token);
 if (contactId && token) {
  axios.get(`http://localhost:8000/curriculumvitae/sociallinks/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  .then(response => {
    // Filtrar los resultados por contactId
    const filteredResults = response.data.filter(item => item.contact_info === contactId);
    console.log('Social Links:', filteredResults);
    setSocialLinks(filteredResults);
  })
  .catch(error => {
    console.error('Error al obtener los enlaces sociales:', error);
  });
 };
 console.log(contactId)
 console.log('Token:', token);
 setToken(token);
 setcontactId(contactId);
}, []);

 


 const handleSubmit = async (e) => {
   e.preventDefault();

 //if (!contactId) {
 //   alert('Por favor inserte su teléfono y dirección.');
 //   return;
 //}

   if (!nombre || !url) {
     setError('Inserte su red Social y su url');
     return;
   }

   try {
     const response = await axios.get(`http://localhost:8000/curriculumvitae/contactinfo/`, {
       headers: {
         'Authorization': `Token ${token}`
       }
     });
     console.log(contactId)
     if (response.data.length > 0) {
       const contactId = response.data[0].id;
       setcontactId(contactId);
     } else {
       console.error('El usuario no tiene un currículo.');
     }

     const headers = {
       'Authorization': `Token ${token}`,
       'Content-Type': 'application/json'
     };

     const data = { nombre, url, contact_info: contactId };
     console.log('Data to be sent:', data); // Imprime los datos que se enviarán
     const responsePost = await axios.post('http://localhost:8000/curriculumvitae/sociallinks/', data, { headers });
     // Accede al id correctamente
     console.log('Id del objeto creado:', responsePost.data);

     setNombre('');
     setUrl('');
     setError('Enlace social insertado con éxito');
     setSocialLinks(prevLinks => [...prevLinks, responsePost.data]);
     
   } catch (error) {
     console.error(error);
   }
 };

 function isValidUrl(string) {
  const res = string.match(/^https?:\/\/[^ "]+$/);
  return res !== null;
 } 

 const handleUpdate = async (id) => {
  try {
   if (!isValidUrl(url)) {
     document.getElementById('error-message').textContent = 'Solo se permiten URL';
     return;
   }
 
   const response = await axios.put(`http://localhost:8000/curriculumvitae/sociallinks/${id}/`, {
     nombre,
     url,
     contact_info: localStorage.getItem('contactId'),
   }, {
     headers: {
       'Authorization': `Token ${token}`,
       'Content-Type': 'application/json'
     }
   });
   console.log('Link social actualizado:', response.data);

   setNombre('');
   setUrl('');
   setError('Enlace social actualizado con éxito');
   setSocialLinks(prevLinks => prevLinks.map(link => link.id === id ? response.data : link));

  } catch (error) {
   document.getElementById('error-message').textContent = 'Error al actualizar el enlace social: ' + error.message;
  }
  
 };
 

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/curriculumvitae/sociallinks/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Link social eliminado:', response.data);

    setNombre('');
    setUrl('');
    setError('Enlace social eliminado con éxito');
    setSocialLinks(prevLinks => prevLinks.filter(link => link.id !== id));

  } catch (error) {
    console.error('Error al eliminar el enlace social:', error);
  }
};

const handleLinkClick = (event, link) => {
  event.preventDefault(); // Evita que la página se refresque
  setNombre(link.nombre);
  setUrl(link.url);
 };


 return (
  <div>
  <h2>Social Links</h2>
  {error && <p>{error}</p>}
  <form onSubmit={handleSubmit}> 
    <label>
      Name:
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
    </label>
    <label> 
    <div id="error-message"></div>
      URL:
      <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
    </label>
    <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Insertar</button>
  </form>
  <h1> Tus Links Sociales </h1>
  {socialLinks.map((link) => (
 <li key={link.id}>
 <a href={link.url} onClick={(event) => handleLinkClick(event, link)}>Red Social: {link.nombre}</a>
 <p>Enlace: {link.url}</p>
 <button type="button" onClick={() => handleUpdate(link.id)} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Actualizar</button>
 <button type="button" onClick={() => handleDelete(link.id)} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>Eliminar</button>
</li>
))}


 </div>
 
 );
};

export default SocialLinks;
