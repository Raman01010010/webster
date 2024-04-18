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
const Skills1 = () => {
    const [data, setData] = useState([]);
    const { email } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { newUser } = useContext(User);

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

      

  return (
    <div>
      <h1>hello</h1>
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
    </div>
  )
}

export default Skills1
