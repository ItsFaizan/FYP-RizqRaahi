

import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import vector2 from "../../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg";
import UserChat from "./UserChat";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { io } from "socket.io-client";
import Sidebar from "../Sidebar/Sidebar";
import Sidebar2 from "../Sidebar/Sidebar2";

const Conversations = ({ route }) => {
  const [type, setType] = useState("");
  const [conversations, setConversations] = useState([]);
  const [isInfo, setIsInfo] = useState(false);
  const [CurrentConvo, setCurrentConvo] = useState();



  const socket = useRef(null);

 

  const navigate = useNavigate();
  const locationdata = useLocation();
  const data1 = locationdata.state;
  const token = data1.token;


  const option  = data1.option;
  
  console.log("the option called ===== " , option)

 

 

  useEffect(() => {
    console.log("initiating socket communication ");

    // Connect to the Socket.io server when the component mounts
    socket.current = io("http://localhost:3001", {
      auth: { token },
    });

    socket.current.on(`RecieveMessage${CurrentConvo}${type}`, (messageData) => {
      
    });

    getCoversations();
    handleUserClick();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const getCoversations = async () => {
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

      console.log("Server response convooooooooooooooooooooooo:", data);

      if (data.success === true && data.message === "No conversations found") {
        setIsInfo(true);
        setConversations([]);
      } else if (data.success === true) {
        setIsInfo(false);
        setType(data.type);
        setConversations(data.conversations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error("Error fetching conversations");
    }
  };

  //=============================================================
  useEffect(() => {
    getCoversations();

    // Set up an interval to call getCoversations every second
    const intervalId = setInterval(getCoversations, 2000);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []); // Equivalent to useFocusEffect
  //========================================================================

  const renderConversationItem = (conversation) => {

   

    const {
      id,
      participantRestaurantRelation,
      participantNGORelation,
      lastMessage,
      updatedAt,
      unreadCount,
      lastTimestamp,
    } = conversation;
    // const formattedTime = new Date(updatedAt).toLocaleTimeString();

    const formattedTime = new Date(lastTimestamp);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // This will use 12-hour time format with AM/PM
    };

    const formattedTime2 = formattedTime.toLocaleString("en-US", options);

console.log(`Formatted date: ${formattedTime}`);

   const participantName =
    option === "NGO"
    ? participantRestaurantRelation.name
      : participantNGORelation.name;
      

  

    return (
      <div
        key={lastTimestamp}
        className="bg-white-300 px-3 flex items-center cursor-pointer hover:bg-gray-100"
        onClick={() => handleUserClick(id)}
      >
       
        <div>
          <img className="h-12 w-12 rounded-full" src={vector2} />
        </div>
        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
          <div className="flex items-bottom justify-between">
            <p className="text-grey-darkest">
              {participantName}
            </p>
            <p className="text-xs text-grey-darkest">{`${formattedTime2}`}</p>
          </div>
          <div className="flex items-bottom justify-between">
            <p className="text-grey-dark mt-1 text-sm">
              {lastMessage || "No previous messages"}
            </p>
            <p className="text-xs text-grey-darkest">
              {/* {user.seen ? (
          <div className="flex items-center">
          <ExclamationIcon className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-green-500 font-semibold">Unread</span>
          </div>
          ) : (
            <div className="flex items-center">
          <CheckIcon className="h-4 w-4 text-blue-500 mr-1" />
          <span className="text-blue-500 font-semibold">Seen</span>
          </div>
          )} */}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const handleUserClick = (selectedUser) => {
    // Handle user click logic here

    

    console.log("Selected User:=============================", selectedUser);
    setCurrentConvo(selectedUser);
    getCoversations();
  };

  return (
    <div className="bg-white-500 flex" >
    {option === "Restaurant"
                ? <Sidebar2/>
                : option === "NGO"
                ? <Sidebar/>
                : null
              }
    
     

      <div className="container mx-auto " style={{ marginTop: "-1px" }}>
        <div className="py-6 h-screen">
          <div className="flex border border-grey rounded dark:shadow-lg h-full">
            <div className="w-1/3 border flex flex-col">
              <div className="py-2 px-3 bg-grey-600 flex flex-row justify-between items-center">
                <div>
                  {/* <img className="w-10 h-10 rounded-full" src="http://andressantibanez.com/res/avatar.png" alt="avatar" /> */}
                  <img
                    src={vector2}
                    alt="Image"
                    className="top-[60px] left-[205px] w-[70px] h-[60px] mx-auto"
                  />
                  {/* <img src="example.jpg" alt="Image of a beautiful sunset" /> */}
                </div>
                {/* <h1 className="text-1x1 font-extrabold text-gray-800 tracking-wide shadow-lg text-white text-center">
  RIZQ RAHI CHAT BOX
</h1> */}

                <div className="flex">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#727A7E"
                        d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        opacity=".55"
                        fill="#263238"
                        d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#263238"
                        fillOpacity=".6"
                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="py-2 px-2 bg-white-400">
                <input
                  type="text"
                  className="w-full px-2 py-2 text-sm bg-gray-300"
                  placeholder="Search or start new chat"
                />
              </div>

              <ToastContainer />

              {conversations && conversations.length > 0 ? (
                //======================

                //========================

                <div style={styles.container}>
                  {conversations.map(renderConversationItem)}
                </div>
              ) : null}

              {isInfo ? (
                <div style={styles.Infocontainer}>
                  <p style={styles.Infotext}>No Conversations Found</p>
                </div>
              ) : null}
            </div>

        
            <UserChat convoid={CurrentConvo} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    // Add your container styles here
  },
  conversationItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    marginRight: "10px",
  },
  details: {
    flex: 1,
  },
  restaurantId: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  previousMessage: {
    color: "#555",
    marginBottom: "5px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  info: {
    textAlign: "right",
  },
  time: {
    fontSize: "12px",
    color: "#888",
  },
  unreadSymbol: {
    backgroundColor: "red",
    color: "white",
    padding: "3px 6px",
    borderRadius: "50%",
    marginLeft: "5px",
    fontSize: "12px",
  },
  Infocontainer: {
    // Add your info container styles here
  },
  Infotext: {
    // Add your info text styles here
  },
};

export default Conversations;
