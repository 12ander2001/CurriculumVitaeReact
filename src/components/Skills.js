import React, { useState } from 'react';
import axios from 'axios';

const Skills = () => {
  const [name, setName] = useState('');
  const [assessment, setAssessment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !assessment) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Enviar los datos a la API para guardarlos en la tabla Skills
      await axios.post('http://localhost:8000/curriculumvitae/skills/', { name, assessment });

      // Limpiar los campos del formulario después de enviar los datos
      setName('');
      setAssessment('');
      setError('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Skills</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Assessment:
          <input type="text" value={assessment} onChange={(e) => setAssessment(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Skills;
