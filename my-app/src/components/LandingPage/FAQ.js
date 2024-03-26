import React, { useState } from "react";
import plus from "../../assets/images-removebg-preview.png";
import { FaMinus } from "react-icons/fa";

export const FAQ = () => {
  // State to manage visibility of answers
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  // Function to toggle answer visibility
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  const toggleAnswer1 = () => {
    setShowAnswer1(!showAnswer1);
  };
  const toggleAnswer2 = () => {
    setShowAnswer2(!showAnswer2);
  };
  const toggleAnswer3 = () => {
    setShowAnswer3(!showAnswer3);
  };

  return (
    <div
      id="footer"
      className="text-center text-[Inter] md:ml-0 ml-4 mt-20 md:mt-40 2xl:max-w-[1440px] 2xl:mx-auto"
    >
      <h2 className="text-4xl font-bold text-[#1ECF5A] -ml-1">
        Frequently asked questions
      </h2>
      <p className="text-black mb-8 text-center text-sm mt-2 sm:w-[50%] w-full mx-auto font-medium">
        Do you have questions about how our platform works? Whether you'r a
        restaurant, an NGO we've compiled some commonly asked questions to help
        you navigate our platform effectively.
      </p>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-full md:w-7/12 justify-between">
          <p className="text-white font-medium">
          How does RizqRaahi handle crisis situations and ensure efficient food distribution?
          </p>
          {showAnswer ? (
            <FaMinus
              className="w-8 h-6 -mb-1 text-white cursor-pointer"
              onClick={toggleAnswer}
            />
          ) : (
            <img
              src={plus}
              alt="Toggle 1"
              className="w-8 -mb-2 cursor-pointer"
              onClick={toggleAnswer}
            />
          )}
        </div>
        {showAnswer && (
          <div className="bg-white p-4 text-justify text-gray-600 shadow-md rounded-xl w-full md:w-7/12">
            <p>
            RizqRaahi addresses crisis situations by issuing red alerts to restaurants, temporarily pausing regular donations and directing available resources specifically to NGOs near affected areas.
            </p>
          </div>
        )}

        <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-full md:w-7/12 justify-between">
          <p className="text-white font-medium">
         
          How does RizqRaahi predict upcoming donations to assist NGOs in managing food requirements?
          </p>
          {showAnswer1 ? (
            <FaMinus
              className="w-8 h-6 -mb-1 text-white cursor-pointer"
              onClick={toggleAnswer1}
            />
          ) : (
            <img
              src={plus}
              alt="Toggle 1"
              className="w-8 -mb-2 cursor-pointer"
              onClick={toggleAnswer1}
            />
          )}
        </div>
        {showAnswer1 && (
          <div className="bg-white p-4 text-justify text-gray-600 shadow-md rounded-xl w-full md:w-7/12">
            <p>
            RizqRaahi's prediction module analyzes restaurants' past donation data to forecast upcoming donations, enabling NGOs to plan their food requirements effectively for the upcoming week.
            </p>
          </div>
        )}

        <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-full md:w-7/12 justify-between">
          <p className="text-white font-medium">
          Can restaurants and NGOs communicate in real-time through RizqRaahi?
          </p>
          {showAnswer2 ? (
            <FaMinus
              className="w-8 h-6 -mb-1 text-white cursor-pointer"
              onClick={toggleAnswer2}
            />
          ) : (
            <img
              src={plus}
              alt="Toggle 1"
              className="w-8 -mb-2 cursor-pointer"
              onClick={toggleAnswer2}
            />
          )}
        </div>
        {showAnswer2 && (
          <div className="bg-white p-4 text-justify text-gray-600 shadow-md rounded-xl w-full md:w-7/12">
            <p>
            Yes, RizqRaahi facilitates real-time communication between restaurants and NGOs, enabling seamless coordination for food donations and pickups.
            </p>
          </div>
        )}

        <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-full md:w-7/12 justify-between">
          <p className="text-white font-medium">
          How does RizqRaahi prioritize which restaurants to recommend to NGOs for food donations?
          </p>
          {showAnswer3 ? (
            <FaMinus
              className="w-8 h-6 -mb-1 text-white cursor-pointer"
              onClick={toggleAnswer3}
            />
          ) : (
            <img
              src={plus}
              alt="Toggle 1"
              className="w-8 -mb-2 cursor-pointer"
              onClick={toggleAnswer3}
            />
          )}
        </div>
        {showAnswer3 && (
          <div className="bg-white p-4 text-justify text-gray-600 shadow-md rounded-xl w-full md:w-7/12">
            <p>
            RizqRaahi prioritizes restaurants based on their reviews, placing those with positive feedback at the top of the donation list.
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};
