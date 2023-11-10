import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { User } from "../context/User";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profilepage = () => {
  const [activeTab, setActiveTab] = useState("description");
  const { email } = useParams();
  const [data, setData] = useState([]);
  const [editSkills, setEditSkills] = useState();
  const { newUser } = useContext(User);

  useEffect(() => {
    const fetchingData = async () => {
      const d = {
        email: email,
      };
      const res = await axios.post("/fetchingdata", d);
      setData(res.data);
    };
    fetchingData();
  }, []);

  const handleSaveSkills = async (editSkills, newUseremail) => {
    const d = {
      editSkills: editSkills,
      userEmail: newUseremail,
    };
    try {
      const res = await axios.post("/addskill", d);

      toast.success("Added Skill Succesfully");
    } catch (err) {
      console.log(err);
      toast.error("Can't Add Skill Due to Some Err");
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
            {data.connection.map((element) => {
              return (
                <div className="flex flex-wrap -m-2 border-gray-200 border p-4 rounded-lg bg-cyan-300 mt-4">
                  <div className="p-2 lg:w-1/3 md:w-1/2 w-full ">
                    <div className="h-full flex items-center ">
                      <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">
                          {element}
                        </h2>
                        <p className="text-gray-500">UI Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      case "details":
        return (
          <div class="flex flex-wrap">
            {data.skills.map((element) => (
              <div class="flex-grow w-16 h-16 flex items-center justify-center rounded-full bg-green-300 text-black m-2">
                <p class="text-center ">{element}</p>
              </div>
            ))}
            {newUser.email === email && (
              <>
                {" "}
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
            <h2>Description</h2>
            {/* Your existing description content */}

            <p className="leading-relaxed mb-4">
              Fam locavore kickstarter distillery...
            </p>
          </div>
        );
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {data.username}
              </h2>
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
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Profilepage;
