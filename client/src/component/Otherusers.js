import React, { useContext, useEffect, useState } from "react";
import { User } from "../context/User";
import axios from "../api/axios";
import Button from '@mui/material/Button';

const Otherusers = () => {
  const { newUser } = useContext(User);
  // console.log(newUser);

  const [otheruser, setOtheruser] = useState([]);

  const handleConnect = async (newUser, otheruser) => {
    try {
      const data = {
        newUser: newUser,
        otheruser: otheruser
      };
  
      const res = await axios.post("/api/sendconnect", data);
  
      // Handle the response here
      console.log('Connection request sent successfully:', res.data);
    } catch (error) {
      // Handle errors
      console.error('Error sending connection request:', error);
    }
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/getuser");
      setOtheruser(res.data);

      // console.log("jsdhfsjhkjssjfcskjcsnc")
    };
    fetchUser()
  }, []);

  return (




   <>
   <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">



     {
        otheruser.map((element)=>{
              return(
                <div className="p-4 md:w-1/3">
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
                    <p className="leading-relaxed mb-3">
                      Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                      microdosing tousled waistcoat.
                    </p>
                    <Button onClick={()=>handleConnect(newUser.email,element.email)} variant="contained">Connect</Button>
                  </div>
                </div>
              </div>
              )
        })
     }



    </div>
  </div>
</section>
</>
  );
};

export default Otherusers;
