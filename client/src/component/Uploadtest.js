import React, { useState } from 'react';
import axios from '../api/axios';

function FileUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    try {
    const res=  await axios.post('/upload/multiple', formData);
    console.log(res)
      console.log('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files', error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  );
}

export default FileUpload;
