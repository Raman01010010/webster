import React, { useEffect,useState,useContext } from 'react'
import { User } from "../context/User";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from '../api/axios';

const Pending = () => {

    const[pending,setPending] = useState([])
    const { newUser } = useContext(User);
    useEffect(() => {
      const fetchpending = async () => {
        const data = {
          newUser: newUser.email
        };
        const res = await axios.post('/getpending', data);
        
        if (Array.isArray(res.data)) {
          setPending(res.data);
        } else {
          console.error('Received data is not an array:', res.data);
        }
      };
      fetchpending();
    }, []);
    

  return (
    <div>
        
    <div className="bg-blue-200"> 
      <Stack direction="row" spacing={2} style={{ margin: "10vh" }}>
        <Button variant="contained">Accept</Button>
        <h1>Priyanshu singh</h1>
      </Stack>
    </div>

     {
        pending.map((element)=>{
            return(
                <div className="bg-blue-200"> 
                <Stack direction="row" spacing={2} style={{ margin: "10vh" }}>
                  <Button variant="contained">Accept</Button>
                  <h1>{element.username}</h1>
                </Stack>
              </div>
            )
        })
     }
      </div>
  )
}

export default Pending
