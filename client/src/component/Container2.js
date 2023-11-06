import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Otherusers from "./Otherusers";
import Pending from "./Pending";
import Post1 from "./Post";
import AllPost from "./AllPost";
export default function Container1(){
    return(<>
    <Dashboard/>

         

          <Routes>

          <Route path="/cpost" element={<>   
   <Post1/></>} />
          <Route path="/post" element={<>            
     <AllPost/></>} />
          <Route path="/signin" element={<><Signin/></>} />
    </Routes>

    </>)
}