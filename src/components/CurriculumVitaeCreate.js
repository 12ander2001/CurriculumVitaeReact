import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Interests from './Interests';
import Skills from './Skills';

const CurriculumVitaeForm = () => {
 const navigate = useNavigate();

 const handleClick = () => {
  navigate("/home");
 }

 return (
  <div>
    <h1>Curriculum Vitae Form</h1>
    <WorkExperience />
    <Education />
    <Interests />
    <Skills />
    <button onClick={handleClick}>Finalizar currículo</button>
  </div>
 );
};

export default CurriculumVitaeForm;
