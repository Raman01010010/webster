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
    <div>
      {/* Two <div> elements with the text "vivek" */}
      <div>vivek</div>
      <div>vivek</div>
      {/* Display all messages */}
      // Display all messages
      <div style={{ height: "300px", overflowY: "scroll" }}>
  {allMessages && allMessages[0] && allMessages[0].length > 0 ? (
    allMessages[0].map((message, index) => (
      <div
        key={index}
        style={{
          color: "blue",
          textAlign: message.senderid === userid ? "right" : "left",
        }}
      >
        {message && message.text && (
          <p style={{ color: "blue" }}>{message.text}</p>
        )}
        {message && message.timestamp && (
          <p style={{ color: "blue" }}> {new Date(message.timestamp).toLocaleString()}</p>
        )}
      </div>
    ))
  ) : (
    <p>No messages available</p>
  )}
</div>



      <form onSubmit={handleSendMessage}>
        <button type="submit">Send Message</button>
      </form>
      <input type="text" value={data.text} onChange={handleMessageChange} />
    </div>
  );
};

export default Jobcomment;
