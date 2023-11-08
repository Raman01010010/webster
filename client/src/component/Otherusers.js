import React, { useContext, useEffect, useState } from "react";
import { User } from "../context/User";
import axios from "../api/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Otherusers = () => {
  const { newUser } = useContext(User);
  console.log(newUser);

  const [otheruser, setOtheruser] = useState([]);

  const handleConnect = async (newUser, otheruser) => {
    try {
      const data = {
        newUser: newUser,
        otheruser: otheruser,
      };

      const res = await axios.post("/api/sendconnect", data);
      // console.log("Connection request sent successfully:", res.data);
    } catch (error) {
      // Handle errors
      console.error("Error sending connection request:", error);
    }
  };

  const deleteConnection = async (newUser, otheruser) => {
    try {
      const data = {
        newUser: newUser,
        otheruser: otheruser,
      };

      const res = await axios.post("/api/senddelete", data);
      console.log("DeleteConnection request sent successfully:", res.data);
    } catch (error) {
      // Handle errors
      console.error("Error sending connection request:", error);
    }
  };

  const handleMessageRequest = async (newUser, otheruser) => {
    try {
      const data = {
        newUser: newUser,
        otheruser: otheruser,
      };

      const res = await axios.post("/api/sendMessageRequest", data);

      // Handle the response here
      console.log("Message request sent successfully:", res.data);
    } catch (error) {
      // Handle errors
      console.error("Error sending Message request:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/getuser");
      setOtheruser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {otheruser.map((element) => {
              return (
                <div className="p-4 md:w-1/3" key={element.email}>
                  <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src="https://dummyimage.com/720x400"
                      alt="blog"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        {element.email}
                      </h2>
                      <h1 className="title-font text-lg font-medium text-white mb-3">
                        {element.username}
                      </h1>
                      <p className="leading-relaxed mb-3 ">
                        Photo booth fam kinfolk cold-pressed sriracha leggings
                        jianbing microdosing tousled waistcoat.
                      </p>
                      <div className="flex justify-between">
                        <button
                          onClick={() =>
                            { element.connection.includes(newUser.email) ?
                              deleteConnection(newUser.email, element.email):
                             handleConnect(newUser.email, element.email)  
                            }
                          }
                          className={`${
                            element.connection.includes(newUser.email)
                              ? "bg-lime-800 text-white"
                              : "bg-blue-500 hover:bg-blue-700 text-white"
                          } rounded-full p-2`}
                        >
                          {element.connection.includes(newUser.email)
                            ? "Connected"
                            : "Send Request"}
                        </button>

                        <button
                          onClick={() =>
                            handleMessageRequest(newUser.email, element.email)
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Otherusers;
