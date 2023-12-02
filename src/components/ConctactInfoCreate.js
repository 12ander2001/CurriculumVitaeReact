import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import ContactInfo from './ContactInfo';
import './ContactInfo.css'

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
  <div className='homePage'>
    <ContactInfo />
    <SocialLinks />

    <button type='button' onClick={handleClick} >Finalizar Contacto</button>
  </div>
 );
};

export default ConctactInfoCreate;
