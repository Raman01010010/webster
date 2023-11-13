import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Otherusers from "./Otherusers";
import Pending from "./Pending";
import Post1 from "./Post";
import AllPost from "./AllPost";
import DefaultComponent from "./Comment";
import Test from "./Test";
import Showjob from "./Showjob";
import  Createjob from "./Createjob"
import Job from "./Job";
import Managejob from "./Managejob"
import Application from "./Application";
import Company from "./Company";
import Jobsapplied from "./Jobsapplied";
import Formsubmit from "./Formsubmit";
export default function Container1(){
    return(<>
    <Dashboard/>



          <Routes>

          <Route path="/pending" element={<><Pending/></>} />
        <Route path="/otherusers" element={<><Otherusers/></>} />
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
          <Route path="/company" element={<><Company/></>} />
          <Route path="/jobsapplied" element={<><Jobsapplied/></>} />
          <Route path="/formsubmitted/:jobId" element={<><Formsubmit/></>} />

    </Routes>

    </>)
}