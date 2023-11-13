import React from 'react';
import CurriculumVitaeForm from './CurriculumVitaeForm';
import axios from 'axios';

const CurriculumVitaeCreate = () => {
  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8000/curriculumvitae/curriculumvitae', {
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Curriculum Vitae</h1>
      <CurriculumVitaeForm />
      <button onClick={handleSave}>Save Curriculum Vitae</button>
    </div>
  );
};

export default CurriculumVitaeCreate;
