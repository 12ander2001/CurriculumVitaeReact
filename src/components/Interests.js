import React, { useState } from 'react';
import axios from 'axios';

const Interests = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud POST a la API para guardar los datos en la tabla correspondiente
      await axios.post('/http://localhost:8000/curriculumvitae/interests', {
        name,
      });

      // Restablece los campos del formulario después de guardar los datos
      setName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Interests</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Interests;
