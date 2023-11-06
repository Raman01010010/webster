import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import Job  from './Job'
import Otp from "./Otp";
import  Createjob from "./Createjob.js"
export default function Container1(){
    return(<>
          <Routes>
          <Route path="/job" element={<><Job/></>} />
          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/signup" element={<><Signup/></>} />
          <Route path="/otp" element={<><Otp/></>} />
          <Route path="/createjob" element={<><Createjob/></>}/>
          
    </Routes>

    </>)
}