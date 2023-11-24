import React, { useState, useEffect,useContext } from 'react';
import io from 'socket.io-client';
import { User } from '../context/User';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import socket from '../services/socket';
import NotifiButton from './NotifiButton';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notificationSound from './notifications-sound-127856.mp3';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Notification() {
  const axiosPrivate=useAxiosPrivate()
    const {newUser,notifications,setNotifications,vdata,setVdata}=useContext(User)
 // const [notifications, setNotifications] = useState([]);
  const [show,setShow]=useState(1)
  //console.log(newUser)
  const userId = newUser.userid; // Replace with your authentication logic

  useEffect(() => {
    // Join the user to their own room based on userId
    socket.emit('joinRoom', userId);

    // Listen for new notifications
    socket.on('newNotification', (notification) => {
      const audio = new Audio(notificationSound);
      audio.play();
      toast.success("New notification check it now");

      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });
    
    socket.on('newcall', (data) => {
      console.log(data)
      const d = { myid: vdata.myid, remote: data.callid };
      setVdata(d);
      socket.emit('answer', { callid: vdata.myid, userid: data.remote });
      localStorage.setItem('remote',data.callid);
    });
    socket.on('final', (data) => {
      setVdata({ myid: vdata.myid, remote: data.callid });
      localStorage.setItem('remote',data.callid);
     // setPeerId(data.callid);
    });
  }, []);

  const sendNotification = (message) => {
    socket.emit('sendNotificationtoone', { userId:'65492160c09f811600265617', message });
  };

  return (
   <></>
  );
}

export default Notification;
