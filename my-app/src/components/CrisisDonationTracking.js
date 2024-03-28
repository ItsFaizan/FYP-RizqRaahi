import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pic from "../assets/5151557_51546-removebg-preview.png";
import Sidebar from './Sidebar/Sidebar';

 export const CrisisDonationTracking = () => { 

    const [crisisDonation, setCrisisDonation] = useState();
    const [isInfo, setIsInfo] = useState(false);
    const navigate = useNavigate();

    const getCrisisDonations = async () => {
      const value = await localStorage.getItem("authToken");
  
      const response = await fetch(`/getcrisisdonation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${value}`,
        },
      });
  
      const data = await response.json();
  
      if (data.success === true) {
        setIsInfo(false);
        setCrisisDonation(data.assignedDonation);
      } else {
        setIsInfo(true);
        toast.update({
          render: `${data.message}`,
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: true,
      })
      }
    };
  
    useEffect(
      React.useCallback(() => {
        getCrisisDonations();
      }, [])
    );
  

  const handleCompleteCrisisDonation = async(donationId) =>
  {

    const value = await localStorage.getItem("authToken");

    const response = await fetch(`/completecrisisdonation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
      body: JSON.stringify({ donationId }),
    });

    const data = await response.json();
    if (data.success === true) {
    toast.success('Donation Claimed Successfully', {
      autoClose: 3000,
      theme: 'dark',
    });


      setCrisisDonation((donationId) => {
        return crisisDonation.filter((donation) => donation.id !== donationId);
      });

      if (crisisDonation.length === 0) {
        setIsInfo(true);
        console.log("zero")
      }
      
      
    } else {
        toast.update({
            render: `${data.message}`,
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: true,
        })
    }
    
  }

  // console.log(crisisDonation);
  // console.log(crisisDonation.length);

  function route (restaurant){
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.location.latitude},${restaurant.location.longitude}`;
  
    window.open(googleMapsUrl, '_blank');
   }

    
  return (
    <div className="flex">
      <Sidebar/>
      {crisisDonation && crisisDonation.length > 0 ? (
        <div  >
         
          <div className="items-center justify-center mt-10 font-[Inter]  ml-96">
            <h1 className="text-center text-5xl font-semibold text-[#1ECF5A] mb-4">Crisis Tracking</h1>
          </div>
  
          {crisisDonation.map((donation) => (
            <div className="ml-96 flex flex-col items-center mt-10 font-[Inter] font-semibold" key={donation.id}>
              <div>
                <p>
                  Donation allocation from {donation.announcedByRelation.name} for {donation.crisisRelation.name} Crisis
                </p>
                <p>Below are the details of the assigned donation:</p>
              </div>
  
              <div className="flex flex-col items-center mt-12 -ml-96">
                <div className="border-4 border-[#1ECF5A] p-4 rounded-lg w-3/4">
                  <img src={pic} className="w-full h-auto" alt="Donation" onClick={() => route(donation.announcedByRelation)} />
                </div>
              </div>
  
              <div className="flex flex-col text-black mb-28 " style={{ marginLeft: "28rem", marginTop: "-24rem" }}>
  <div className="text-black font-semibold text-2xl mx-auto">{donation?.announcedByRelation.name}</div>
  <div className="w-96 h-8 bg-[#D9D9D9] mt-2 rounded-lg flex items-center justify-center">
    <span className="text-black text-sm font-semibold">Donation Details</span>
  </div>
  <div className="font-semibold text-md mt-4 mx-auto">Amount: <span className='ml-auto font-normal'>{donation?.amount}</span></div>
  <div className="font-semibold text-sm mt-4 mx-auto">Type: <span className='ml-auto font-normal'>{donation?.amountType}</span></div>
  <div className="font-semibold text-sm mt-4 mx-auto" style={{ maxWidth: "300px" }}>
    Description: <span className='ml-auto overflow-hidden overflow-ellipsis whitespace-nowrap font-normal'>{donation?.description}</span>
  </div>


  <div className="w-96 h-0.5 bg-[#D9D9D9] mt-6"></div>

  <div className="flex justify-between mt-4">
  <div className={`w-20 h-8 ${donation?.isFresh ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
      <span>Fresh</span>
    </div>
    <div className={`w-24 h-8 ${donation?.isPerishable ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
      <span>Perishable</span>
    </div>
    <div className={`w-20 h-8 ${donation?.isCooked ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
      <span>Cooked</span>
    </div>
  </div>
  <button
          className={`bg-[#1ECF5A] text-white font-semibold px-4 py-2 rounded-lg mt-8`}
          onClick={() => handleCompleteCrisisDonation(donation.id)}
        >
          Complete Pickup
        </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>{isInfo ? 
          
          <div className="bg-green p-4 mb-4 rounded-md shadow-md mx-[500px] my-72 ">
          <p className="text-white font-medium text-4xl">No Pending Crisis Allocations</p>
         </div>
         
      
        : null}</div>
      )}
    </div>
  );
      }