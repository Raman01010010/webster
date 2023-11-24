import axios from '../api/axios';
import React, { useState, useContext } from 'react';
import { User } from '../context/User';
import { useDropzone } from 'react-dropzone';
import Loader from "./Loader";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PostForm = () => {
  const axiosPrivate=useAxiosPrivate()
  const [load, setLoad] = React.useState(0)
  const [stat, setStat] = React.useState('')

  const { newUser } = useContext(User)
  console.log(newUser)
  const [image, setImage] = useState('https://preview.cruip.com/open-pro/images/blog-post-01.jpg');
  const [postData, setPostdata] = useState({ "email": newUser.email, "head": "Heading", "content": "Content of the post", "hashtag": "" })
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  console.log(postData)
  //    const text="vbcnbvv #ram #sam"// Regular expression to match hashtags
  //     const extractedHashtags = text.match(hashtagRegex);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = (e) => {
    setSelectedFile(e.target.files);
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file[0]);
      setImage(imageUrl);
    }
  };
  function handleChange(e) {

    const newText = e.target.value; // Use innerText instead of textContent
    console.log(newText);
    console.log(postData.content.match(hashtagRegex))
    const extractedHashtags = postData.content.match(hashtagRegex);
    setPostdata(old => {
      return (
        {
          ...old,
          "hashtag": extractedHashtags
        }
      )
    })
    setPostdata((old) => {
      return {
        ...old,
        [e.target.name]: newText,
        "email": newUser.email
      };
    });
    console.log(postData);
  }






  const handleUpload =async (e) => {
    e.preventDefault()
    if (!files) {
      alert('Please select a file to upload.');
      return;
    }

    const text = postData.content// Regular expression to match hashtags

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    setLoad(1)
    formData.append('json', JSON.stringify(postData))
    console.log(formData)
   const res=await axios
      .post('/upload/multiple', formData, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
        // Add any further processing or UI updates here
      })
      .catch((error) => {
        console.error('File upload failed:', error);
        setStat(error?.response?.data?.error)
        // Handle errors and display an error message to the user
      });
    setLoad(0)
    console.log(res)
    
  };



  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="heading" className="block text-gray-700 font-bold mb-2">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            name="head"
            value={postData.head}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p className="text-gray-700">
              Drag 'n' drop some files here, or click to select files
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">
          {files.map((file) => (
            <div key={file.name} className="w-1/2 p-2">
              {file.type.startsWith('image/') ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-auto rounded-md"
                />
              ) : file.type.startsWith('video/') ? (
                <video
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-auto rounded-md"
                  controls
                />
              ) : (
                <div className="bg-gray-200 p-2 rounded-md">
                  <p className="text-sm text-gray-700">{file.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div>{stat}</div>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        >
          Post  
        </button>
        {load && <Loader />}
      
      </form>
    </div>
  );
};

export default PostForm;
