import React, { useState, useEffect } from "react";
import {useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "../api/axios";
import { User } from "../context/User";

const Projects = () => {
  const { email } = useParams();
  const [projectData, setProjectData] = useState([]);
 
  const { newUser } = useContext(User);

  useEffect(() => {
    const fetchData = async () => {
      const d = {
        email: email,
      };
      const response = await axios.post("/connect/getproject", d);
      setProjectData(response.data);
    };
    fetchData();
  }, [email]);

  return (
    <div>
      <div className="bg-teal-50">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                My Projects
              </h1>
            </div>
            <div className="flex flex-wrap -m-4 items-center justify-center">
              {projectData.map((element) => {
                return (
                  <div className="xl:w-1/3 md:w-1/2 p-4" key={element._id}>
                    <div className="border border-gray-400 p-6 rounded-lg">
                      <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                        Project Name: <span className="text-gray-500"> {element.name} </span>
                      </h2>
                      <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                        Tech Stack:{" "}
                        {element.tech.map((e, index) => (
                          <div key={index}>
                            <h4 className="text-gray-500"> {index+1+" .  "}{e}</h4>
                          </div>
                        ))}
                      </h2>
                      <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Link:</h2>
                      <p className="leading-relaxed text-base text-gray-500">
                         {element.link}
                      </p>
                    </div>
                  </div>
                );
              })}

              { newUser.email === email ? (
              <div className="w-1/3 md:w-1/2 p-4">
                {/* AddIcon styling */}
                <Link to={`/addproject/${email}`}>
                  <div
                    className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-900 mb-4"
                    style={{ cursor: "pointer" }}
                  >
                    <AddIcon style={{ fontSize: "2rem" }} />
                  </div>
                </Link>
              </div>
              ) : null
            }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
