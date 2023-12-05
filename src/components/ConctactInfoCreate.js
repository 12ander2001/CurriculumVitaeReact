import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import ContactInfo from './ContactInfo';
import './ContactInfo.css';
import axios from 'axios';

const ContactInfoCreate = () => {
  const navigate = useNavigate();
  const contactIdLocal = localStorage.getItem("contactId");
  const userId = localStorage.getItem('userId');
  const [contactId, setContactId] = useState(contactIdLocal);

  useEffect(() => {
    const fetchContactId = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/curriculumvitae/contactinfo/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem("authToken")}`
          }
        });
        const userContactId = data.find(({ user }) => userId == user)?.id;
        if (userContactId) {
          localStorage.setItem('contactId', userContactId);
          setContactId(userContactId);
        }
      } catch (error) {
        console.error('Error al obtener el contacto:', error);
      }
    };

    if (!contactIdLocal) {
      fetchContactId();
    }
  }, [userId, contactIdLocal]);

  const handleClick = () => {
    const contactId = localStorage.getItem('contactId');
    if (contactId) {
      navigate("/home");
    } else {
      alert('Por favor inserte su teléfono y dirección');
    }
  }

  return (
    <div className='homePage'>
      <ContactInfo />
      {contactId && <SocialLinks contactIdLocal={contactId} tokenLocal={localStorage.getItem("authToken")} />}
      <button type='button' onClick={handleClick}>Finalizar Contacto</button>
    </div>
  );
};

export default ContactInfoCreate;
