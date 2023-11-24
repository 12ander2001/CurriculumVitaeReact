import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ContactInfo() {
 const [phone, setPhone] = useState('');
 const [direccion, setDireccion] = useState('');
 const [contactInfo, setContactInfo] = useState(null);

 useEffect(() => {
  const userId = localStorage.getItem('userId');
  const contactId = localStorage.getItem('contactId');
  const token = localStorage.getItem('authToken');
 
  console.log('userId:', userId);
  console.log('contactId:', contactId);
  console.log('token:', token);
 
  if (userId && contactId && token) {
    axios.get(`http://localhost:8000/curriculumvitae/contactinfo/${contactId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      console.log('Contact Info:', response.data);
      setContactInfo(response.data);
    })
    .catch(error => {
      console.error('Error al obtener el contacto:', error);
    });
  }
},[]);

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

          //Tratar de renderizar la vista en tiempo real
          //setContactInfo(response.data); 

        
        console.log('Objeto devuelto por mi backend:', response);
        // Guardar el ID del contacto en el almacenamiento local
        localStorage.setItem('contactId', response.data.id);
      }

     setPhone('');
     setDireccion('');

    } catch (error) {
      console.error('Error al guardar el contacto:', error);
    }
  }
 };

 const handleUpdate = async (e) => {
  e.preventDefault();
  if (phone && direccion) {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      const contactId = localStorage.getItem('contactId');
 
      if (token && userId && contactId) {
        console.log('User ID:', userId);
        console.log('Contact ID:', contactId);
        console.log({
          user_id: userId,
          phone: phone,
          direccion: direccion
        });
        console.log('Token:', token);
        const response = await axios.put(`http://localhost:8000/curriculumvitae/contactinfo/${contactId}/`, {
          user_id: userId,
          phone: phone,
          direccion: direccion
        }, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
 
        console.log('Objeto devuelto por mi backend:', response);
      }
    } catch (error) {
      console.error('Error al actualizar el contacto:', error);
    }
  }
 };
 
 const handleDelete = async () => {
  try {
   const token = localStorage.getItem('authToken');
   const contactId = localStorage.getItem('contactId');
 
   if (token && contactId) {
     console.log('Contact ID:', contactId);
     console.log('Token:', token);
     const response = await axios.delete(`http://localhost:8000/curriculumvitae/contactinfo/${contactId}/`, {
       headers: {
         'Authorization': `Token ${token}`
       }
     });

     console.log('Objeto devuelto por mi backend:', response);
     // Eliminar el ID del contacto del almacenamiento local
     localStorage.removeItem('contactId');
   }
  } catch (error) {
   console.error('Error al eliminar el contacto:', error);
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
      <button
        type="submit"
        onClick={handleUpdate}
        style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Actualizar Contacto
      </button>
      <button
        type="button"
        onClick={handleDelete}
        style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Eliminar Contacto
      </button>
    </form>
    <div>
      <h1> Tu Contact Info</h1>
      {contactInfo && Object.keys(contactInfo).map(key => (
        <p key={key}>{key}: {contactInfo[key]}</p>
      ))}
    </div>
  </div>
 );
 
};

export default ContactInfo;
