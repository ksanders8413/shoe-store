// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUpload = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setSelectedFiles(e.target.files); // Store the selected files
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     // Append each file to the FormData object
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append('images', selectedFiles[i]);
//     }

//     try {
//       // Send the form data to your backend
//       const response = await axios.post('/upload-images', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Upload successful:', response.data);
//     } catch (error) {
//       console.error('Error uploading images:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" multiple onChange={handleFileChange} />
//       <button type="submit">Upload Images</button>
//     </form>
//   );
// };

// export default ImageUpload;




import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products/upload-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload successful:', response.data);
      onUpload(response.data.images); // Assuming your API returns the uploaded image URLs
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="button" onClick={handleSubmit}>Upload Images</button>
    </div>
  );
};

export default ImageUpload;
