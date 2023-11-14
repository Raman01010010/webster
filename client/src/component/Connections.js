import React, { useEffect,useState,useContext } from 'react';
import { User } from '../context/User';
import axios from '../api/axios';

export default function Connections() {
    const[connecteduser,setConnecteduser] = useState([])
    const { newUser } = useContext(User);
    useEffect(()=>{
        
        const fun = async () => {
            const data = {
                newUser:newUser.email
            }
            const res = await axios.post('/connections',data)
            // const connectionArray = Object.values(res.data);
            setConnecteduser(res.data)
            // console.log(connectionArray)
        }
        fun()
    },[])
    console.log(newUser.email)
  return (
    <div>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">

      
      {connecteduser.map((element,index)=>{
              
              return(
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/420x260"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {element.email}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                     {element.name}
                  </h2>
                  <p className="mt-1">$16.00</p>
                </div>
              </div>          
              )
      })}
    </div>
  </div>
</section>

    </div>
  );
}