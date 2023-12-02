import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importa el archivo CSS

function Home() {
 const navigate = useNavigate();

 const handleVisualMySelf = () => {
   navigate("/curriculum-myself");
  }

 return (
  <div className="home">
    <h1 className="title">Gestión y control de Currículos</h1>
    <div className="button-container">
 <button type="button" onClick={() => navigate('/create-contact')} className="button">
  Gestionar Info de mi Contacto
 </button>
 <button type="button" onClick={() => navigate('/create-curriculum')} className="button">
   Gestionar mi Currículo
 </button>
 <button 
 type="button"
 onClick={handleVisualMySelf}
 className="button"
 >
   Ver mi Currículo
 </button>
</div>
  </div>
 );
}

export default Home;
