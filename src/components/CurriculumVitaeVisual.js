import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurriculumVitaeVisual = () => {
  const [curriculumVitae, setCurriculumVitae] = useState(null);

  useEffect(() => {
    const fetchCurriculumVitae = async () => {
      try {
        // Obtener los datos del currículum desde la API
        const response = await axios.get('');

        // Guardar los datos en el estado
        setCurriculumVitae(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurriculumVitae();
  }, []);

  if (!curriculumVitae) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Curriculum Vitae</h1>
      <p>Description: {curriculumVitae.description}</p>
      {/* mostrar */}
    </div>
  );
};

export default CurriculumVitaeVisual;
