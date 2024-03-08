import React, { useState, useRef, useEffect } from 'react';
import pic from "../assets/5151557_51546-removebg-preview.png";
import ReviewModal from './ReviewModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Sidebar from './Sidebar/Sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';


export const ClaimDonation = () => {

  const { t } = useTranslation();
  const [pickupCompleted, setPickupCompleted] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [donation, setDonation] = useState(null);
  const [isDonation, setIsDonation] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); 
  const socket = useRef(null); 
 

  const handlenavigate = () => {

    navigate('/chats', { state: { option: 'NGO', token: token } });
  }



  const closeReviewModal = () => {
    setReviewModalOpen(false);
  };

  const [fixedLocation, setFixedLocation] = useState({
    latitude: 33.6844, // Islamabad latitude
    longitude: 73.0479, // Islamabad longitude
    latitudeDelta: 0.0922, // Zoom level (adjust as needed)
    longitudeDelta: 0.0421, // Zoom level (adjust as needed)
  });

  

  const handleReviewSubmission = async(donationRating, behaviorRating, feedbackText) => {

    if (token)
    {
      console.log('Donation Rating: ' + donationRating + ' Behavior Rating: ' + behaviorRating + ' Feedback: ' + feedbackText);
  
      await fetch(`/createreview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
  
        body: JSON.stringify({
          donationId: donation.id,
          donationRating: donationRating,
          interactionRating: behaviorRating,
          feedback: feedbackText,
          restaurantEmail: donation.announcedByRelation.email,
        }),
  
      })
  
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          // toast.show(`${data.message}`, { type: 'success' });
          // console.log(JSON.stringify(data));
          socket.current.emit('ReviewSubmitted', donation );
          var jwttoken = localStorage.getItem('authToken');
          navigate('/MainMap',  { state: { token: jwttoken}});
  
        } else {
          // toast.show(`${data.message}`, { type: 'danger' });
          console.log(JSON.stringify(data));
          setReviewModalOpen(true);
        }
      })
    }
  };

  const getClaimedDonation = async (value) => {

    try
    {
      if (!isDonation)
      {
        await fetch(`/getclaimeddonation`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${value}`,
          },
        })
        .then((response) => response.json())
        .then(async(data) => {
          if(data.success) {
            // toast.show(`${data.message}`, { type: 'success' });
            console.log(JSON.stringify(data));
            setDonation(data.claimedDonation);
            setFixedLocation({
              latitude: data.claimedDonation.announcedByRelation.location.latitude,
              longitude: data.claimedDonation.announcedByRelation.location.longitude,
              latitudeDelta: 0.0922, // Zoom level (adjust as needed)
              longitudeDelta: 0.0421, // Zoom level (adjust as needed)
            });
            setIsDonation(true);
          }
          else {
            console.log(data);
            // toast.show(`${data.message}`, { type: 'danger' });
            //navigate('/MainMap');
          }
        })
      }
    }
    catch (error)
    {
      console.log(error);
    }

  };


  useEffect(
    React.useCallback(() => {
      // This code will run every time the screen gains focus

      const retrieveToken = async () => {
        try {
          const value = await localStorage.getItem('authToken');
          if (value !== null) {
            await getClaimedDonation(value);
            setToken(value);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveToken();
    }, [token])
  );



  useEffect(() => {

    if (token)
    {
      socket.current = io('http://localhost:3001', {
        auth: { token: token },
      });

      return () => {
        socket.current.disconnect();
      };
    }



  }, [token]);





  const handleCompletePickup = async () => {
    if (token)
    {
      await fetch(`/completedonationpickup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
  
        body: JSON.stringify({
          donationId: donation.id,
        }),
  
      })
      .then((response) => response.json())
      .then(async(data) => {
        if(data.success) {
          // toast.show(`${data.message}`, { type: 'success' });
          setPickupCompleted(true);
          setReviewModalOpen(true);
  
          socket.current.emit('donationPickedUp', donation );
        }
        else {
          console.log(data);
          // toast.show(`${data.message}`, { type: 'danger' });
        }
      })
    }
  };
 function route (){
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${fixedLocation.latitude},${fixedLocation.longitude}`;

  window.open(googleMapsUrl, '_blank');
 }


  return (
    <>
    
    {isDonation && (
      <div className='flex'>
      <Sidebar/>
    <div className="flex flex-col items-center justify-center mt-4 mx-auto font-[Inter]">
    
      <h1 className="text-5xl font-semibold text-[#1ECF5A] mb-4">{t("donationtrackingheading")}</h1>

      <div className="flex items-center mt-8">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-[#1ECF5A] rounded-full flex items-center justify-center text-xl relative">
            <span className="text-white">&#10003;</span>
          </div>
          <div className="text-xl mt-4 font-semibold text-[#1ECF5A]">{t("trackingclaimed")}</div>
        </div>
        <div className={`w-96 h-1 ${pickupCompleted ? 'bg-[#1ECF5A]' : 'bg-[#1ECF5A]'} -mt-10 -ml-16`}></div>

        <div className="flex flex-col items-center" style={{ marginLeft: "-5.5rem" }}>
          <div className={`w-10 h-10 rounded-full ${pickupCompleted ? 'bg-[#1ECF5A]' : 'border-4 border-[#1ECF5A]'} flex items-center justify-center text-2xl relative`}>
            <span>{pickupCompleted ? <span className="text-white">&#10003;</span> : '2'}</span>
          </div>
          <div className={`text-xl mt-4 font-semibold ${pickupCompleted ? 'text-[#1ECF5A]' : 'text-[#1ECF5A]'}`}>{t("trackingheading")}</div>
        </div>
        <div className={`w-96 h-1 ${pickupCompleted ? 'bg-[#1ECF5A]' : 'bg-[#D9D9D9]'} -mt-10 `} style={{ marginLeft: "-5.5rem"}}></div>

        <div className="flex flex-col items-center -ml-16">
          <div className={`w-10 h-10 rounded-full ${pickupCompleted ? 'bg-[#1ECF5A]' : 'border-4 border-[#D9D9D9]'} flex items-center justify-center text-2xl relative`}>
            <span>{pickupCompleted ? <span className="text-white">&#10003;</span> : '3'}</span>
          </div>
          <div className={`text-xl mt-4 font-semibold ${pickupCompleted ? 'text-[#1ECF5A]' : 'text-[#D9D9D9]'}`}>{t("trackingrating")}</div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-12 -ml-96">
        <div className="border-4 border-[#1ECF5A] p-4 rounded-lg w-3/4">
          <img src={pic} className="w-full h-auto"/ > 
        </div>
        
             
              
        <div className="text-lg mt-2 text-[#1ECF5A] font-semibold group-hover:bg-indigo-50 cursor-pointer" onClick={route}>
        <FontAwesomeIcon
                icon="fa-solid fa-truck"
                size="lg"
                className="group-hover:text-indigo-800 mr-2 text-green-500"
              />
        {t("trackdonationword")}
        </div>
      </div>

      <div className="flex flex-col text-black " style={{ marginLeft: "28rem", marginTop: "-27rem" }}>
        <div className="text-black font-semibold text-2xl mx-auto">{donation?.announcedByRelation.name}</div>
        <div className="w-96 h-8 bg-[#D9D9D9] mt-2 rounded-lg flex items-center justify-center">
          <span className="text-black text-sm font-semibold">{t("donationdetailsword")}</span>
        </div>
        <div className=" font-semibold text-sm mt-4 ml-14">{t("amountword")} <span className='ml-48'>{donation?.amount}</span></div>
        <div className=" font-semibold text-sm mt-4 ml-14">{t("typeword")} <span className='ml-52'>{donation?.amountType}</span> </div>
        <div className=" font-semibold text-sm mt-4 ml-14">{t("descriptionword")} <span className='ml-44'>{donation?.description}</span></div>
        <div className="w-96 h-0.5 bg-[#D9D9D9] mt-6"></div>

        <div className="flex justify-between mt-4">
        <div className={`w-20 h-8 ${donation?.isFresh ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
            <span>{t("freshword")}</span>
          </div>
          <div className={`w-24 h-8 ${donation?.isPerishable ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
            <span>{t("cookedword")}</span>
          </div>
          <div className={`w-28 h-8 ${donation?.isCooked ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
            <span>{t("perishableword")}</span>
          </div>
        </div>

        <button
          className={`bg-[#1ECF5A] text-white font-semibold px-4 py-2 rounded-lg mt-8 ${pickupCompleted ? 'cursor-not-allowed' : ''}`}
          onClick={handleCompletePickup}
          disabled={pickupCompleted}
        >
          Complete Pickup
        </button>

        <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onSubmit={handleReviewSubmission} />

        <button className="border-2 border-[#1ECF5A] text-[#1ECF5A] font-semibold px-4 py-2 rounded-lg mt-2" onClick={handlenavigate} >Chat with Restaurant</button>
      </div>
    </div>

    </div>
      )}
    </>
  );
}
