import React, { useState } from 'react';
import axios from 'axios';

const Education = () => {
  const [nameinst, setNameinst] = useState('');
  const [title, setTitle] = useState('');
  const [range, setRange] = useState('');
  const [curse, setCurse] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud POST a la API para guardar los datos en la tabla correspondiente
      await axios.post('/http://localhost:8000/curriculumvitae/education', {
        nameinst,
        title,
        range,
        curse,
        description,
      });

      // Restablece los campos del formulario después de guardar los datos
      setNameinst('');
      setTitle('');
      setRange('');
      setCurse('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Education</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameinst">Institution Name:</label>
        <input type="text" id="nameinst" value={nameinst} onChange={(e) => setNameinst(e.target.value)} />

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="range">Range:</label>
        <input type="text" id="range" value={range} onChange={(e) => setRange(e.target.value)} />

        <label htmlFor="curse">Curse:</label>
        <input type="text" id="curse" value={curse} onChange={(e) => setCurse(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Education;
