import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactInfo.css'

const userIdLocal = localStorage.getItem('userId');
const contactIdLocal = localStorage.getItem('contactId');
const token = localStorage.getItem('authToken');
function ContactInfo() {
 const [phone, setPhone] = useState('');
 const [direccion, setDireccion] = useState('');
 const [contactId, setContactId] = useState(contactIdLocal);
 const [contactinfo, setContactInfo] = useState(null);
 
 const [userId, setUserId] = useState(userIdLocal);

 const render = localStorage.getItem('userId', 'token', 'contactId');
 console.log('Fuera userId:', userIdLocal);

 const getAuthenticateUser = async ()=> {
  const {data} = await axios.get('http://localhost:8000/user/users/')
  console.log(data);// eslint-disable-next-line
  setUserId( data.find(({id})=> id == userIdLocal).id)
 }

 const getContactInfoFromUserId = async () => {
   const {data} = await axios.get(`http://localhost:8000/curriculumvitae/contactinfo/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  // eslint-disable-next-line
  setContactId(data.find(({user})=> user == userIdLocal).id)
  localStorage.setItem("contactId", contactId)
 
 }
 

 useEffect(() => {
  console.log("aaaaaaaaaaaaaa",userId, contactId);
  getAuthenticateUser()
  getContactInfoFromUserId()
  if (userId && contactId) {
    axios.get(`http://localhost:8000/curriculumvitae/contactinfo/${contactId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      console.log(contactId)
      console.log('Contact Info:', response.data);
      setContactInfo(response.data)
      
    })
    .catch(error => {
      console.error('Error al obtener el contacto:', error);
    });
  }// eslint-disable-next-line
},[render, contactId, userId]);

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
        setContactInfo(response.data.data)
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

 const fieldsToShow = ['phone', 'direccion', 'user_email', 'user_username', 'user_firstname', 'user_lastname'];
 const displayNames = ['Teléfono', 'Dirección', 'Correo', 'Usuario', 'Nombre', 'Apellidos'];
 
 return (
  <div className='wrapper'>
    <h1>Añadir Teléfono y Dirección a mi Contacto</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="phone">Teléfono:</label>
      <input
        type="text"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <label htmlFor="direccion">Dirección:</label>
      <input
        type="text"
        value={direccion}
        onChange={e => setDireccion(e.target.value)}
        required
      />
      <button className='botton'
        type="submit"
      >
        Crear Contacto
      </button>
      <button className='botton'
        type="submit"
        onClick={handleUpdate}
      >
        Actualizar Contacto
      </button>
      <button className='botton'
        type="button"
        onClick={handleDelete}
      >
        Eliminar Contacto
      </button>
    </form>
    <div className='containercontact'>
 <h1 className='titlecontact'>Info de mi Contacto</h1>
 {contactinfo && Object.keys(contactinfo).filter(key => fieldsToShow.includes(key)).map((key, index) => (
 <p key={key} className='info'>{displayNames[index]}: {contactinfo[key]}</p>
 ))}
</div>
  </div>
 );
  
};

export default ContactInfo;
