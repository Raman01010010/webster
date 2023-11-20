import React, { useState, useEffect, useContext } from "react";
import axios from '../api/axios';
import { User } from "../context/User";
import { useParams } from 'react-router-dom';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Formsubmit = () => {
  const { newUser } = useContext(User);
  const { jobId ,jobberId} = useParams();
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
    <>


    <div className="flex items-center justify-center h-full mt-100px">
      {myapp.map((applicant, index) => (
        <div key={index} className="card bg-yellow-300 mt-20">
          <div className="bg-cyan p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Name: {applicant.name}</h3>
            <p>Email: {applicant.email}</p>
            <p>Phone: {applicant.phone}</p>
            <p>Place: {applicant.place}</p>
            <p>Location: {applicant.location}</p>
            <p>
              Resume:{' '}
              

              {showResume && (
                <iframe
                  src={applicant.resume}
                  title="Resume"
                  style={{ width: '100%', height: '500px', border: 'none' }}
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
              className="border p-2 mt-2 focus:outline-none"
            />
            </Link>
          </div>
        </div>
      ))}
      <button onClick={handleShowResume} style={{ color: '#1EB9E5', display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-eye" style={{ marginRight: '8px' }}></i> View Resume
</button> 
   </div>
    </>
  );
};

export default Formsubmit;
