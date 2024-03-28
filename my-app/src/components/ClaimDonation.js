import React, { useState, useRef, useEffect } from 'react';
import pic from "../assets/5151557_51546-removebg-preview.png";
import ReviewModal from './ReviewModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Sidebar from './Sidebar/Sidebar';
import {toast} from 'react-toastify';
import vector from '../assets/Kid.jpeg';

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
  const [isInfo, setIsInfo] = useState(false);
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
          const id = toast.success(`Donation Received Successfully`,{
            theme: 'dark',
          })
          socket.current.emit('ReviewSubmitted', donation );
          setIsInfo(true);
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

      <div className="flex items-center mt-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-[#1ECF5A] rounded-full flex items-center justify-center text-xl relative">
            <span className="text-white">&#10003;</span>
          </div>
          <div className="text-xl mt-4 font-semibold text-[#1ECF5A]">Donation Claimed</div>
        </div>
        <div className={`w-96 h-1 ${pickupCompleted ? 'bg-[#1ECF5A]' : 'bg-[#1ECF5A]'} -mt-10 -ml-16`}></div>

        <div className="flex flex-col items-center" style={{ marginLeft: "-5.5rem" }}>
          <div className={`w-10 h-10 rounded-full ${pickupCompleted ? 'bg-[#1ECF5A]' : 'border-4 border-[#1ECF5A]'} flex items-center justify-center text-2xl relative`}>
            <span>{pickupCompleted ? <span className="text-white">&#10003;</span> : '2'}</span>
          </div>
          <div className={`text-xl mt-4 font-semibold ${pickupCompleted ? 'text-[#1ECF5A]' : 'text-[#1ECF5A]'}`}>Heading to Restaurant</div>
        </div>
        <div className={`w-96 h-1 ${isInfo ? 'bg-[#1ECF5A]' : 'bg-[#D9D9D9]'} -mt-10 `} style={{ marginLeft: "-5.5rem"}}></div>

        <div className="flex flex-col items-center -ml-14">
          <div className={`w-10 h-10 rounded-full ${isInfo ? 'bg-[#1ECF5A]' : 'border-4 border-[#D9D9D9]'} flex items-center justify-center text-2xl relative`}>
            <span>{isInfo ? <span className="text-white">&#10003;</span> : '3'}</span>
          </div>
          <div className={`text-xl mt-4 font-semibold ${isInfo ? 'text-[#1ECF5A]' : 'text-[#D9D9D9]'}`}>Donation Rating</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto my-8">
      {/* <div className="flex flex-col"> */}
  <div className="text-lg text-[#1ECF5A] font-semibold mb-4">
    <FontAwesomeIcon
      icon="fa-solid fa-truck"
      size="lg"
      className="text-green mr-2"
    />
    {t("trackdonationword")}
  </div>
  <div className="text-black font-semibold text-xl mb-4">
    {donation?.announcedByRelation.name}
  </div>
  
  <div className="border-b-2 border-[#D9D9D9] mb-6"></div>
  <img src={vector} alt="Image" className="w-64 h-64 rounded-lg mx-auto" />
  <div className="space-y-4">
  <div class="flex flex-col mt-4 ">
    <div class="font-semibold text-sm">Amount:</div>
    <div class="bg-gray-200 p-2 rounded">{donation?.amount}</div>
</div>

<div class="flex flex-col mt-4 ">
    <div class="font-semibold text-sm">Type:</div>
    <div class="bg-gray-200 p-2 rounded">{donation?.amountType}</div>
</div>

<div class="flex flex-col mt-4 ">
    <div class="font-semibold text-sm">Description:</div>
    <div class="bg-gray-200 p-2 rounded">{donation?.description}</div>
</div>

    <div className="flex justify-between">
      <div className="font-semibold text-sm">Fresh:</div>
      <div className={`w-20 h-8 ${donation?.isFresh ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
        <span>{donation?.isFresh ? 'Yes' : 'No'}</span>
      </div>
    </div>
    <div className="flex justify-between">
      <div className="font-semibold text-sm">Perishable:</div>
      <div className={`w-20 h-8 ${donation?.isPerishable ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
        <span>{donation?.isPerishable ? 'Yes' : 'No'}</span>
      </div>
    </div>
    <div className="flex justify-between">
      <div className="font-semibold text-sm">Cooked:</div>
      <div className={`w-20 h-8 ${donation?.isCooked ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
        <span>{donation?.isCooked ? 'Yes' : 'No'}</span>
      </div>
    </div>
  </div>
  <div className="border-t-2 border-[#D9D9D9] mt-6"></div>
  <div className="flex justify-between mt-4">
    <button
      className={`bg-[#1ECF5A] text-white font-semibold px-4 py-2 rounded-lg ${pickupCompleted ? 'cursor-not-allowed' : ''}`}
      onClick={handleCompletePickup}
      disabled={pickupCompleted}
    >
      Complete Pickup
    </button>
    <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onSubmit={handleReviewSubmission} />
    

    <button className="border-2 border-[#1ECF5A] text-[#1ECF5A] font-semibold px-4 py-2 rounded-lg" onClick={handlenavigate}>Chat with Restaurant</button>
  </div>
  </div>
 

        </div>
      </div>
    // </div>
  )}
  {!isDonation && (
    <div className="flex">
      <Sidebar />
      <div className="bg-green p-4 mb-4 rounded-md shadow-md mx-auto my-72">
        <p className="text-white font-medium text-4xl">No Donations Available. Comeback Later!</p>
      </div>
    </div>
)}
    </>
  );
}
