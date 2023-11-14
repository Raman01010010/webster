import React, { useState, useLayoutEffect } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

const Application = () => {
  const { jobId } = useParams();
  const [myapp, setMyapp] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [maxHeight, setMaxHeight] = useState(10);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          jobid: jobId,
        };
        const response = await axios.post("/job/app", data);
        setMyapp(response.data);
      } catch (error) {
        console.error("Error fetching application data: ", error);
      }
    };
    fetchData();
  }, [jobId]);

  useLayoutEffect(() => {
    // Calculate the maximum height among all cards
    const maxCardHeight = Math.max(
      ...myapp.map((applicant) => {
        const cardHeight = document.getElementById(
          `card-${applicant._id}`
        ).clientHeight;
        return cardHeight;
      })
    );
    setMaxHeight(maxCardHeight);
  }, [myapp]);

  const nextCard = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % myapp.length);
  };

  const [showResume, setShowResume] = useState(false);

  const handleShowResume = () => {
    setShowResume((prevShowResume) => !prevShowResume);
  };

  return (
    <>
      <div className="flex overflow-hidden">
        {myapp.map((applicant, index) => (
          <div
            key={index}
            id={`card-${applicant._id}`}
            className={`card transition-transform transform ${
              index === currentCard ? "translate-x-0" : "translate-x-full"
            } bg-yellow-300`}
            style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
          >
            <div className="bg-cyan p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                Name: {applicant.name}
              </h3>
              <p>Email: {applicant.email}</p>
              <p>Phone: {applicant.phone}</p>
              <p>Place: {applicant.place}</p>
              <p>Location: {applicant.location}</p>
              <p>
                Resume:{" "}
                <button onClick={handleShowResume} style={{ color: "#1EB9E5" }}>
                  View Resume
                </button>
                {showResume && (
                  <iframe
                    src={applicant.resume}
                    title="Resume"
                    style={{ width: "100%", height: "500px", border: "none" }}
                  />
                )}
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
      </div>
      <button
        className="next-button ml-2 p-2 bg-blue-500 text-white rounded cursor-pointer"
        onClick={nextCard}
      >
        Next
      </button>
    </>
  );
};

export default Application;
