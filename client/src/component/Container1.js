import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import Job  from './Job'
import Otp from "./Otp";
import  Createjob from "./Createjob"
import Showjob from "./Showjob"
import Managejob from "./Managejob"
import Home2 from "./Home2"

import Otherusers from "./Otherusers";
import Pending from "./Pending";
import Persist from "./Persist";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
export default function Container1(){
    return(<>
    <Persist/>
          <Routes>
          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/signup" element={<><Signup/></>} />
          <Route path="/otp" element={<><Otp/></>} />
          <Route path="/home2" element={<><Home2/></>} />
          <Route path="/about" element={<><AboutUs/></>} />
          <Route path="/footer" element={<><Footer/></>} />

    </Routes>

    </>)
}