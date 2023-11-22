import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

const SocialLinks = () => {
 const [nombre, setNombre] = useState('');
 const [url, setUrl] = useState('');
 const [error, setError] = useState('');
 const [token, setToken] = useState(''); 
 const [contactId, setContactId] = useState(''); 
 const navigate = useNavigate();

 // Obtén el token del almacenamiento local
 useEffect(() => {
  const token = localStorage.getItem('authToken');
  const contactId = localStorage.getItem('contactId');
  console.log(contactId)
  console.log('Token:', token);
  setToken(token);
  setContactId(contactId);
 }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nombre || !url) {
    setError('Please fill in all fields');
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
      setContactId(contactId);
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
    navigate('/Home');
    // Accede al id correctamente
    console.log('Id del objeto creado:', responsePost.data);

    setNombre('');
    setUrl('');
    setError('');
    
  } catch (error) {
    console.error(error);
  }
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
        URL:
        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
 );
};

export default SocialLinks;
