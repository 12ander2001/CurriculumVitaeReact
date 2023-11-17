import React, { useState } from 'react';

const SocialLinks = () => {
 const [link, setLink] = useState('');

 const handleInputChange = (event) => {
   setLink(event.target.value);
 };

 const handleSave = () => {
   console.log(link);
 };

 return (
   <div>
     <input type="text" value={link} onChange={handleInputChange} />
     <button onClick={handleSave}>Guardar</button>
   </div>
 );
};

export default SocialLinks;
