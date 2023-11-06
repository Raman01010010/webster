import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Otherusers from "./Otherusers";
import Pending from "./Pending";
export default function Container1(){
    return(<>
    <Dashboard/>

         

          <Routes>
          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
    </Routes>

    </>)
}