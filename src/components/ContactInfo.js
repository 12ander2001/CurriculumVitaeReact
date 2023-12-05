import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactInfo.css';

const ContactInfo = () => {
  const userIdLocal = localStorage.getItem('userId');
  const contactIdLocal = localStorage.getItem('contactId');
  const token = localStorage.getItem('authToken');

  const [phone, setPhone] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contactId, setContactId] = useState(contactIdLocal);
  const [contactinfo, setContactInfo] = useState(null);
  const [userId, setUserId] = useState(userIdLocal);

  useEffect(() => {
    const fetchContactId = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/curriculumvitae/contactinfo/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const userContactId = data.find(({ user }) => userId == user)?.id;
        console.log('yoyoyoyoy', userContactId, data);
        if (userContactId) {
          localStorage.setItem('contactId', userContactId);
          setContactId(userContactId);
        }
      } catch (error) {
        console.error('Error al obtener el contacto:', error);
      }
    };
    console.log(contactIdLocal);
    if (!contactIdLocal) {
      fetchContactId();
    }
  }, [userId, token, contactIdLocal]);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/curriculumvitae/contactinfo/${contactId}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setContactInfo(response.data);
      } catch (error) {
        console.error('Error al obtener el contacto:', error);
      }
    };

    if (userId && contactId && !contactinfo) {
      fetchContactInfo();
    }
  }, [userId, contactId, contactinfo, token]);

  const performContactOperation = async (url, method, data) => {
    try {
      const response = await axios({ method, url, data, headers: { 'Authorization': `Token ${token}` } });
      setContactInfo(response.data.data);

      if (method === 'post') {
        localStorage.setItem('contactId', response.data.id);
      }
    } catch (error) {
      console.error(`Error al ${method === 'post' ? 'guardar' : 'actualizar/eliminar'} el contacto:`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone && direccion) {
      const url = 'http://localhost:8000/curriculumvitae/contactinfo/';
      const method = 'post';
      const data = { user_id: userId, phone, direccion };

      performContactOperation(url, method, data);
      setPhone('');
      setDireccion('');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (phone && direccion) {
      const url = `http://localhost:8000/curriculumvitae/contactinfo/${contactId}/`;
      const method = 'put';
      const data = { user_id: userId, phone, direccion };

      performContactOperation(url, method, data);
    }
  };

  const handleDelete = async () => {
    const url = `http://localhost:8000/curriculumvitae/contactinfo/${contactId}/`;
    const method = 'delete';

    performContactOperation(url, method, null);
  };

  const fieldsToShow = ['phone', 'direccion', 'user_email', 'user_username', 'user_firstname', 'user_lastname'];
  const displayNames = ['Teléfono', 'Dirección', 'Correo', 'Usuario', 'Nombre', 'Apellidos'];

  return (
    <div className='wrapper'>
      <h1>Añadir Teléfono y Dirección a mi Contacto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='phone'>Teléfono:</label>
        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <label htmlFor='direccion'>Dirección:</label>
        <input type='text' value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        <button className='botton' type='submit'>
          Crear Contacto
        </button>
        <button className='botton' type='button' onClick={handleUpdate}>
          Actualizar Contacto
        </button>
        <button className='botton' type='button' onClick={handleDelete}>
          Eliminar Contacto
        </button>
      </form>
      <div className='containercontact'>
        <h1 className='titlecontact'>Info de mi Contacto</h1>
        {contactinfo &&
          Object.keys(contactinfo).filter((key) => fieldsToShow.includes(key)).map((key, index) => (
            <p key={key} className='info'>
              {displayNames[index]}: {contactinfo[key]}
            </p>
          ))}
      </div>
    </div>
  );
};

export default ContactInfo;
