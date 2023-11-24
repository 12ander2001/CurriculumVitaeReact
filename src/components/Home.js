import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
 const navigate = useNavigate();

 const handleVisualMySelf = () => {
    navigate("/curriculum-myself");
   }

const handleVisualOthers = () => {
    navigate("/curriculum-others");
   }

 return (
   <div>
     <h1>Página de inicio</h1>
     <button type="button" onClick={() => navigate('/create-contact')} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
       Ir a crear un tu Contacto
     </button>
     <button type="button" onClick={() => navigate('/create-curriculum')} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
       Ir a crear tu Curriculo
     </button>
     <button 
    type="button"
    onClick={handleVisualMySelf}
    style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Visualizar Mi Curriculo
    </button>
    <button 
    type="button"
    onClick={handleVisualOthers}
    style={{ padding: '10px 20px', backgroundColor: 'purple', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      Visualizar Curriculos de Otras Personas
    </button>
   </div>
 );
}

export default Home;
