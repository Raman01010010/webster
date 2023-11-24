import React from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useContext ,useState,useEffect} from "react";
import { User } from "../context/User";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const Preview2 = () => {
  const componentRef = useRef();
  const { newUser } = useContext(User);
  const axiosPrivate=useAxiosPrivate()
  const { inputValues, setInputValues } = useContext(User);
  const { accordionItems, setAccordionItems } = useContext(User);
  const { accordionItems2, setAccordionItems2 } = useContext(User);

  // Function to handle the download as PDF
  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
  });
  const [data, setData] = useState([]);
  const email =newUser.email;
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const d = {
          email: email,
        };
        const res = await axiosPrivate.post("/fetchingdata", d);
        
        setData(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., redirect to an error page
      }
    };
    fetchingData();
  }, [email]);
  return (
    <>
      <div id="resume-container" ref={componentRef} className="p-8 bg-gray-100" style={{ maxHeight: '800px', overflow: 'auto' }}>
        <div className="flex">
        <section className="p-8 mb-2 bg-teal-300	 flex-2"> {/* Set a fixed width for the first column */}

              <div className="">
                <img
                  src={inputValues.image|| "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWu2QAQEkgd4WQSBi30f7iaW4NYaeuaQZUYA&usqp=CAU"} // Replace with the actual image URL
                  alt="Profile"
                  className="rounded-full h-24 w-24 mx-auto mb-4"
                />
              </div>
              <header className="text-center py-8">
                <ul className="list-none p-0">
                  <li>
                    <span>
                      <i class="fa-solid fa-envelope fa-2xs"></i>
                      {inputValues.email|| newUser.email}
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="fa-solid fa-phone-volume fa-2xs"></i>

                      {inputValues.phone}
                    </span>
                  </li>
                  <li>
                    <span>
                      <i class="fa-solid fa-location-dot"></i>
                      {inputValues.address}
                    </span>
                  </li>
                  <li>
                   <span><i class="fa-brands fa-linkedin fa-2xs"></i>{" "}
                    <a
                      href={inputValues.linkedin}
                      target="_blank"
                      className="text-blue-500"
                    >
                      {inputValues.linkedin}
                    </a>
                    </span>
                  </li>
                </ul>
              </header>
              <section className=" rounded-lg ... p-8 mb-2 bg-teal-300		">
  <h2 className="text-2xl font-semibold mb-4">Skills</h2>
  <div style={{ height: '3px', background: 'black' }}></div>

  <ul className="list-none p-0">
    {inputValues.skill.length > 0 ? (
      inputValues.skill.map((skill, index) => (
        <li key={index} className="mb-2">
          <span><i class="fa-solid fa-circle fa-2xs"></i>  {skill}</span>
        </li>
      ))
    ) : (
      data.skills && data.skills.length > 0 ? (
        data.skills.map((skill, index) => (
          <li key={index} className="mb-2">
            <span><i class="fa-solid fa-circle fa-2xs"></i> {skill}</span>
          </li>
        ))
      ) : (
        <li>
          <span><i class="fa-solid fa-circle fa-2xs"></i> No skill</span>
        </li>
      )
    )}
  </ul>
</section>

              <section className=" rounded-lg ... p-8 mb-2  bg-teal-300		">
                <h2 className="text-2xl font-semibold mb-4">Education</h2>
                <div style={{ height: '3px', background: 'black' }}></div>

                <ul className="list-none p-0">
                  {inputValues.education.map((edu, index) => (
                    <li key={index}>
                      <h3 className="text-lg font-semibold mb-2">
                        {edu.degreeName}
                      </h3>
                      <p>{edu.schoolName}</p>
                      <p>{`${edu.startDate} - ${edu.endDate}`}</p>
                      <p>{`Grade: ${edu.grade}`}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </section>

            {/* Right Column: Work Experience, Projects, Education */}
            <section className=" p-8 mb-8 flex-1">
              <h1 className="text-4xl italic 	 font-semibold	font-sans	text-2xl ...">{inputValues.fullName||newUser.username}</h1>
              <h2 className="text-lg font-semibold mb-4">{inputValues.role||"student"}</h2>
              <section className="bg-white p-8 mb-8 rounded-lg ... ">
                <h2 className="text-2xl font-semibold mb-4 ">
                  Work Experience
                </h2>
                <div style={{ height: '3px', background: 'black' }}></div>

                <ul className="list-none p-0 ">
                  {accordionItems.map((accordion) => (
                    <li key={accordion.id} className="mb-4 ">
                          <Typography variant="h6">
                            {accordion.company}
                          </Typography>
                          {/* Display other details like position, employment type, dates, and description */}
                          <div className=" ">
                            <p>
                              <strong>Position:</strong> {accordion.position}
                            </p>
                            <p>
                              <strong>Employment Type:</strong>{" "}
                              {accordion.employmentType}
                            </p>
                            <p>
                              <strong>Start Date:</strong> {accordion.startDate}
                            </p>
                            <p>
                              <strong>End Date:</strong> {accordion.endDate}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {accordion.description}
                            </p>
                          </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white p-8 mb-8 rounded-lg ... ">
                <h2 className="text-2xl font-semibold mb-4 ">Projects</h2>
                <div style={{ height: '3px', background: 'black' }}></div>

                <ul className="list-none p-0">
                  {accordionItems2.map((accordion) => (
                    <li key={accordion.id}>
                      <h3 className="text-lg font-semibold mb-2">
                        {accordion.projectname}
                      </h3>
                      <p>{accordion.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </section>
          </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download as PDF
        </button>
      </div>
    </>
  );
};

export default Preview2;
