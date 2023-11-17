import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactInfo = () => {
 const [phone, setPhone] = useState('');
 const [direccion, setDireccion] = useState('');
 const navigate = useNavigate();

 useEffect(() => {
 const token = localStorage.getItem('authToken');
 const userId = localStorage.getItem('userId');

 if (token && userId) {
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/users/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };
 
  fetchUsers();
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
         id_user: userId,
         phone: phone,
         direccion: direccion
       });
       console.log('Token:', token);
       const response = await axios.post('http://localhost:8000/curriculumvitae/contactinfo/', {
         id_user: userId,
         phone: phone,
         direccion: direccion
       }, {
         headers: {
           'Authorization': `Token ${token}`
         }
       });
       localStorage.setItem('contactId', response.data.id);
       console.log('Objeto devuelto por mi backend:', response);
       // Guardar el ID del contacto en el almacenamiento local
       navigate('/SocialLinks');
     }
   } catch (error) {
     console.error('Error al guardar el contacto:', error);
   }
 }

 //const contactId = localStorage.getItem('contactId');
 //const socialLinksData = {
 //   contact_info: contactId,
 //   name: '',
 //   url: '',
//};
//const socialLinksResponse = await axios.post('http://localhost:8000/curriculumvitae/sociallinks/', socialLinksData, {
// headers: {
 // 'Authorization': `Token ${token}`
// }
//});
 };

 return (
 <div>
   <h1>Crear Contacto</h1>
   <h1>Crear tu Propio Contacto</h1>
  <form onSubmit={handleSubmit}>
  <label htmlFor="phone">Phone:</label>
    <input
      type="text"
      value={phone}
      onChange={e => setPhone(e.target.value)}
      required
    />
    <label htmlFor="address">Address:</label>
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