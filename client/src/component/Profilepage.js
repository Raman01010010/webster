import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { User } from "../context/User";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllPost from "./AllPost";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as solidBell } from "@fortawesome/free-solid-svg-icons"; // Import solid bell
import { faBellSlash as solidBellSlash } from "@fortawesome/free-solid-svg-icons"; // Import solid bell-slash

import Button from "@mui/material/Button";

const Profilepage = () => {
  const [file, setFile] = useState(null);

  const [activeTab, setActiveTab] = useState("description");
  const { email } = useParams();
  const [editSkills, setEditSkills] = useState();
  const { newUser } = useContext(User);
  const navigate = useNavigate();
  const [buttonColor, setButtonColor] = useState("inherit");
  const [saveskill, setSaveskill] = useState(false);
  const [deleteskill, setDeleteskill] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  const [profileImageFilename, setProfileImageFilename] = useState("");
  const [data, setData] = useState([]);
const [alert,setAlert]=useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const d = {
          email: email,
        };
        const res = await axiosPrivate.post("/connect/fetchingdata", d);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., redirect to an error page
      }
    };
    fetchingData();
  }, [email, saveskill, deleteskill]);

  const handleSaveSkills = async (editSkills, newUseremail) => {
    const d = {
      editSkills: editSkills,
      userEmail: newUseremail,
    };
    try {
      const res = await axiosPrivate.post("/connect/addskill", d);

      toast.success("Added Skill Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Can't Add Skill Due to Some Err");
    }
    setSaveskill(true);
  };

  const Endorse = async (skill, newUseremail, otheruser) => {
    const d = {
      skill: skill,
      userEmail: newUseremail,
      otheruserEmail: otheruser,
    };
    try {
      const res = await axiosPrivate.post("/connect/endorseskill", d);
      toast.success("Skill Endorsed Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Can't Endorse Skill Due to Some Err");
    }
  };

  const handleRemoveSkill = async (index, newUseremail) => {
    const d = {
      index: index,
      userEmail: newUseremail,
    };
    try {
      const res = await axiosPrivate.post("/connect/deleteskill", d);

      toast.success("Skill Deleted Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Can't Delete Skill Due to Some Err");
    }
    setDeleteskill(true);
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    console.log(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", newUser.email);
    formData.append("xyz", "raman");
    // Assuming userEmail is defined somewhere

    try {
      const response = await axiosPrivate.post(
        "/connect/image",
        formData,
        { email: newUser.email },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("File uploaded:", response.data);
      console.log(response.data.filename);
      setProfileImageFilename(response.data.filename);
      // Handle the response as needed (e.g., store the URL in your database).
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  
  console.log("viv" + profileImageFilename);
  const fetchingEndorse = async (email, skill) => {
    const d = {
      email: email,
      skill: skill,
    };
    try {
      const res = await axiosPrivate.post("/connect/fetchendorse", d);
      console.log("Endorsement data:", res.data);
      // Ensure this log statement is printed in the console
      navigate("/endorsepage", { state: { param1: res.data } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "reviews":
        return (
          <div>
            {data.connection.map((element, index) => (
              <div
                key={index}
                onClick={() => navigate(`/profilepage/${element}`)}
                className="cursor-grab"
              >
                <div className="flex flex-wrap -m-2 border-gray-200 border p-4 rounded-lg bg-blue-950 text-white mt-4">
                  <div className="p-2 lg:w-1/3 md:w-1/2 w-full text-white">
                    <div className="h-full flex items-center">
                      <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium text-white">
                          {element}
                        </h2>
                        <p className="text-gray-500">UI Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "details":
        return (
          <div className="flex flex-wrap">
            {data.skills.map((element, index) => (
              <div
                key={index}
                className="relative group flex-grow w-32 h-16 flex items-center justify-center rounded-full bg-blue-950 text-white m-2"
              >
                {newUser.email !== email && (
                  <button
                    onClick={() => Endorse(element, newUser.email, email)}
                    className="absolute top-0 right-0 p-1  bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 z-10 "
                  >
                    Endorse
                  </button>
                )}
                <p className="text-center">{element}</p>

                {newUser.email === email && (
                  <button
                    onClick={() => handleRemoveSkill(index, newUser.email)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 z-10"
                  >
                    X
                  </button>
                )}
                <button
                  className="absolute bottom-0  bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 z-10"
                  onClick={() => fetchingEndorse(email, element)}
                >
                  Endorsed By.
                </button>
              </div>
            ))}
            {newUser.email === email && (
              <>
                <div className="flex-grow w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-black m-2">
                  <input
                    type="text"
                    placeholder="Add Skill"
                    className="text-center bg-transparent outline-none"
                    onChange={(e) => setEditSkills(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => handleSaveSkills(editSkills, newUser.email)}
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </>
            )}
          </div>
        );
      default:
        return (
          <div>
            {/* Your existing description content */}
            <Link to={`/particularpost/${email}`}>
              <div className="bg-blue-950  text-white rounded-lg h-16 flex items-center justify-center">
                Go to My Posts
              </div>
            </Link>

            <Link to={`/particularjob/${email}`}>
              <div className="bg-blue-950  text-white rounded-lg h-16 flex items-center justify-center mt-4">
                Go to My Jobs
              </div>
            </Link>

            <Link to={`/education/${email}`}>
              <div className="bg-blue-950  text-white rounded-lg h-16 flex items-center justify-center mt-4">
                Education
              </div>
            </Link>

            <Link to={`/projects/${email}`}>
              <div className="bg-blue-950  text-white rounded-lg h-16 flex items-center justify-center mt-4">
                My Projects
              </div>
            </Link>
            {
              newUser.email===data.email&&
<div>
            {/* File upload */}
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Drop files here or click to select files</p>
                </div>
              )}
            </Dropzone>
            {file && (
              <div>
                <p>Selected file: {file.name}</p>
                <button onClick={handleUpload}>Upload</button>
              </div>
            )}

</div>}

          </div>
        );
    }
  };
  console.log("vi" + newUser.picture);
  const t = `http://localhost:3500/${data.picture}`;

  


  useEffect(() => {
    const fetchingData = async () => {
      try {
        const userId = newUser.userid; // Assuming userid is the user ID, adjust it accordingly
        const res = await axiosPrivate.post("/connect/getalert", {userId} );
        console.log("vivv"+res);
        // Assuming the response structure is { alertingTo: [...array] }
        console.log(res.data)
        setAlert(res.data.alertingTo);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchingData();
  }, []); 


  const handleBellClick = async () => {
    try {
      
      const response = await axiosPrivate.post("/connect/bell", {
        userId: newUser.userid, // Assuming userid is the user ID, adjust it accordingly
        userEmail: data.email,
      });
  
      // Check the response if needed
      if (response.data.success) {
        // If the server successfully processed the request
        toast.success("Bell pressed successfully");
      } else {
        // If there was an issue on the server side
        // Keep or revert the bell icon state to its previous value
        toast.error("Failed to process the bell press");
      }
    } catch (error) {
      // Handle any error that occurred during the request
      console.error("Error pressing the bell:", error);
      // Keep or revert the bell icon state to its previous value
      toast.error("Error pressing the bell");
    }
  };
  // console.log(alert);
  console.log("vivek"+alert);
  console.log(data._id);
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden bg-blue-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
            {" "}
            {/* Updated this line */}
            {/* Circular profile icon */}
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                {newUser.picture !== "xx" ? (
                  <img
                    alt="profile"
                    className="object-cover object-center w-full h-full"
                    src={t}
                  />
                ) : (
                  <p>No profile image available</p>
                )}
              </div>

                     
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {data.username}
              </h2>
              <Button
                color={buttonColor}
                component={Link}
                onClick={handleBellClick}
              >
               {
                
                alert.includes(data._id) ? (
  <FontAwesomeIcon icon={solidBell} />
) : (
  <FontAwesomeIcon icon={solidBellSlash} />
)}

              </Button>
             
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {data.name}
              </h1>
              <div className="flex mb-4">
                <button
                  onClick={() => handleTabClick("description")}
                  className={`flex-grow text-indigo-500 border-b-2 ${
                    activeTab === "description" && "border-indigo-500"
                  } py-2 text-lg px-1`}
                >
                  Description
                </button>
                <button

                  onClick={() => handleTabClick("reviews")}
                  className={`flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 ${
                    activeTab === "reviews" &&
                    "text-indigo-500 border-indigo-500"
                  }`}
                >
                  Connections
                </button>
                <button
                  onClick={() => handleTabClick("details")}
                  className={`flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 ${
                    activeTab === "details" &&
                    "text-indigo-500 border-indigo-500"
                  }`}
                >
                  Skills
                </button>
              </div>
              {renderContent()}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Profilepage;
