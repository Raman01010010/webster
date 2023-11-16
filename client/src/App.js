
import { User } from './context/User';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Navbar2 from './component/Navbar2';
import Post1 from './component/Post';
import AllPost from './component/AllPost';
import Reactions from './component/Reactions';
import Job from './component/Job';

import { useEffect } from 'react';
import { getR } from './api/api';
import PostForm from './component/Post2';
import YourMainComponent from './component/AllPost2';
import Test1 from './component/Test1';
import Aos from 'aos'
import 'aos/dist/aos.css'
function App() {
  useEffect(()=>{
    Aos.init()
  })
  const [newUser, setNewUser] = React.useState({ "email": "", "username": "dummy", "pwd": "", "name": "", "accessToken": "" })
  const [comp,setComp]=React.useState({
      titles: "",
      company: "",
      locationonsite: "",
      lastdate: "",
      jobtype: "",
      details: "",
      contact: ["","",""],
      locationtypes:"",
      applylink: "",    
      skill:[],
      jobberid: newUser.userid // Jobber id aur user id same hai dhyan dena koi antar nii hai
    })
    const [notifications, setNotifications] = React.useState([]);
    useEffect(() => {
      setComp((prevComp) => ({
        ...prevComp,
        jobberid: newUser.userid,
        contact: ["", newUser.email, ""],  // Update contact[1]
      }));
    }, [newUser.userid, newUser.email]);
    
    // comp.contact[1]=newUser.email
    console.log("111"+newUser)
  return (
    <>
    <User.Provider value={{newUser,setNewUser,comp,setComp,notifications,setNotifications}}>
      <Router>
     {(!newUser.accessToken)&&<Navbar/>}
     {(newUser.accessToken)&&<Navbar2/>}
   
 
   
      </Router>

    </User.Provider>
    </>
  );
}

export default App;
