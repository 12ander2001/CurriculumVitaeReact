import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Interests from './Interests';
import Skills from './Skills';
import CurriculumVitae from './CurriculumVitae';
import './ContactInfo.css'

const CurriculumVitaeForm = () => {
 const navigate = useNavigate();

 const handleClick = () => {
  navigate("/home");
 }

 return (
  <div className='homePage'>
    <CurriculumVitae />
    <WorkExperience />
    <Education />
    <Interests />
    <Skills />
    <button type='button' onClick={handleClick} style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px' }}>Finalizar currículo</button>
  </div>
 );
};

export default CurriculumVitaeForm;
