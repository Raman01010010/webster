import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { User } from "../context/User";
const Addproject = () => {
    const { email } = useParams();
    const axiosPrivate = useAxiosPrivate();
  
    const [name, setName] = useState('');
    const [tech, setTech] = useState('');
    const [link, setLink] = useState('');


    const { newUser } = useContext(User);
  
    const addproject = async () => {
      const projectData = {
        name: name,
        tech: tech.split(',').map((t) => t.trim()), // Split and trim to create an array
        link: link,
        email: email,
      };
  
      try {
        const res = await axiosPrivate.post("/connect/addproject", projectData);
        console.log(res.data);
  
        toast.success('Project added successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error('Error adding project:', error);
       
        toast.error('Error adding project', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };
  
    return (
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex items-center justify-center h-screen">
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">
                Add Project
              </h2>
              <div className="relative mb-4">
                <label htmlFor="institute" className="leading-7 text-sm text-gray-600">
                  Project Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="institute"
                  name="institute"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="degree" className="leading-7 text-sm text-gray-600">
                  Tech Stack (Separate with commas)
                </label>
                <textarea
                  onChange={(e) => setTech(e.target.value)}
                  id="tech"
                  name="tech"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <div className="relative mb-4">
                <label htmlFor="graduationYear" className="leading-7 text-sm text-gray-600">
                  Link
                </label>
                <input
                  onChange={(e) => setLink(e.target.value)}
                  id="graduationYear"
                  name="graduationYear"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
             
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mx-auto"
                onClick={() => addproject(email)}
              >
                Submit
              </button>

            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    );
  };
  
  export default Addproject;
  