import React from 'react';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Interests from './Interests';
import Skills from './Skills';

const CurriculumVitaeForm = () => {
  return (
    <div>
      <h1>Curriculum Vitae Form</h1>
      <WorkExperience />
      <Education />
      <Interests />
      <Skills />
    </div>
  );
};

export default CurriculumVitaeForm;
