// components/FileUpload.js
import React, { useState } from "react";
import axios from "../api/axios";
import Dropzone from "react-dropzone";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/chat/img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("File uploaded:", response.data);
      // Handle the response as needed (e.g., store the URL in your database).
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag 'n' drop a file here, or click to select a file</p>
          </div>
        )}
      </Dropzone>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
