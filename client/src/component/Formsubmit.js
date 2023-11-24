import React, { useState, useEffect, useContext } from "react";
import axios from '../api/axios';
import { User } from "../context/User";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Formsubmit = () => {
  const { newUser } = useContext(User);
  const { jobId, jobberId } = useParams();
  const [myapp, setMyapp] = useState([]);
  const [showResume, setShowResume] = useState(false);
  const [serverResponse, setServerResponse] = useState({ data: null, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          jobid: jobId,
          userid: newUser.userid,
        };
        const response = await axios.post('/job/form', data);
        setMyapp(response.data);
        console.log("vivek");
        // The state update is asynchronous, so myapp might not be immediately updated
      } catch (error) {
        console.error('Error fetching Formsubmit data: ', error);
        setServerResponse({ data: null, error: error.message || 'An error occurred' });
      }
    };
    fetchData();
  }, [jobId, newUser.userid]);

  const handleShowResume = () => {
    setShowResume((prevShowResume) => !prevShowResume);
  };

  return (
    <div className="flex items-center justify-center h-full mt-10">
      {myapp.map((applicant, index) => (
        <div
    key={index}
    className={`max-w-lg mx-auto rounded-md overflow-hidden shadow-md my-4 ${
      applicant.accepted==true ? 'bg-green-300' : 'bg-cyan-300'
    }`}
  >          <div className="bg-cyan p-4">
            <h3 className="text-lg font-semibold mb-2">Name: {applicant.name}</h3>
            <p>Email: {applicant.email}</p>
            <p>Phone: {applicant.phone}</p>
            <p>Place: {applicant.place}</p>
            <p>Location: {applicant.location}</p>
            <p className="mb-2">
              <span className="font-semibold">Resume:</span>
              {showResume && (
                <iframe
                  src={applicant.resume}
                  title="Resume"
                  className="w-full h-48 border-none"
                />
              )}
            </p>
            <p>Professional Experience: {applicant.additionalQuestions[0]}</p>
            <p>Additional Question 1: {applicant.additionalQuestions[1]}</p>
            <p>Additional Question 2: {applicant.additionalQuestions[2]}</p>
            <Link to={`/jobcomment/${jobberId}/${jobId}`}>
              <input
                type="text"
                id="location"
                className="border p-2 mt-2 focus:outline-none w-full"
                placeholder="Add a comment..."
              />
            </Link>
          </div>
          <div className="bg-gray-200 py-2 px-4 flex justify-end items-center">
            <button
              onClick={handleShowResume}
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              View Resume
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Formsubmit;
