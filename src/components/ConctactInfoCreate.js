import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import ContactInfo from './ContactInfo';

const ConctactInfoCreate = () => {
 const navigate = useNavigate();

 const handleClick = () => {
  navigate("/home");
 }

 return (
  <div>
    <h1>Curriculum Vitae Form</h1>
    <ContactInfo />
    <SocialLinks />

    <button onClick={handleClick}>Finalizar Contacto</button>
  </div>
 );
};

export default ConctactInfoCreate;
