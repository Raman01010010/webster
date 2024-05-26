import React, { useEffect, useState, useContext } from "react";
import { User } from "../context/User";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import AccountBox from "@mui/icons-material/AccountBox";

export default function Connections() {
  const [connecteduser, setConnecteduser] = useState([]);
  const { newUser } = useContext(User);
  useEffect(() => {
    const fun = async () => {
      const data = {
        newUser: newUser.email,
      };
      const res = await axios.post("/connect/connections", data);
      // const connectionArray = Object.values(res.data);
      setConnecteduser(res.data);
      // console.log(connectionArray)
    };
    fun();
  }, []);
  console.log(newUser);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {connecteduser.map((element, index) => {
              return (
                <div className="lg:w-1/4 bg-cyan-800 rounded-md m-2 md:w-1/2 p-4 w-full">
                <Link to={`/profilepage/${element.email}`}>
                  <a className="block relative h-48 rounded overflow-hidden">
                  <div className="object-cover object-center w-full h-full block">
  {element.picture.startsWith("http")||element.picture==='xx' ? (
   <AccountBox sx={{fontSize:200,color:'white'}}/>
  ) : (
    <img
      alt=""
      className="object-cover object-center w-full h-full block"
      src={`http://localhost:3500/${element.picture}`}
    />
  )}
</div>

                  </a>
                  <div className="mt-4">
                    <h3 className="text-xs text-gray-100 tracking-widest title-font mb-1">
                      {element.email}
                    </h3>
                    <h2 className=" text-gray-100 title-font text-lg font-medium">
                      {element.name}
                    </h2>
                   
                  
                  </div>
                                  </Link>

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
