import React, { useState, useEffect, useContext } from "react";
import { User } from "../context/User";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const Jobcomment = () => {
  const { secondId, jobId } = useParams();
  const { newUser } = useContext(User);
  const userid = newUser.userid;

  const [data, setData] = useState({
    text: "",
    senderid: userid,
    receiverid: secondId,
    jobid: jobId,
    timestamp: "",
  });

  const [allMessages, setAllMessages] = useState([]);

  const handleMessageChange = (e) => {
    setData({ ...data, text: e.target.value });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send the message to your backend API
      const response = await axios.post("/job/jobcomment", data);
      console.log("Message sent:", response.data);

      // Check if the response has the expected structure
      if (response.data.success) {
        // Update the messages state with the sent messages
        setAllMessages([...allMessages, response.data.allMessages]);
        

        // Clear the message input
        setData({ ...data, text: "" });
      } else {
        console.error("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        console.log("called");
        // Fetch initial messages from your backend API
        const response = await axios.get(
          `/job/jobcomment2/${userid}/${secondId}/${jobId}`
        );

        // Check if the response has the expected structure
        if (response.data.success) {
          // Update the messages state with the sent messages
          setAllMessages([...allMessages, response.data.allMessages]);
          // setReceivermessages([...receivermessages, response.data.receivermessages]);
          

          // Clear the message input
          setData({ ...data, text: "" });
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
    };
    fetchInitialMessages();
  }, [userid, secondId, jobId]);
  const [inputFocus, setInputFocus] = useState(false);

  // console.log(sendermessages)
  // useEffect(() => {
  //   // Combine and sort messages when sender or receiver messages change
  //   let listC = [...sendermessages]; // Create a copy of sendermessages to avoid mutating the original array
  
  //   receivermessages.forEach((receiverMessage) => {
  //     const exists = listC.some(
  //       (senderMessage) => senderMessage.timeline === receiverMessage.timeline
  //     );
  
  //     if (!exists) {
  //       listC.push(receiverMessage);
  //     }
  //   });
  
  //   // Sort the combined array based on the timeline
  //   listC.sort((a, b) =>
  //     (a.dateTime_ISO || a.dateTime).localeCompare(b.dateTime_ISO || b.dateTime)
  //   );
  
  //   console.log("Combined and Sorted Messages:", listC);
  
  //   setAllMessages(listC);
  // }, [sendermessages, receivermessages]);
  
  
  // console.log("receivermessafs :" + receivermessages);
  console.log("All Messages:", allMessages);
  console.log("v1"+userid);
  console.log("v2"+secondId);
  return (
    
      <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
  style={{
    flex: 1,
    overflowY: 'scroll',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  }}
>
  {allMessages && allMessages[0] && allMessages[0].length > 0 ? (
    allMessages[0].map((message, index) => (
      <div
        key={index}
        style={{
          marginBottom: '10px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            backgroundColor: message?.senderid?._id === userid ? '#e6f7ff' : '#fff',
            padding: '10px',
            borderRadius: '8px',
            maxWidth: '70%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems:'flex-start',
          }}
        >
          <p style={{ margin: '0', color: '#333', fontWeight: 'bold' }}>{message.senderid.username}</p>
          <p style={{ margin: '0', color: 'blue' }}>{message.text}</p>
          <p style={{ margin: '0', color: 'gray', fontSize: '12px' }}>
            {new Date(message.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p>No messages available</p>
  )}
</div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          borderTop: '1px solid #ccc',
        }}
      >
        <input
          type="text"
          value={data.text}
          onChange={handleMessageChange}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          style={{
            flex: 1,
            padding: '8px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          onClick={handleSendMessage}
          style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#2ea44f',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            opacity: inputFocus ? '1' : '0.7',
          }}
        >
          Send Message
        </button>
      </div>
    </div>
    </>
  );
};

export default Jobcomment;
