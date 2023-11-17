import React, { useState } from 'react';
import axios from 'axios';

export default function Education() {
 const [education, setEducation] = useState({
  nameinst: '',
  title: '',
  range: '',
  curse: '',
  description: '',
  curriculum_id: '',
 });

 const handleChange = (e) => {
  setEducation({
    ...education,
    [e.target.name]: e.target.value,
  });
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 console.log(education);
 axios.post('http://localhost:8000/api/education/', education, {
   headers: {
     Authorization: `Token ${localStorage.getItem('token')}`,
   },
 })
 .then(response => {
   console.log(response.data);
 })
 .catch(error => {
   console.log(error);
 });
 };
 

 return (
  <form onSubmit={handleSubmit}>
    <h2>Education</h2>
    <label>
      Nameinst:
      <input type="text" name="nameinst" onChange={handleChange} />
    </label>
    <label>
      Title:
      <input type="text" name="title" onChange={handleChange} />
    </label>
    <label>
      Range:
      <input type="text" name="range" onChange={handleChange} />
    </label>
    <label>
      Curse:
      <input type="text" name="curse" onChange={handleChange} />
    </label>
    <label>
      Description:
      <textarea name="description" onChange={handleChange} />
    </label>
    <label>
      Curriculum ID:
      <input type="text" name="curriculum_id" onChange={handleChange} />
    </label>
    <button type="submit">Submit</button>
  </form>
 );
}
