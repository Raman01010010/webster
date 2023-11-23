import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';
import { User } from '../context/User';
import axios from '../api/axios';
import socket from '../services/socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMicrophone, faDesktop, faPhone, faVideoSlash } from '@fortawesome/free-solid-svg-icons';

// ... your existing code ...
function App() {
  const { vdata, setVdata, newUser } = useContext(User);
  const { aid } = useParams();

  const [peer, setPeer] = useState(null);
  const [myStream, setMyStream] = useState();
  const [screenStream, setScreenStream] = useState();
  const [peerId, setPeerId] = useState('');
  const [myPeerId, setMyPeerId] = useState('');
  const myVideo = useRef();
  const peerVideo = useRef();
  const peerRef = useRef(null);
  const [callStatus, setCallStatus] = useState('idle');
  const [m,setM]=useState(1) // 'idle', 'ongoing', 'ended'
const [scr,setScr]=useState(1)
  useEffect(() => {
    if (vdata.remote !== '') {
      setPeerId(vdata.remote);
    }
  }, [vdata.remote]);

  useEffect(() => {
    setVdata({ ...vdata, myid: myPeerId });
  }, [myPeerId]);

  useEffect(() => {
    const peerInstance = new Peer();

    peerInstance.on('open', (id) => {
      setMyPeerId(id);
      setVdata({ ...vdata, myid: id });
      console.log(vdata);
      socket.emit('create', { myid: newUser.userid, callid: id });
    });

    peerInstance.on('call', (call) => {
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

    setPeer(peerInstance);
    peerRef.current = peerInstance;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    return () => {
      peerRef.current.disconnect();
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Empty dependency array to run only once on mount

  const connectToPeer = () => {
    setCallStatus('ongoing');
    if (peerRef.current) {
      const streamToUse = screenStream || myStream;
      const call = peerRef.current.call(peerId, streamToUse);

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
    }
  };

  const startScreenShare = () => {
    setScr(1)
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((screenStream) => {
        setScreenStream(screenStream);
        if (myVideo.current) {
          myVideo.current.srcObject = screenStream;
        }
      })
      .catch((error) => {
        console.error('Error accessing screen share:', error);
      });
  };

  const stopScreenShare = () => {
    setScr(0)
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
      // Resume showing the camera video
      if (myVideo.current) {
        myVideo.current.srcObject = myStream;
      }
    }
  };

  async function kall() {
    try {
      const re = await axios.post('/videoc/call', {
        myid: newUser.userid,
        userid: aid,
        callid: vdata.myid,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const send = () => {
    setM(0)
    socket.emit('call', { myid: newUser.userid, callid: myPeerId, remote: aid });
  };

  useEffect(() => {
    const send1 = () => {
      socket.emit('call', { myid: newUser.userid, callid: myPeerId, remote: aid });
    };
    send1();
  }, []);

  function conn() {
    socket.emit('accept', { myid: newUser.userid, origin: aid, callid: myPeerId });
  }

  useEffect(() => {
    socket.on('newcall', (data) => {
      const d = { myid: vdata.myid, remote: data.callid };
      setVdata(d);
      socket.emit('answer', { callid: vdata.myid, userid: data.remote });
      
    });
    socket.on('final', (data) => {
      setVdata({ myid: vdata.myid, remote: data.callid });
      setPeerId(data.callid);
    });
    socket.on('ram', () => {
      connectToPeer();
    });
  }, []);
  const endCall = () => {
    setCallStatus('idle');
    setM(1)
    if (peerRef.current) {
      peerRef.current.destroy();
      setPeerId("")
      //connectToPeer()
     // setCallStatus('ended');
    }
  };
  
  return (
    
<div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center" style={{ paddingTop: '5vh' }}>
  <h1 className="text-4xl font-bold text-white mb-4">Video Call App</h1>
  <p className="text-white mb-4">Your Peer ID: {myPeerId}</p>

  <input
    type="text"
    value={peerId}
    onChange={(e) => setPeerId(e.target.value)}
    placeholder="Enter peer id"
    className="p-2 mb-4 rounded border border-gray-300"
  />

  <div className="relative w-full h-full"> {/* Make the container relative */}
    <video playsInline ref={peerVideo} autoPlay className="w-full h-full" /> {/* Make the peer video full screen */}
    <video playsInline muted ref={myVideo} autoPlay className="absolute bottom-4 right-4 w-64 h-48 border border-gray-300" /> {/* Make your video floating on top */}
  </div>

  <div className="flex justify-center space-x-4 mt-4"> {/* Added flex container for buttons */}
   {scr?
    peerId&&<button onClick={startScreenShare} className="bg-blue-500 text-white py-2 px-4 rounded">
      <FontAwesomeIcon icon={faDesktop} className="mr-2" />
      Start Screen Share
    </button>
    :
   peerId&& <button onClick={stopScreenShare} className="bg-red-500 text-white py-2 px-4 rounded">
      <FontAwesomeIcon icon={faVideoSlash} className="mr-2" />
      Stop Screen Share
    </button>
    }
    {peerId?m&&<button onClick={send} className={`bg-${peerId ? 'green-500' : 'blue-500'} text-white py-2 px-4 rounded`}>
      <FontAwesomeIcon icon={peerId ? faPhone : faVideo} className="mr-2" />
     Accept Call
    </button>:
    m?<button onClick={send} className={`bg-${peerId ? 'green-500' : 'blue-500'} text-white py-2 px-4 rounded`}>
      <FontAwesomeIcon icon={peerId ? faPhone : faVideo} className="mr-2" />
     Call
    </button>:<div>Calling.... Wait to Connect the Call</div>}
    <div className="flex justify-center space-x-4 mt-4">
  {callStatus === 'ongoing' && (
    <button onClick={endCall} className="bg-red-500 text-white py-2 px-4 rounded">
      <FontAwesomeIcon icon={faPhone} className="mr-2" />
      Stop Stream
    </button>
  )}
  {callStatus === 'idle' && peerId && (
    <button onClick={connectToPeer} className="bg-green-500 text-white py-2 px-4 rounded">
      <FontAwesomeIcon icon={faVideo} className="mr-2" />
      Share Stream
    </button>
  )}
 { peerId&&<button onClick={connectToPeer} className="bg-green-500 text-white py-2 px-4 rounded">
      <FontAwesomeIcon icon={faVideo} className="mr-2" />
      Reconnect
    </button>}
  {/* ... other buttons ... */}
</div>

  </div>
</div>
  );
}

export default App;
