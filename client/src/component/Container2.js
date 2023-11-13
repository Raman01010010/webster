import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Otherusers from "./Otherusers";
import Connections from "./Connections"
import Pending from "./Pending";
import Post1 from "./Post";
import AllPost from "./AllPost";
import Profilepage from "./Profilepage";
import Endorse from "./Endorse";
import ParticularPost from "./ParticularPost";
export default function Container1(){
    return(<>
    <Dashboard/>

          <Routes>
          <Route path="/otherusers" element={<><Otherusers/></>} />
          <Route path="/pending" element={<><Pending/></>} />
          <Route path="/connections" element={<><Connections/></>} />
          <Route path="/profilepage/:email" element={<><Profilepage/></>} />
          <Route path="/endorsepage" element={<><Endorse/></>} />
          <Route path="/particularpost/:email" element={<><ParticularPost/></>} />
          <Route path="/cpost" element={<> <Post1/></>} />
          <Route path="/post" element={<>            
     <AllPost/></>} />
          <Route path="/signin" element={<><Signin/></>} />
    </Routes>

    </>)
}