
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
import { useEffect } from 'react';
import { getR } from './api/api';
function App() {

  const [newUser, setNewUser] = React.useState({ "email": "", "username": "", "pwd": "", "name": "", "accessToken": "" })
  useEffect(() => {
    async function fetchData() {
      try {
        const res = ""//await getR();
        console.log(res);
       // newUser.accessToken=res.data?.accessToken
        console.log(newUser)
        //navigate('/dashboard')
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []); // Removed the async keyword

  return (
    <>
    <User.Provider value={{newUser,setNewUser}}>
      <Router>
     {(!newUser.accessToken)&&<Navbar/>}
     {(newUser.accessToken)&&<Navbar2/>}
   
      </Router>
    </User.Provider>
    </>
  );
}

export default App;
