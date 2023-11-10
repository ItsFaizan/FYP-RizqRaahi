import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import map from "../assets/map.png";
import ReviewModal from './ReviewModal';

export const ClaimDonation = () => {
  const [pickupCompleted, setPickupCompleted] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const handleCompletePickup = () => {
    setPickupCompleted(true);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 font-[Inter]">
      <h1 className="text-5xl font-semibold text-[#1ECF5A] mb-4">Donation Tracking</h1>

      <div className="flex items-center mt-8">
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
        <div className={`w-96 h-1 ${pickupCompleted ? 'bg-[#1ECF5A]' : 'bg-[#D9D9D9]'} -mt-10 `} style={{ marginLeft: "-5.5rem"}}></div>

        <div className="flex flex-col items-center -ml-16">
          <div className={`w-10 h-10 rounded-full ${pickupCompleted ? 'bg-[#1ECF5A]' : 'border-4 border-[#D9D9D9]'} flex items-center justify-center text-2xl relative`}>
            <span>{pickupCompleted ? <span className="text-white">&#10003;</span> : '3'}</span>
          </div>
          <div className={`text-xl mt-4 font-semibold ${pickupCompleted ? 'text-[#1ECF5A]' : 'text-[#D9D9D9]'}`}>Pickup Complete</div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-12 -ml-96">
        <div className="border-4 border-[#1ECF5A] p-4 rounded-lg w-3/4">
          <img src={map} alt="Map" className="w-full h-auto" />
        </div>
        <div className="text-lg mt-2 text-[#1ECF5A] font-semibold">View Map</div>
      </div>

      <div className="flex flex-col text-black" style={{ marginLeft: "44rem", marginTop: "-27rem" }}>
        <div className="text-black font-semibold text-2xl mx-auto">Ranchers</div>
        <div className="w-96 h-8 bg-[#D9D9D9] mt-2 rounded-lg flex items-center justify-center">
          <span className="text-black text-sm font-semibold">Donation Details</span>
        </div>
        <div className=" font-semibold text-sm mt-4 ml-14">Amount <span className='ml-48'>50</span></div>
        <div className=" font-semibold text-sm mt-4 ml-14">Type <span className='ml-52'>Units</span> </div>
        <div className=" font-semibold text-sm mt-4 ml-14">Description <span className='ml-32'>Beans and rice</span></div>
        <div className="w-96 h-0.5 bg-[#D9D9D9] mt-6"></div>

        <div className="flex justify-between mt-4">
          <div className="w-20 h-8 bg-[#e82929] text-white rounded-lg flex items-center justify-center">
            <span>Fresh</span>
          </div>
          <div className="w-24 h-8 bg-[#1ECF5A] text-white rounded-lg flex items-center justify-center">
            <span>Perishable</span>
          </div>
          <div className="w-20 h-8 bg-[#1ECF5A] text-white rounded-lg flex items-center justify-center">
            <span>Cooked</span>
          </div>
        </div>

        <button
          className={`bg-[#1ECF5A] text-white font-semibold px-4 py-2 rounded-lg mt-8 ${pickupCompleted ? 'cursor-not-allowed' : ''}`}
          onClick={handleCompletePickup}
          disabled={pickupCompleted}
        >
          Complete Pickup
        </button>

        <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} />

        <button className="border-2 border-[#1ECF5A] text-[#1ECF5A] font-semibold px-4 py-2 rounded-lg mt-2">Chat with Restaurant</button>
      </div>
    </div>
  );
};
