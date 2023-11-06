import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import Otp from "./Otp";
import Otherusers from "./Otherusers";
import Pending from "./Pending";
export default function Container1(){
    return(<>
          <Routes>
        <Route path="/pending" element={<><Pending/></>} />
        <Route path="/otherusers" element={<><Otherusers/></>} />
         
          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/signup" element={<><Signup/></>} />
          <Route path="/otp" element={<><Otp/></>} />
    </Routes>

    </>)
}