
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
  const [inputValues, setInputValues] = React.useState({
    fullName: '',
    role: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    image:'',
    education: [
      { degreeName: '', schoolName: '', startDate: '', endDate: '', grade: '' },
      { degreeName: '', schoolName: '', startDate: '', endDate: '', grade: '' },
    ],
    skill:[],
  });
  const [accordionItems, setAccordionItems] = React.useState([
    { id: 1, content: 'Accordion 1 Content', isOpen: false },
    { id: 2, content: 'Accordion 2 Content', isOpen: false },
  ]);
  const [accordionItems2, setAccordionItems2] = React.useState([
    { id: 1, content: 'Accordion 1 Content', isOpen: false },
    { id: 2, content: 'Accordion 2 Content', isOpen: false },
  ]);
  const [newUser, setNewUser] = React.useState({ "email": "", "username": "dummy", "pwd": "", "name": "", "accessToken": "" })
  const [vdata,setVdata]=React.useState({"myid":"","remote":""})
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
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const openSnackbar = () => {
      setShowSnackbar(true);
    };
  
    const closeSnackbar = () => {
      setShowSnackbar(false);
    };
    const[sh,setSh]=React.useState(0)
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
    <User.Provider value={{newUser,setNewUser,comp,setComp,notifications,setNotifications,sh,setSh,inputValues,setInputValues,accordionItems,setAccordionItems,accordionItems2,setAccordionItems2, showSnackbar,setShowSnackbar, openSnackbar, closeSnackbar,vdata,setVdata}}>
      <Router>
     {(!newUser.accessToken)&&<Navbar/>}
     {(newUser.accessToken)&&<Navbar2/>}
   
 
   
      </Router>

    </User.Provider>
    </>
  );
}

export default App;
