import React, { useState, useEffect, useRef } from "react";
import "../styles/stepper.css";
import { TiTick } from "react-icons/ti";
import Food from "../assets/youngboi.png";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Sidebar2 from "./Sidebar/Sidebar2";
import { useTranslation } from 'react-i18next';


const DeliveryTracker = () => {

  const { t } = useTranslation();

  const socket = useRef(null);
  const navigate = useNavigate();
  const steps = [
    "Donation Creation",
    "Awaiting Claim",
    "Donation Pickup",
    "Pickup Complete",
    "Donation Feedback",
    "Donation Complete"
  ];
  const [currentPosition, setCurrentPosition] = useState(1); 
  const [donation, setDonation] = useState(null);
  const [isDonation, setIsDonation] = useState(false);
  const [restaurantName, setRestaurantName] = useState(""); 
  const [token, setToken] = useState(null);
  const [complete, setComplete] = useState(false);

  const getStepText = () => {
    var text = [];
    var firsttext;
    var secondtext = t("donationstatussecondtext");
    var ngoname = `${restaurantName}`;

    if (currentPosition === 1) {
      firsttext = t("donationstatusfirsttext1");
      ngoname = t("ngosubtext1");
    } else if (currentPosition === 2) {
      firsttext = t("donationstatusfirsttext2");
      ngoname = t("ngosubtext2")+ restaurantName;
    } else if (currentPosition === 4) {
      firsttext = t("donationstatusfirsttext3");
      ngoname = t("ngosubtext3")+ restaurantName;
    } else if (currentPosition === 5) {
      firsttext = t("donationstatusfirsttext4");
      ngoname = t("ngosubtext4")+ restaurantName;
    }

    text = [firsttext, secondtext, ngoname];
    return text;
  };

  const getDonationStatus = async (value) => {
    if (!isDonation) {
      try {
        const response = await fetch(`/getdonationstatus`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          console.log("Donation Status got data:" + JSON.stringify(data));
          if (data.claimedDonation.claimedByRelation != null) {
            setRestaurantName( data.claimedDonation.claimedByRelation.name);
          }
          setDonation(data.claimedDonation);
          // toast.show(data.message, { type: "success" });
          if (data.claimedDonation.status == 0) {
            setCurrentPosition(1);
          } else if (data.claimedDonation.status == 1) {
            setCurrentPosition(2);
          } else if (data.claimedDonation.status == 2) {
            setCurrentPosition(4);
          }
          setIsDonation(true);
        } else {
          // toast.show(data.message, { type: "danger" });
          var jwttoken = localStorage.getItem('authToken');
          navigate("/donationAnnouncement", { state: { token: jwttoken}});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(
    React.useCallback(() => {
    const retrieveToken = async () => {
      try {
        const value = await localStorage.getItem("authToken");
        // console.log("Token retrieved in Donation Status:"+value);
        if (value !== null) {
          // console.log("Token retrieved in Donation Status:" + value);
          // console.log("Socket URL:" + SOCKET_BASE_URL);
          await getDonationStatus(value);
          setToken(value);
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    retrieveToken();
  }, [token])
);

  useEffect(() => {
    if (token != null && donation != null) {
      socket.current = io("http://localhost:3001", {
        auth: { token: token },
      });
  
      socket.current.on(`DonationWasClaimed${donation.id}`, (data) => {
        setRestaurantName(data.claimedByRelation.name);
        setCurrentPosition(2);
        // toast.show("Your donation has been claimed!", { type: "success" });
      });
  
      socket.current.on(`DonationWasPickedUp${donation.id}`, (data) => {
        setCurrentPosition(4);
        // toast.show("NGO has picked up the Donation!", { type: "success" });
      });
  
      socket.current.on(`ReviewWasSubmitted${donation.id}`, (data) => {
        setCurrentPosition(5);
        // toast.show("Your Donation has been Assessed!", { type: "success" });
  
        setTimeout(() => {
          var jwttoken = localStorage.getItem('authToken');
          navigate("/donationAnnouncement", { state: { token: jwttoken}});
        }, 3000);
      });
  
      return () => {
        socket.current.disconnect();
      };
    }
  }, [token, donation]);
  

  return (
    <>
    
    {donation && (
      <div className="flex font-[Inter]">
      <Sidebar2/>
    <div className="bg-white w-full h-full flex flex-col gap-10 items-center justify-center mt-10 ">
      <h1 className="text-5xl font-semibold text-[#1ECF5A] mb-4">{t("donationtrackingheading")}</h1>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentPosition === i + 1 && "active"} ${
              i + 1 < currentPosition || complete ? "complete" : ""
            }`}
          >
            <div className="step">
              {i + 1 < currentPosition || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      
     <div className="flex items-center flex-wrap justify-center -mt-12"> 
  <div className="flex flex-col items-center mt-6">
    <div className="border-4 border-[#1ECF5A] p-4 rounded-lg w-3/4">
      <h2 className="text-xl font-semibold mb-2 text-[#1ECF5A]">{t("informationword")}</h2>
      <p>{getStepText()[0]}</p>
    </div>
    <div className="text-lg mt-2 text-[#1ECF5A] font-semibold">{getStepText()[2]}</div>
  </div>

  <div className="flex flex-col">
    <div className="mt-4 w-3/4 text-center"> 
      <img src={Food} alt="Image Description" className="w-full rounded-lg" />
    </div>
  </div>

  <div className="flex flex-col items-center mt-4 w-3/4"> {/* Added disclaimer container */}
    <div className="bg-green p-4 rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-2 text-white">{t("disclaimerword")}</h2>
      <p className="text-white">{getStepText()[1]}</p>
    </div>
  </div>
</div>
</div>
</div>
      )}
    </>
  );
};

export default DeliveryTracker;
