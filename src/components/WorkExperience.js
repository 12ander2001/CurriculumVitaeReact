import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkExperience = () => {
 const [name, setName] = useState('');
 const [place, setPlace] = useState('');
 const [range, setRange] = useState('');
 const [description, setDescription] = useState('');
 const [error, setError] = useState('');
 const [token, setToken] = useState(''); 
 const [curriculumId, setCurriculumId] = useState(''); 

 // Obtén el token del almacenamiento local
 useEffect(() => {
    const token = localStorage.getItem('authToken');
    const curriculumId = localStorage.getItem('curriculumId');
    console.log(curriculumId)
    console.log('Token:', token);
    setToken(token);
    setCurriculumId(curriculumId);
   }, []);
  

 const handleSubmit = async (e) => {
 e.preventDefault();

 if (!name || !place || !range || !description) {
 setError('Please fill in all fields');
 return;
 }

 try {
 const response = await axios.get(`http://localhost:8000/curriculumvitae/curriculumvitae/`, {
 headers: {
 'Authorization': `Token ${token}`
 }
 });
 console.log(curriculumId)
 if (response.data.length > 0) {
 const curriculumId = response.data[0].id;
 setCurriculumId(curriculumId);
 } else {
 console.error('El usuario no tiene un currículo.');
 }

 const headers = {
 'Authorization': `Token ${token}`,
 'Content-Type': 'application/json'
 };

 const data = { name, place, range, description, curriculum: curriculumId };
 console.log('Data to be sent:', data); // Imprime los datos que se enviarán
 const responsePost = await axios.post('http://localhost:8000/curriculumvitae/workexperience/', data, { headers });

 // Accede al id correctamente
 console.log('Id del objeto creado:', responsePost.data);

 setName('');
 setPlace('');
 setRange('');
 setDescription('');
 setError('');
 } catch (error) {
 console.error(error);
 }
 };

 return (
 <div>
 <h2>Work Experience</h2>
 {error && <p>{error}</p>}
 <form onSubmit={handleSubmit}>
 <label>
 Name:
 <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
 </label>
 <label>
 Place:
 <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
 </label>
 <label>
 Range:
 <input type="text" value={range} onChange={(e) => setRange(e.target.value)} />
 </label>
 <label>
 Description:
 <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
 </label>
 <button type="submit">Submit</button>
 </form>
 </div>
 );
};

export default WorkExperience;
