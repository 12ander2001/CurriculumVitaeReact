import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactInfo() {
 const [phone, setPhone] = useState('');
 const [direccion, setDireccion] = useState('');
 const navigate = useNavigate();

 useEffect(() => {
  const userId = localStorage.getItem('userId');
  if (userId) {
  }
 }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (phone && direccion) {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        console.log('User ID:', userId);
        console.log({
          user_id: userId,
          phone: phone,
          direccion: direccion
        });
        console.log('Token:', token);
        const response = await axios.post('http://localhost:8000/curriculumvitae/contactinfo/', {
          user_id: userId,
          phone: phone,
          direccion: direccion
        }, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        console.log('Objeto devuelto por mi backend:', response);
        // Guardar el ID del contacto en el almacenamiento local
        localStorage.setItem('contactId', response.data.id);
        navigate('/SocialLinks');
      }
    } catch (error) {
      console.error('Error al guardar el contacto:', error);
    }
  }
 };

 return (
  <div>
    <h1>Crear tu Propio Contacto</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <label htmlFor="direccion">Direccion:</label>
      <input
        type="text"
        value={direccion}
        onChange={e => setDireccion(e.target.value)}
        required
      />
      <button
        type="submit"
        style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Crear Contacto
      </button>
    </form>
  </div>
 );
};

export default ContactInfo;
