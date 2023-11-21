import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Otherusers from "./Otherusers";
import Connections from "./Connections"
import Pending from "./Pending";
import Post1 from "./Post2";
import AllPost from "./AllPost";
import DefaultComponent from "./Comment";
import Test from "../test/Test";
import Showjob from "./Showjob";
import  Createjob from "./Createjob"
import Job from "./Job";
import Managejob from "./Managejob"
import Application from "./Application";
import Chat from "./Chat";
import ChatR from "./ChatR";
import ControlledOpenSpeedDial from "./Speed";
import Profilepage from "./Profilepage";
import Endorse from "./Endorse";
import ParticularPost from "./ParticularPost";
import FileUpload from "./Uploadtest";
import YourMainComponent from "./AllPost2";
import Jobsapplied from "./Jobsapplied";
import Formsubmit from "./Formsubmit";
import Notification from "./Notification";
import NotifiButton from "./NotifiButton";
import { useContext } from "react";
import { User } from "../context/User";
import SinglePost from "./SinglePost";
import Jobcomment from "./jobcomment"
import Resume from "./Resume"

import ParticularJob from "./ParticularJob";
import Education from "./Education";
import AddEducation from "./AddEducation";
import Projects from "./Projects";
import Addproject from "./Addproject";
import RoomPage from "./VideoC";
export default function Container1(){
    const {sh,setSh}=useContext(User)
    return(<>
    


   { sh&&<NotifiButton/>}

          <Routes>
          <Route path="/post1/:id" element={<>            
     <SinglePost/></>} />
        
          <Route path="/" element={<><Dashboard/></>} />
          <Route path="/chat/:id" element={<><Chat/></>} />
          <Route path="/chatr/:id" element={<><ChatR/></>} />
          <Route path="/otherusers" element={<><Otherusers/></>} />

          <Route path="/pending" element={<><Pending/></>} />
          <Route path="/connections" element={<><Connections/></>} />
          <Route path="/profilepage/:email" element={<><Profilepage/></>} />
          <Route path="/endorsepage" element={<><Endorse/></>} />
          <Route path="/particularpost/:email" element={<><ParticularPost/></>} />
          <Route path="/particularjob/:email" element={<><ParticularJob/></>} />
          <Route path="/education/:email" element={<><Education/></>} />
          <Route path="/addeducation/:email" element={<><AddEducation/></>} />
          <Route path="/projects/:email" element={<><Projects/></>} />
          <Route path="/addproject/:email" element={<><Addproject/></>} />
          <Route path="/cpost" element={<> <Post1/></>} />
          <Route path="/post" element={<>            
     <AllPost/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/showjob" element={<><Showjob/></>}/>
          <Route path="/createjob" element={<><Createjob/></>}/>
          <Route path="/job/:jobId" element={<><Job/></>} />
          <Route path="/myjob" element={<><Managejob/></>} />
          <Route path="/app/:jobId" element={<><Application/></>} />
          <Route path="/jobsapplied" element={<><Jobsapplied/></>} />
          <Route path="/formsubmitted/:jobId/:jobberId" element={<><Formsubmit/></>} />
          <Route path="/resume" element={<><Resume/></>} />
          <Route path="/jobcomment/:secondId/:jobId" element={<><Jobcomment/></>} />
          <Route path="/room/:roomId" element={<><RoomPage/></>} />

    </Routes>
    <Notification/>
    </>)
}