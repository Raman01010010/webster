
import io from 'socket.io-client';
import { useState, useEffect, useContext } from "react";
import { User } from '../context/User';
import axios from '../api/axios';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Link, useLocation } from "react-router-dom";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation'
import ImageIcon from '@mui/icons-material/Image';
import Dropzone from "react-dropzone";
import Loader from "./Loader";
import pic from './profile.jpg'
import { useParams,useNavigate } from 'react-router-dom';   

const socket = io('http://localhost:3500');

export default function Chat() {
    let { id } = useParams();
    console.log(id)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const { newUser } = useContext(User)

    const [message, setMessage] = useState({ "sender": newUser.userid, "receiver": "6548fae8ee9562f6a060844e", "content": "", "room": "" })
    const [messages, setMessages] = useState([[{ "name": "Raman", "content": "helllo" }]])
    const [user2Id,setUser2id]= useState(''+id)
    const [conn,setConn]=useState([])
    const [file, setFile] = useState(null);
    const [load, setLoad] = React.useState(0)
    const [stat, setStat] = React.useState('')

    console.log(newUser)

    ///FILE UPLOAD
    const handleDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        console.log(file)
      };
      const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append('json',JSON.stringify(message))
        setLoad(1)
        try {
          const response = await axios.post("/chat/img", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          console.log("File uploaded:", response.data);
          socket.emit('message', response?.data);
          // Handle the response as needed (e.g., store the URL in your database).
        } catch (error) {
          console.error("Upload failed:", error);
        }
        setLoad(0)
      };
//////Sockets
    useEffect(() => {
        socket.on('message', (data) => {
            console.log("Raman")
            setMessages(old => {
                return ([...old, data])
            })
            console.log(messages)
            // Handle incoming messages
            // Update the 'messages' state with the new message
        });

        socket.on('activity', (name) => {
            // Handle typing activity
            //  setActivity(`${name} is typing...`);

            // Clear after 3 seconds
            // clearTimeout(activityTimer);
            const newActivityTimer = setTimeout(() => {
                //setActivity('');
            }, 3000);
            //  setActivityTimer(newActivityTimer); // Update the activityTimer state
        });

        socket.on('userList', ({ users }) => {
            // setUsers(users);
        });

        socket.on('roomList', ({ rooms }) => {
            // setRooms(rooms);
        });
    }, []);

    useEffect(() => {
        // Ensure the room ID is consistent for both users by sorting their IDs
        const sortedUserIds = [newUser.userid, user2Id].sort();
        const uniqueRoomID = sortedUserIds.join('_');
        console.log(uniqueRoomID) // You can add a timestamp if needed
        socket.emit('enterRoom', {
            name: newUser.userid,
            room: uniqueRoomID,
        });
        setMessage(old => {
            return ({
                ...old,
                "room": uniqueRoomID,
                "sender": newUser.userid,
                "receiver":user2Id
            })
        }
        )
    }, [newUser.userid, user2Id]);


    useEffect(()=>{
const fetch=async()=>{
    const sortedUserIds = [newUser.userid, user2Id].sort();
    const uniqueRoomID = sortedUserIds.join('_');
    setMessage(old=>{
        return({
            ...old,
            "sender": newUser.userid,
            "receiver":user2Id
        })
    })
   // setLoad(1)
    try{
        const res1 = await axios.post('/chat', { "room": uniqueRoomID });
        console.log(res1);
        setMessages(old=>{
            return(
                [...res1?.data]
            )
        })
    }catch(error){
        console.log(error)
    }
   // setLoad(0)
}
fetch()
    },[user2Id])
    useEffect(() => {
        // Update isDesktop state when the window is resized
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const sortedUserIds = [newUser.userid, user2Id].sort();
            const uniqueRoomID = sortedUserIds.join('_'); 
        //    setLoad(1)
            try {
                const res = await axios.post('/chat/req', { "email": newUser.email,'userid':newUser.userid });
                console.log(res);
                setConn(res?.data);
            } catch (error) {
                console.log(error);
            }
          //  setLoad(0)


           
        };
    
        fetchData();
    }, [newUser.email]);
    
    function handleChange(event) {

        setMessage(old => {
            return ({
                ...old,
                [event.target.name]: event.target.value
            })
        })
        console.log(message)

    }






   async function handleSend(e) {
        e.preventDefault();
        // if (name && msgInput && chatRoom) {
        socket.emit('message', message);
        setMessage(old => {
            return ({
                ...old,
                //  "text":""
            })
        })
        try{
        const response = await axios.post('/chat/create', {"room": message.room, "name": newUser.userid});
    }catch(error){  
        console.log(error)
    }
        //  }
    }
    const navigate=useNavigate();
    function setO(id){
        setUser2id(id)
      navigate(`/chatr/${id}`)
   
    }
    function mesreq(){
        navigate(`/chat/${newUser.userid}`)
    }
    return (<>
        <section style={{ zIndex:2,backgroundColor: "#CDC4F9" }}>
            <div className="container mx-auto sm:px-4 py-5">
                <div className="flex flex-wrap ">
                    <div className="md:w-full pr-4 pl-4">
                    <Fab onClick={mesreq} sx={{
          position: "fixed",
          bottom: "20px", // Adjust the bottom value as needed
          right: "20px",
          color: 'success.main', // Adjust the right value as needed
        }} variant="extended">
        <NavigationIcon sx={{ mr: 1 }}  />
        INBOX
      </Fab>
                        <div
                            className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300"
                            id="chat3"
                            style={{ borderRadius: 15 }}
                        >
                            <div className="flex-auto p-6">
                                <div className="flex flex-wrap ">


                                    {isDesktop && <div id="desk" className=" h-3/4 overflow-scroll md:w-1/2 pr-4 pl-4 lg:w-2/5 pr-4 pl-4 xl:w-1/3 pr-4 pl-4 mb-4 md:mb-0">
                                        <div className="p-6">
                                            <div className="relative flex items-stretch w-full rounded mb-3">
                                                <input
                                                    type="search"
                                                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded rounded"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    aria-describedby="search-addon"
                                                />
                                                <span
                                                    className="input-group-text border-0"
                                                    id="search-addon"
                                                >
                                                    <i className="fas fa-search" />
                                                </span>
                                            </div>
                                            <div
                                                data-mdb-perfect-scrollbar="true"
                                                style={{ position: "relative", height: 400 }}
                                            >
                                                <ul className="list-unstyled mb-0">

                                                    
                                                   
                                                    {conn.map(item=>{
                                                        return(<>
                                                         <li className="p-2 border-b">
                                                        <a onClick={()=>setO(item?.item.accepted[0]._id)} className="flex justify-between">
                                                            <div className="flex flex-row">
                                                                <div>
                                                                    <img
                                                                        src={pic}
                                                                        alt="avatar"
                                                                        className="flex self-center me-3"
                                                                        width={60}
                                                                    />
                                                                    <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 badge-dot" />
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="fw-bold mb-0">{item?.item.accepted[0].username}</p>
                                                                    <p className="text-xs text-gray-700">
                                                                    {item?.latestMessages[0].content}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {/* <div className="pt-1">
                                                                <p className="text-xs text-gray-700 mb-1">
                                                                    Just now
                                                                </p>
                                                                <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 rounded-full py-2 px-4 float-end">
                                                                    3
                                                                </span>
                                                            </div> */}
                                                        </a>
                                                    </li></>)
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>}




                                    <div className=" md:w-1/2 pr-4 pl-4 lg:w-3/5 pr-4 pl-4 xl:w-2/3 pr-4 pl-4">

                                        <div
                                            className="pt-3 pe-3"

                                            style={{ position: "relative", height: 350 }}
                                        >
                                            <div className="h-5/6 overflow-scroll">

                                                {messages.map(item => {
                                                    //console.log(messages)
                                                  //  console.log(item)
                                                    return (<>
                                                        {item.sender !== newUser.userid ?
                                                        <>
                                                        <div className="flex flex-row justify-start">
                                                            <img
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                                alt="avatar 1"
                                                                style={{ width: 45, height: "100%" }}
                                                            />
                                                            <div>
                                                                <p
                                                                    className="text-xs p-2 ms-3 mb-1 rounded-3"
                                                                    style={{ backgroundColor: "#f5f6f7" }}
                                                                >
                                                                    {item.content}
                                                                </p>
                                                                <p className="text-xs ms-3 mb-3 rounded-3 text-gray-700 float-end">
                                                                {item.timestamp}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    { item?.other?.link&&item?.other?.des=='jpg'&&   <div className="flex flex-row justify-start">

                                                            <img
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                                alt="avatar 1"
                                                                style={{ width: 45, height: "100%" }}
                                                            />
                                                            <div>
                                                        
                                                                <p
                                                                    className="text-xs p-2 ms-3 mb-1 rounded-3"
                                                                    style={{ backgroundColor: "#f5f6f7" }}
                                                                >
                                                                        <img style={{height:"50%"}} src={item?.other?.link}/>
                                                                    {item.content}
                                                                </p>
                                                                <p className="text-xs ms-3 mb-3 rounded-3 text-gray-700 float-end">
                                                                    {item.timestamp}
                                                                </p>
                                                            </div>
                                                        </div>}
                                                        </>
                                                         : 
                                                         <>
                                                         <div className="flex flex-row justify-end">
                                                            <div>
                                                                <p className="text-xs p-2 me-3 mb-1 text-white rounded-3 bg-blue-600">
                                                                    {item.content}
                                                                </p>
                                                                <p className="text-xs me-3 mb-3 rounded-3 text-gray-700">
                                                                {item.timestamp}
                                                                </p>
                                                            </div>
                                                            <img
                                                                src={pic}
                                                                alt="avatar 1"
                                                                style={{ width: 45, height: "100%" }}
                                                            />
                                                        </div>
                                                        {item?.other?.link&&item?.other?.des=='jpg'&&<div className="flex flex-row justify-end">
                                                            <div>
                                                              
                                                                <p className="text-xs p-2 me-3 mb-1 text-white rounded-3 bg-blue-600">
                                                                <img style={{height:"50%"}} src={item?.other?.link}/>
                                                                </p>
                                                                <p className="text-xs me-3 mb-3 rounded-3 text-gray-700">
                                                                {item.timestamp}
                                                                </p>
                                                            </div>
                                                            <img
                                                                src={pic}
                                                                alt="avatar 1"
                                                                style={{ width: 45, height: "100%" }}
                                                            />
                                                        </div>
                                                        
                                                        }
                                                        </>} </>)
                                                })}









                                            </div>
                                        </div>
                                        <div className="relative mb-4">

                                        <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p></p>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <ImageIcon />
      </Fab>
     
    </Box>
   
          </div>
        )}
      </Dropzone>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
                                    
                                            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                                                Message
                                            </label>

                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="text"
                                                name="content"
                                                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                        </div>
                                        <button onClick={handleSend} className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                                            Accept
                                        </button>
                                        {load&&<Loader/>}
                                        <div className="text-gray-700 flex justify-start items-center pe-3 pt-3 mt-2">


                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>)
}