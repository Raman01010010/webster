import React, { useState, useEffect,useContext } from 'react';
import io from 'socket.io-client';
import { User } from '../context/User';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import socket from '../services/socket';
import NotifiButton from './NotifiButton';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Notification() {
    const {newUser}=useContext(User)
  const [notifications, setNotifications] = useState([]);
  const [show,setShow]=useState(1)
  console.log(newUser)
  const userId = newUser.userid; // Replace with your authentication logic

  useEffect(() => {
    // Join the user to their own room based on userId
    socket.emit('joinRoom', userId);

    // Listen for new notifications
    socket.on('newNotification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    
  }, []);
  const sendNotification = (message) => {
    socket.emit('sendNotificationtoone', { userId:'65492160c09f811600265617', message });
  };

  return (
    <div>
      <h1>Notification App</h1>
      {show&&<NotifiButton/>}
      <button onClick={() => sendNotification('Hello!')}>Send Notification</button>
      <ul>
        {notifications.map((notification) => (
            <>
        
          <Alert  severity="success" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
        </>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
