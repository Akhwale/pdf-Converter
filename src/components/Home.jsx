import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'converted.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error uploading and converting file:', error);
    }
  };

  return (
    <div>
      <h1>Upload JPG to Convert to PDF</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/jpeg" onChange={handleFileChange} />
        <button type="submit">Convert</button>
      </form>
    </div>
  );
}

export default App;
