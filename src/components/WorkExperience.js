import React, { useState } from 'react';
import axios from 'axios';

const WorkExperience = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [range, setRange] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud POST a la API para guardar los datos en la tabla correspondiente
      await axios.post('http://localhost:8000/curriculumvitae/workexperience/', {
        name,
        place,
        range,
        description,
      });

      // Restablece los campos del formulario después de guardar los datos
      setName('');
      setPlace('');
      setRange('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Work Experience</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="place">Place:</label>
        <input type="text" id="place" value={place} onChange={(e) => setPlace(e.target.value)} />

        <label htmlFor="range">Range:</label>
        <input type="text" id="range" value={range} onChange={(e) => setRange(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default WorkExperience;
