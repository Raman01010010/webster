import React,{useState,useEffect} from 'react'
import axios from "../api/axios";
import { useParams } from 'react-router-dom';

const Application = () => {
    const { jobId } = useParams();
    console.log("working");

    const [Myapp, setMyapp] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data={
            jobid: jobId
          }
          const response = await axios.post('/job/app',data);
          setMyapp(response.data);
        } catch (error) {
          console.error('Error fetching application data: ', error);
        }
      };
      fetchData();
    }, []);

  return (
    <div>
      vivek
      <h1>vivek</h1>
    </div>
  )
}

export default Application
