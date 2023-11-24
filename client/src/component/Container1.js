import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import Job  from './Job'
import Otp from "./Otp";
import  Createjob from "./Createjob"
import Showjob from "./Showjob"
import Managejob from "./Managejob"


import Otherusers from "./Otherusers";
import Pending from "./Pending";
import Persist from "./Persist";
import Google1 from "./Google1";
export default function Container1(){
    return(<>
    <Persist/>
          <Routes>
          <Route path="/google/:at" element={<><Google1/></>} />
          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/signup" element={<><Signup/></>} />
          <Route path="/otp" element={<><Otp/></>} />
    </Routes>

    </>)
}