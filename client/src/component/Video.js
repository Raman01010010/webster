import React, { useEffect, useRef, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';
import { User } from '../context/User';
import axios from '../api/axios';
function App() {
const {vdata,setVdata,newUser}=useContext(User)
const {aid}=useParams()
console.log(vdata)
  const [peer, setPeer] = useState(null);
  const [myStream, setMyStream] = useState();
  const [screenStream, setScreenStream] = useState();
  const [peerId, setPeerId] = useState("");
  const [myPeerId, setMyPeerId] = useState("");
  const myVideo = useRef();
  const peerVideo = useRef();
  useEffect(() => {
    if(vdata.remote!=""){
        setPeerId(vdata.remote)
    }
},[vdata.remote])
  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setMyPeerId(id);
      setVdata({...vdata,myid:id})
      console.log(vdata)
    });

    setPeer(peer);



    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setMyStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
      });

    peer.on('call', (call) => {
      call.answer(myStream);
      call.on('stream', (remoteStream) => {
        if (peerVideo.current) {
          peerVideo.current.srcObject = remoteStream;
        }
      });

      // Optionally, handle errors and close events
      call.on('error', (error) => {
        console.error('Call error:', error);
      });

      call.on('close', () => {
        // Handle the call being closed
      });
    });

    return () => {
      peer.disconnect();
      if (myStream) {
        myStream.getTracks().forEach(track => track.stop());
      }
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Empty dependency array to run only once on mount

  const connectToPeer = () => {
    const streamToUse = screenStream || myStream;
    const call = peer.call(peerId, streamToUse);

    call.on('stream', (remoteStream) => {
      if (peerVideo.current) {
        peerVideo.current.srcObject = remoteStream;
      }
    });

    call.answer(streamToUse);

    // Optionally, handle errors and close events
    call.on('error', (error) => {
      console.error('Call error:', error);
    });

    call.on('close', () => {
      // Handle the call being closed
    });
  };

  const startScreenShare = () => {
    navigator.mediaDevices.getDisplayMedia({ video: true })
      .then(screenStream => {
        setScreenStream(screenStream);
        if (myVideo.current) {
          myVideo.current.srcObject = screenStream;
        }
      })
      .catch(error => {
        console.error('Error accessing screen share:', error);
      });
  };

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      // Resume showing the camera video
      if (myVideo.current) {
        myVideo.current.srcObject = myStream;
      }
    }
  };
async function kall(){
try{
const re=await axios.post('/videoc/call',{myid:newUser.userid,userid:aid,callid:vdata.myid})
}catch(error){
    console.log(error)
}
}
  return (
    <div style={{paddingTop:"5vh"}}>
      <h1>Video Call App</h1>
      <p>Your Peer ID: {myPeerId}</p>
      <input type="text" value={peerId} onChange={(e) => setPeerId(e.target.value)} placeholder="Enter peer id" /><br/>
      <button onClick={connectToPeer}>Connect</button><br/>
      <button onClick={startScreenShare}>Start Screen Share</button><br/>
      <button onClick={stopScreenShare}>Stop Screen Share</button><br/>
      <button onClick={kall}>Callll</button><br/>
      <div>
        <video playsInline muted ref={myVideo} autoPlay style={{ width: "480px" }} />
        <video playsInline ref={peerVideo} autoPlay style={{ width: "480px" }} />
      </div>
    </div>
  );
}

export default App;
