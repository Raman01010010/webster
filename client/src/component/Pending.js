import React, { useEffect, useState, useContext } from 'react';
import { User } from "../context/User";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from '../api/axios';

const Pending = () => {
  const [pending, setPending] = useState([]); 
  const { newUser } = useContext(User);

  useEffect(() => {
    const fetchpending = async () => {
      const data = {
        newUser: newUser.email
      };
      try {
        const res = await axios.post('/getpending', data);
        // Convert the object values into an array
        console.log("xkjdfhshdfushdfi",res.data)
        const pendingArray = Object.values(res.data);
        setPending(pendingArray);

      } catch (error) {
        console.error(error);
      }
    };
    fetchpending();
  }, []);


  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-2">
            {pending.map((element) => {
              return (
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg bg-cyan-8009">
                    <img
                      alt="team"
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      src="https://dummyimage.com/80x80"
                    />
                    <div className="flex-grow">
                      <h2 className="text-gray-900 title-font font-medium">
                        {element.senderEmail}
                      </h2>
                      <Button variant="contained" >Accept</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pending;
