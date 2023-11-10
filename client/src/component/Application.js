import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

const Application = () => {
  const { jobId } = useParams();
  const [myapp, setMyapp] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          jobid: jobId,
        };
        const response = await axios.post('/job/app', data);
        setMyapp(response.data);
      } catch (error) {
        console.error('Error fetching application data: ', error);
      }
    };
    fetchData();
  }, [jobId]);

  const nextCard = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % myapp.length);
  };

  return (
    <div className="flex overflow-hidden">
      {myapp.map((applicant, index) => (
        <div
          key={index}
          className={`card transition-transform transform ${
            index === currentCard ? 'translate-x-0' : 'translate-x-full'
          } bg-yellow-300`}
        >
          <div className="bg-cyan p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Name: {applicant.name}</h3>
            <p>Email: {applicant.email}</p>
            <p>Phone: {applicant.phone}</p>
            <p>Place: {applicant.place}</p>
            <p>Location: {applicant.location}</p>
            <p>
              Resume:{' '}
              <a
                href={applicant.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Resume
              </a>
            </p>
            <p>Professional Experience: {applicant.additionalQuestions[0]}</p>
            <p>Additional Question 1: {applicant.additionalQuestions[1]}</p>
            <p>Additional Question 2: {applicant.additionalQuestions[2]}</p>
            <input
              type="text"
              id="location"
              className="border p-2 mt-2 focus:outline-none"
            />
          </div>
        </div>
      ))}
      <button
        className="next-button ml-2 p-2 bg-blue-500 text-white rounded cursor-pointer"
        onClick={nextCard}
      >
        Next
      </button>
    </div>
  );
};

export default Application;
