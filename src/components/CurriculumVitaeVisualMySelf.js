import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurriculumVitaeVisualMySelf = () => {
 const [contactInfo, setContactInfo] = useState([]);
 const [curriculumId, setCurriculumId] = useState(null);
 const [socialLinks, setSocialLinks] = useState([]);
 const [workexperience, setWorkExperience] = useState([]); 
 const [education, setEducation] = useState([]);
 const [skills, setSkills] = useState([]); 
 const [interests, setInterests] = useState([]);

 useEffect(() => {
  const userId = localStorage.getItem('userId');
  const contactId = localStorage.getItem('contactId');
  const token = localStorage.getItem('authToken');

  if (userId && contactId && token) {
    axios.get(`http://localhost:8000/curriculumvitae/contactinfo/${contactId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      console.log('Contact Info:', response.data);
      setContactInfo(response.data);
    })
    .catch(error => {
      console.error('Error al obtener el contacto:', error);
    });
  }
 },[]);

 useEffect(() => {
  const userId = localStorage.getItem('userId');
  const curriculumId = localStorage.getItem('curriculumId');
  const token = localStorage.getItem('authToken');

  console.log('userId:', userId);
  console.log('curriculumId:', curriculumId);
  console.log('token:', token);

  if (userId && curriculumId && token) {
    axios.get(`http://localhost:8000/curriculumvitae/curriculumvitae/${curriculumId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(response => {
      console.log(' CurriculumVitae:', response.data);
      setCurriculumId(response.data);
    })
    .catch(error => {
      console.error('Error al obtener el curriculo:', error);
    });
  }
 }, []);

 useEffect(() => {
  const contactId = Number(localStorage.getItem('contactId'));
  const token = localStorage.getItem('authToken');

  console.log('contactId:', contactId);
  console.log('token:', token);
  if (contactId && token) {
   axios.get(`http://localhost:8000/curriculumvitae/sociallinks/`, {
     headers: {
       'Authorization': `Token ${token}`
     }
   })
   .then(response => {
     // Filtrar los resultados por contactId
     const filteredResults = response.data.filter(item => item.contact_info === contactId);
     console.log('Social Links:', filteredResults);
     setSocialLinks(filteredResults);
   })
   .catch(error => {
     console.error('Error al obtener los enlaces sociales:', error);
   });
  };
  console.log(contactId)
  console.log('Token:', token);
}, []);

useEffect(() => {
    const curriculumId = Number(localStorage.getItem('curriculumId'));
    const token = localStorage.getItem('authToken');
   
    console.log('curriculumId:', curriculumId);
    console.log('token:', token);
    if (curriculumId && token) {
     axios.get(`http://localhost:8000/curriculumvitae/workexperience/`, {
       headers: {
         'Authorization': `Token ${token}`
       }
     })
     .then(response => {
       // Filtrar los resultados por contactId
       const filteredResults = response.data.filter(item => item.curriculum === curriculumId);
       console.log('WorkExperience:', filteredResults);
       setWorkExperience(filteredResults);
     })
     .catch(error => {
       console.error('Error al obtener las Experiencias de Trabajo:', error);
     });
    };
      console.log(curriculumId)
      console.log('Token:', token);
      setCurriculumId(curriculumId);
     }, []);

     useEffect(() => {
        const curriculumId = Number(localStorage.getItem('curriculumId'));
        const token = localStorage.getItem('authToken');
       
        console.log('curriculumId:', curriculumId);
        console.log('token:', token);
        if (curriculumId && token) {
         axios.get(`http://localhost:8000/curriculumvitae/education/`, {
           headers: {
             'Authorization': `Token ${token}`
           }
         })
         .then(response => {
           // Filtrar los resultados por contactId
           const filteredResults = response.data.filter(item => item.curriculum === curriculumId);
           console.log('Education:', filteredResults);
           setEducation(filteredResults);
         })
         .catch(error => {
           console.error('Error al obtener los enlaces sociales:', error);
         });
        };
          console.log(curriculumId)
          console.log('Token:', token);
          setCurriculumId(curriculumId);
         }, []);
    
         useEffect(() => {
            const curriculumId = Number(localStorage.getItem('curriculumId'));
            const token = localStorage.getItem('authToken');
           
            console.log('curriculumId:', curriculumId);
            console.log('token:', token);
            if (curriculumId && token) {
             axios.get(`http://localhost:8000/curriculumvitae/skills/`, {
               headers: {
                 'Authorization': `Token ${token}`
               }
             })
             .then(response => {
               // Filtrar los resultados por contactId
               const filteredResults = response.data.filter(item => item.curriculum === curriculumId);
               console.log('Skills:', filteredResults);
               setSkills(filteredResults);
             })
             .catch(error => {
               console.error('Error al obtener los enlaces sociales:', error);
             });
            };
            console.log(curriculumId)
            console.log('Token:', token);
            setCurriculumId(curriculumId);
           }, []);

           useEffect(() => {
            const curriculumId = Number(localStorage.getItem('curriculumId'));
            const token = localStorage.getItem('authToken');
           
            console.log('curriculumId:', curriculumId);
            console.log('token:', token);
            if (curriculumId && token) {
             axios.get(`http://localhost:8000/curriculumvitae/interests/`, {
               headers: {
                 'Authorization': `Token ${token}`
               }
             })
             .then(response => {
               // Filtrar los resultados por contactId
               const filteredResults = response.data.filter(item => item.curriculum === curriculumId);
               console.log('Interests:', filteredResults);
               setInterests(filteredResults);
             })
             .catch(error => {
               console.error('Error al obtener los Intereses:', error);
             });
            };
              console.log(curriculumId)
              console.log('Token:', token);
              setCurriculumId(curriculumId);
             }, []);

 return (
   <div>
     <div>
       <h1> Tu Informacion de Contacto</h1>
       {contactInfo && (
         <div>
           <p>User: {contactInfo.user}</p>
           <p>Phone: {contactInfo.phone}</p>
           <p>Direccion: {contactInfo.direccion}</p>
           <p>Email: {contactInfo.user_email}</p>
           <p>Username: {contactInfo.user_username}</p>
           <p>Firstname: {contactInfo.user_firstname}</p>
           <p>Lastname: {contactInfo.user_lastname}</p>
           <div>
 <h1> Links Sociales</h1>
 {socialLinks && socialLinks.map((link, index) => (
   <div key={index}>
     <p>Nombre: {link.nombre}</p>
     <p>URL: {link.url}</p>
   </div>
 ))}
</div>

         </div>
       )}
     </div>
     <div>
       <h1> Tu Curriculo</h1>
       {curriculumId && (
         <div>
           <p>User: {curriculumId.user}</p>
           <p>Nombre: {curriculumId.description}</p>
         </div>
       )}
       <div>
 <h1> Experiencias de Trabajo</h1>
 {workexperience && workexperience.map((link, index) => (
   <div key={index}>
     <p>Nombre de la Institucion: {link.name}</p>
     <p>Plaza: {link.place}</p>
     <p>Rango: {link.range}</p>
     <p>Descripción: {link.description}</p>
   </div>
 ))}
</div>
<div>
 <h1> Educacion</h1>
 {education && education.map((link, index) => (
   <div key={index}>
     <p>Nombre de la Institucion: {link.nameinst}</p>
     <p>Titulo: {link.title}</p>
     <p>Rango: {link.range}</p>
     <p>Curso: {link.curse}</p>
     <p>Descripción: {link.description}</p>
   </div>
 ))}
</div>
<div>
 <h1> Habilidades</h1>
 {skills && skills.map((link, index) => (
   <div key={index}>
     <p>Nombre: {link.name}</p>
     <p>habilidad: {link.assessment}</p>
   </div>
 ))}
</div>
<div>
 <h1> Intereses</h1>
 {interests && interests.map((link, index) => (
   <div key={index}>
     <p>Nombre: {link.name}</p>
   </div>
 ))}
</div>
     </div>
   </div>
 ); 
};

export default CurriculumVitaeVisualMySelf;
