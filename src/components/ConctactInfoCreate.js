import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import ContactInfo from './ContactInfo';

const ConctactInfoCreate = () => {
 const navigate = useNavigate();

 const handleClick = () => {
    const contactId = localStorage.getItem('contactId');
    if (contactId) {
      navigate("/home");
    } else {
      alert('Por favor inserte su teléfono y dirección');
    }
   }
   

 
 return (
  <div>
    <h1>ContactInfo Create</h1>
    <ContactInfo />
    <SocialLinks />

    <button type='button' onClick={handleClick} style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px' }}>Finalizar Contacto</button>
  </div>
 );
};

export default ConctactInfoCreate;
