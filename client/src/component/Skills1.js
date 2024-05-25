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
import DeleteIcon from '@mui/icons-material/Delete';
const Skills1 = () => {
    const [data, setData] = useState([]);
    const { email } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { newUser } = useContext(User);
    const [saveskill, setSaveskill] = useState(false);
    const [deleteskill, setDeleteskill] = useState(false);
    const navigate = useNavigate();
    const [editSkills, setEditSkills] = useState();
    // console.log("emaillllll",email);
    useEffect(() => {
        console.log("Skills1 component rendered");
    }, []);
    useEffect(() => {
        const fetchingData = async () => {
            console.log("ssssssssss");
            try {
                const d = {
                    email: email,
                };
                const res = await axiosPrivate.post("/connect/fetchingdata", d);
                setData(res.data);
                console.log("dataaaaaaaaa", data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchingData();
    }, [email, saveskill, deleteskill]);

    console.log("dataaaaaaaaa", data);

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
        <div className="mt-20 bg-neutral-400 mx-auto p-4 max-w-xl border border-2 border-black">
            <div className="max-h-96 overflow-y-auto">
                {data.skills && data.skills.map((element, index) => (
                    <div
                        key={index}
                        className="relative group flex flex-wrap justify-between w-auto max-w-lg h-20 flex items-center justify-center bg-slate-300 text-white m-2 mx-auto"
                    >
                        <p className="text-justify ml-10 font-bold text-slate-950">{element}</p>

                        <button
                            className="text-slate-950"
                            onClick={() => fetchingEndorse(email, element)}
                        >
                            Endorsed By.
                        </button>

                        {newUser.email !== email && (
                            <button
                                onClick={() => Endorse(element, newUser.email, email)}
                                className=" mr-10 font-bold text-slate-800"
                            >
                                Endorse
                            </button>
                        )}

                        {newUser.email === email && (
                            <button
                                onClick={() => handleRemoveSkill(index, newUser.email)}
                                className="text-slate-950 mr-10"
                            >
                                <DeleteIcon />
                            </button>
                        )}

                    </div>
                ))}
            </div>
            {newUser.email === email && (
                <>
                    <div className="relative group flex items-center justify-center w-80 max-w-lg h-10 bg-white text-black m-2 mx-auto">
                        <input
                            type="text"
                            placeholder="Add Skill"
                            className="text-center bg-transparent outline-none flex-grow"
                            onChange={(e) => setEditSkills(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => handleSaveSkills(editSkills, newUser.email)}
                        className="bg-blue-500 text-white py-2 px-4 rounded w-32 relative group flex items-center justify-center mx-auto"
                    >
                        <span className="flex-grow">Save</span>
                    </button>

                </>
            )}
        </div>

    )
}

export default Skills1
