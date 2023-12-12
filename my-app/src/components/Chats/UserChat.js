import React, { useEffect, useRef, useState } from "react";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import vector2 from "../../assets/chat.jpg";
import vector1 from "../../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg";
import flatted from "flatted";
import { io } from "socket.io-client";

import { stringify, parse } from "flatted";
import { useLocation } from "react-router-dom";

function UserChat({ convoid }) {

  


  const [messages, setMessages] = useState([]);
  const [newmessages, setnweMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [type, setType] = useState(""); // Assuming you need to manage the type as well
  const [currentConversation, setCurrentConversation] = useState(null);
  const [currentuser, setcurrentuser] = useState();
  const flatted = { stringify, parse };

  //for scrolling down the chat
  const chatAreaRef = useRef(null);

  const socket = useRef(null);

  // const navigate = useNavigate();
  const locationdata = useLocation();
  const data1 = locationdata.state;
  const token = data1.token;


const formatTimestamp = (timestamp) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  // Create a Date object from the timestamp string
  const date = new Date(timestamp);

  // Use Intl.DateTimeFormat to format the date
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

  useEffect(() => {
    // Scroll to the bottom of the chat area when messages change
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    // Establish a socket connection
    socket.current = io(`http://localhost:3001`, {
      auth: { token: token },
    });

    // Add socket event listeners
    socket.current.on(`RecieveMessage${convoid}${type}`, (messageData) => {
      // Handle received messages
      // Update the state to add the received message
      console.log("here is soicket message ", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData.message]);
    });

    fetchData();

    // handleConvoIdChange(convoid);
    // fetchMessagesForConversation(convoid)

    // Cleanup socket connection on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, [convoid, token, type]);

  const handleNewUserMessage = async (newMessage, token) => {
    socket.current.on("sent-message", (messageData) => {
      console.log(messageData.message.senderType + "Just sent a message");
      var newmessage = {
        _id: messageData.message.id,
        text: messageData.message.content,
        createdAt: new Date(messageData.message.timestamp),
        user: {
          _id: 1,
          name: messageData.message.senderName,
        },
      };

     

      // setMessages((prevMessages) => GiftedChat.append(prevMessages, newmessage));
    });

    var messageData = {
      conversationId: convoid,
      content: newMessage,
    };

    socket.current.emit("send-message", messageData);

    var messageData1 = {
      conversationId: convoid,
      content: newMessage,
      senderName: currentuser,
      timestamp: new Date().toISOString(),
    };

    setMessages((messages) => [...messages, messageData1]);
    setnweMessages("");
  };

  useEffect(() => {
    // Fetch conversations from the backend

    // handleConvoIdChange(convoid);
    fetchData();
  }, [convoid, token, type]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        "http://localhost:3001/api/getconversations",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();


     

      if (data.success === true && data.message === "No conversations found") {
        // Handle case when no conversations found
      } else if (data.success === true) {
        setType(data.type);
        setParticipants(data.conversations); // Assuming conversations have participants
        // Optional: Load initial messages for the first conversation, if needed
        if (data.conversations.length > 0) {
          function findValueAndIndex(array, value) {
            for (let i = 0; i < array.length; i++) {
              if (array[i].id === value) {
                // If the value is found, return both the value and the index
                return { value: array[i], index: i };
              }
            }

            // If the value is not found, return an object with undefined values
            return { value: undefined, index: -1 };
          }

          // const result = findValueAndIndex(data.conversations, convoid);

           //===============================================================================================

           const conversations1 = data.conversations;
           const result = findValueAndIndex(conversations1, convoid);
           
           
             const timestampFromObject = conversations1[result.index].participantRestaurantRelation.lastTimestamp;
             const dateObjectFromObject = new Date(timestampFromObject);
           
           
             const options = {
               year: "numeric",
               month: "numeric",
               day: "numeric",
               hour: "numeric",
               minute: "numeric",
               second: "numeric",
               hour12: true,
             };
           
             // Format the timestamp
             const formattedTimeFromObject = dateObjectFromObject.toLocaleString("en-US", options);
           
             // Update the lastTimestamp property in the original object
             conversations1[result.index].participantNGORelation.lastTimestamp = formattedTimeFromObject;
           
             console.log(`Formatted date from object-------------------------: ${formattedTimeFromObject}`);
           
           


  //==================================================================================================



          setCurrentConversation(conversations1[result.index]); // Set the current conversation
         
          if(type == "Restaurant"){

            setcurrentuser(
            
              conversations1[result.index].participantRestaurantRelation.name
            );

          }else if(type == "NGO"){

            setcurrentuser(
            
              conversations1[result.index].participantNGORelation.name
            );
            
          }
          
          // fetchMessagesForConversation(data.conversations[0].id);

          handleConvoIdChange(convoid);
          fetchMessagesForConversation(convoid);
        }
      } else {
        // Handle other cases
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      // Handle error fetching conversations
    }
  };

  const handleConvoIdChange = (newConvoId) => {
    // Your logic here...
    console.log("Convo ID changed. New Convo ID:", newConvoId);
    fetchMessagesForConversation(newConvoId);
    // Call your other method or perform any logic here...
    // For example:
    // fetchDataBasedOnConvoId(newConvoId);
  };

  const fetchMessagesForConversation = async (convoid) => {
    try {
      // Fetch messages for the selected conversation
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3001/api/getmessages/${convoid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      //================================================================================

      //===================================================================================
      console.log("Server response for messages:", data);

      if (data.success === true) {
        // Handle successful fetching of messages
        setMessages(data.messages);
      } else {
        // Handle other cases
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error fetching messages
    }
  };

  return (
    <div className="w-2/3 border flex flex-col">
      {currentConversation && (
        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center bg-green-500">
          <div className="flex items-center ">
            <div>
              <img
                className="w-10 h-10 rounded-full"
                src={vector1} // Replace with the actual field from your conversation data
                alt={`${currentConversation.participantNGO} avatar`}
              />
            </div>
            <div className="ml-4">
            <p className="text-grey-darkest">
              {type === "Restaurant"
                ? currentConversation.participantNGORelation.name
                : type === "NGO"
                ? currentConversation.participantRestaurantRelation.name
                : null
              }
            </p>
              <p className="text-grey-darker text-xs mt-1">
                {/* {currentConversation.members ? currentConversation.members.join(", ") : ''} */}
                {currentConversation.lastTimestamp}
              </p>
            </div>
          </div>
        </div>
      )}


      {/* Chat area */}
      <div
      ref={chatAreaRef}
        className="py-3 px-4 flex-1 overflow-auto"
        style={{
          backgroundImage: `url(${vector2})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              msg.senderName === currentuser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded py-2 px-3 ${
                msg.senderName === currentuser ? "bg-lime-100" : "bg-gray-100"
              }`}
            >
              <p
                className={`text-sm ${
                  msg.sender === currentuser ? "text-right" : "text-left"
                } text-purple`}
              >
                {msg.sender}
              </p>
              <p className="text-sm mt-1">{msg.content}</p>
              <p
            className={`text-${
              msg.sender === "currentUserId" ? "left" : "right"
            } text-xs text-grey-dark mt-1`}
          >
            {formatTimestamp(msg.timestamp)}
          </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-gray-200 border-grey rounded dark:shadow-lg px-4 py-4 flex items-center">
        <div className="flex-1 mx-4">
          <input
            className="w-full border bg-gray-300 rounded px-2 py-2"
            type="text"
            placeholder="Type your message here..."
            value={newmessages}
            onChange={(e) => setnweMessages(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={() => handleNewUserMessage(newmessages, token)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserChat;
