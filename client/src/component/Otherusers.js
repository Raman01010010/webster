import React, { useContext, useEffect, useState } from "react";
import { User } from "../context/User";
import axios from "../api/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Otherusers = () => {
  const { newUser } = useContext(User);
  // console.log(newUser);

  const [otheruser, setOtheruser] = useState([]);

  const handleConnect = async (newUser, otheruser) => {
    try {
      const data = {
        newUser: newUser,
        otheruser: otheruser,
      };
      const res = await axios.post("/connect/api/sendconnect", data);
      toast.success("Connection request sent successfully");
    } catch (error) {
      // Handle errors
      console.error("Error sending connection request:", error);
      toast.error("Error sending connection request");
    }
  };
  const deleteConnection = async (newUser, otheruser) => {
    try {
      const data = {
        newUser: newUser,
        otheruser: otheruser,
      };

      const res = await axios.post("/connect/api/senddelete", data);
      toast.success("Delete Connection request sent successfully");
    } catch (error) {
      // Handle errors
      console.error("Error sending connection request:", error);
      toast.error("Error sending delete connection request");
    }
  };

  const handleMessageRequest = async (newUser, otheruser) => {
    try {
      const data = {
        newUser: newUser,
        otheruser: otheruser,
      };
      const res = await axios.post("/connect/api/sendMessageRequest", data);
      toast.success("Message request sent successfully");
    } catch (error) {
      // Handle errors
      console.error("Error sending Message request:", error);
      toast.error("Error sending message request");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const d = {
          email: newUser.email
        }
        const res = await axios.post("/connect/getuser", d);
        setOtheruser(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {otheruser.map((element) => {
              return (
                <div className="p-4 md:w-1/3 " key={element.email}>

                  <div className="max-w-xs border-2 border-gray-800 rounded-lg overflow-hidden bg-gray-300">
                    <Link to={`/profilepage/${element.email}`} className="block">
                      <img
                        className="h-32 w-full object-cover object-center"
                        src={element.picture ? element.picture : "https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gAAAA?rs=1&pid=ImgDetMain"}
                        alt="Profile"
                      />
                    </Link>
                    <div className="p-4">
                      <h2 className="text-xs font-medium text-black mb-1">
                        {element.email}
                      </h2>
                      <h1 className="text-lg font-medium text-black mb-2">
                        {element.username}
                      </h1>
                      <div className="flex justify-between mb-4">
                        <button
                          onClick={() =>
                            element.connection.includes(newUser.email) ?
                              deleteConnection(newUser.email, element.email) :
                              handleConnect(newUser.email, element.email)
                          }
                          className={`${element.connection.includes(newUser.email) ?
                              "bg-lime-800 text-white" :
                              "bg-blue-500 hover:bg-blue-700 text-white"
                            } rounded-full px-3 py-1 text-sm`}
                        >
                          {element.connection.includes(newUser.email) ? "Connected" : "Send Request"}
                        </button>
                        <Link to={`/chat/${element._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded text-sm">
                            Send Message
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Otherusers;
