import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Otherusers from "./Otherusers";
import Connections from "./Connections"
import Pending from "./Pending";
import Post1 from "./Post";
import AllPost from "./AllPost";
import DefaultComponent from "./Comment";
import Test from "../test/Test";
import Showjob from "./Showjob";
import  Createjob from "./Createjob"
import Job from "./Job";
import Managejob from "./Managejob"
import Application from "./Application";
import Chat from "./Chat";
import ControlledOpenSpeedDial from "./Speed";
export default function Container1(){
    return(<>
    <Dashboard/>
<Test/>
<ControlledOpenSpeedDial/>


          <Routes>
          <Route path="/" element={<><Chat/></>} />
          <Route path="/otherusers" element={<><Otherusers/></>} />
          <Route path="/pending" element={<><Pending/></>} />
          <Route path="/connections" element={<><Connections/></>} />
          <Route path="/cpost" element={<>   
   <Post1/></>} />
          <Route path="/post" element={<>            
     <AllPost/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/showjob" element={<><Showjob/></>}/>
          <Route path="/createjob" element={<><Createjob/></>}/>
          <Route path="/job/:jobId" element={<><Job/></>} />
          <Route path="/myjob" element={<><Managejob/></>} />
          <Route path="/app/:jobId" element={<><Application/></>} />

    </Routes>

    </>)
}