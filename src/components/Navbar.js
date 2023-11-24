import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
 return (
   <nav>
     <ul>
     <li><Link to="/">Iniciar Sesion</Link></li>
       <li><Link to="/home">Inicio</Link></li>
       <li><Link to="/create-contact">Crear Contacto</Link></li>
       <li><Link to="/create-curriculum">Crear Curriculo</Link></li>
       <li><Link to="/curriculum-myself">Ver Mi Curriculo</Link></li>
       <li><Link to="/curriculum-others">Ver Otros Curriculos</Link></li>
     </ul>
   </nav>
 );
}

export default Navbar;
