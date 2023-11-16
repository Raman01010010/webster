/* eslint-disable no-undef */
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AddEducation = () => {
  const currentYear = new Date().getFullYear();

  const { email } = useParams();
  const axiosPrivate=useAxiosPrivate()
  const [institute, setInstitute] = useState('');
  const [degree, setDegree] = useState('');
  const [year, setYear] = useState('');

  const addEducation = async (email) => {
    const educationData = {
      institute: institute,
      degree: degree,
      year: year,
      email: email,
    };

    try {
      const res = await axiosPrivate.post("/addeducation", educationData);
      console.log(res.data);

      // Show success toast
      toast.success('Education added successfully', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error adding education:', error);
      // Show error toast
      toast.error('Error adding education', {
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
              Add Education
            </h2>
            <div className="relative mb-4">
              <label htmlFor="institute" className="leading-7 text-sm text-gray-600">
                Institute
              </label>
              <input
                onChange={(e) => setInstitute(e.target.value)}
                type="text"
                id="institute"
                name="institute"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="degree" className="leading-7 text-sm text-gray-600">
                Degree
              </label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                type="text"
                id="degree"
                name="degree"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="graduationYear" className="leading-7 text-sm text-gray-600">
                Year of Graduation
              </label>
              <input
                onChange={(e) => setYear(e.target.value)}
                type="number"
                id="graduationYear"
                name="graduationYear"
                defaultValue={currentYear}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mx-auto"
              onClick={() => addEducation(email)}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
      {/* ToastContainer to show toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddEducation;
/* eslint-enable no-undef */
