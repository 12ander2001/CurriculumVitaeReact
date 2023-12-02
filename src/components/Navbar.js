import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
 const location = useLocation();

 const pageNames = {
   '/': 'Inicio de Sesión',
   '/register' : 'Registrarse',
   '/home': 'Inicio',
   '/create-contact': 'Gestión de mi Info de Contacto',
   '/create-curriculum': 'Gestión de mi Currículo',
   '/curriculum-myself': 'Mi Currículo',
 };

 const currentPageName = pageNames[location.pathname];

 const handleLogout = () => {
  localStorage.clear();
  // Redirigir al usuario a la página de inicio de sesión después de cerrar la sesión
  window.location.href = '/';
 }; 

 return (
   <nav className="NavContainer">
     <div className="page-name">{currentPageName}</div>
     <ul className='header'>
       <li><Link to="/register" className='link'>Registrarse</Link></li>
       <li><Link to="/" className='link'>Iniciar Sesion</Link></li>
       <li><button  onClick={handleLogout }>Cerrar sesión</button></li>
       <li><Link to="/home" className='link'>Inicio</Link></li>
       <li><Link to="/create-contact" className='link'>Gestionar la Info de mi Contacto</Link></li>
       <li><Link to="/create-curriculum" className='link'>Gestionar mi Currículo</Link></li>
       <li><Link to="/curriculum-myself" className='link'>Ver Mi Curriculo</Link></li>
     </ul>
   </nav>
 );
}

export default Navbar;
