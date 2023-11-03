import logo from './logo.svg';
import { User } from './context/User';
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Navbar2 from './component/Navbar2';
import Post1 from './component/Post';
function App() {
  const [newUser, setNewUser] = React.useState({ "email": "", "username": "", "pwd": "", "name": "", "accessToken": "" })

  return (
    <>
    <User.Provider value={{newUser,setNewUser}}>
      <Router>
     {(!newUser.accessToken)&&<Navbar/>}
     {(newUser.accessToken)&&<Navbar2/>}
     <Post1/>
      </Router>
    </User.Provider>
    </>
  );
}

export default App;
