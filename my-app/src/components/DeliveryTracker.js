import React, { useState } from "react";
import "../styles/stepper.css";
import { TiTick } from "react-icons/ti";
import Food from "../assets/young-volunteer-with-food-donation-boxes-concept-illustrations-food-donation-concept-with-character-can-use-web-banner-infographics-hero-images_106796-258-removebg-preview.png";

const DeliveryTracker = () => {
  const steps = [
    "Donation Creation",
    "Awaiting Claim",
    "Donation Pickup",
    "Pickup Complete",
    "Donation Feedback",
    "Donation Complete"
  ];
  const [currentPosition, setCurrentPosition] = useState(1); 
  const [restaurantName, setRestaurantName] = useState(""); 
  const [complete, setComplete] = useState(false);

  const getStepText = () => {
    var text = [];
    var firsttext;
    var secondtext =
      "Please note that throughout this\nwaiting period, you won't be able\nto make additional donation\n announcements." +
      "\n\nWe appreciate your generosity\nand regret any inconvenience\nthis may cause.";
    var ngoname = `${restaurantName}`;

    if (currentPosition === 1 || currentPosition === 2) {
      firsttext =
        "Your Donation is being shown\nto different interested NGOs.\n\nWe are waiting for an NGO\nto claim your donation.";
      ngoname = "Status";
    } else if (currentPosition === 3) {
      firsttext =
        "An NGO representative is on\nthe way to Pickup Donation.\n\nUpon arrival, provide them\nwith correct donation items.";
      ngoname = `Claimed By ${restaurantName}`;
    } else if (currentPosition === 4 || currentPosition === 5) {
      firsttext =
        "The NGO representative has\nConfirmed donation Pickup.\n\nWe are waiting for the NGO\nto assess the donation. ";
      ngoname = `Picked Up By ${restaurantName}`;
    } else if (currentPosition === 6) {
      firsttext =
        "Hooray! The donation has\nbeen successfully completed!\n\nYou can proceed to create\ndonation announcements.";
      ngoname = `Donated to ${restaurantName}`;
    }

    text = [firsttext, secondtext, ngoname];
    return text;
  };

  return (
    <div className="bg-white w-full h-full flex flex-col gap-10 items-center justify-center mt-10 ">
      <h1 className="text-5xl font-semibold text-[#1ECF5A] mb-4">Donation Tracking</h1>
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
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentPosition === steps.length
              ? setComplete(true)
              : setCurrentPosition((prev) => prev + 1);
          }}
        >
          {currentPosition === steps.length ? "Finish" : "Next"}
        </button>
      )}
      
     <div className="flex items-center flex-wrap justify-center -mt-12"> 
  <div className="flex flex-col items-center">
    <div className="border-4 border-[#1ECF5A] p-4 rounded-lg w-3/4">
      <h2 className="text-xl font-semibold mb-2 text-[#1ECF5A]">Information</h2>
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
    <div className="bg-[#1ECF5A] p-4 rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-2 text-white">Disclaimer</h2>
      <p className="text-white">{getStepText()[1]}</p>
    </div>
  </div>
</div>
</div>

  );
};

export default DeliveryTracker;
