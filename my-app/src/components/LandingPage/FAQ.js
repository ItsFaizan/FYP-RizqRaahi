import React, { useState } from 'react';
import plus from "../../assets/images-removebg-preview.png";
import cross from "../../assets/straightarrow.svg"


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
    <div id="footer" className="text-center text-[Inter] md:ml-0 ml-4 mt-20 md:mt-40 2xl:max-w-[1440px] 2xl:mx-auto">
    <h2 className="text-4xl font-bold text-[#1ECF5A] -ml-1">Frequently asked questions</h2>
    <p className="text-gray-600 mb-8 text-center text-sm mt-2 sm:w-[50%] w-full mx-auto">Do you have questions about how our platform works? Whether you'r a restaurant, an NGO we've compiled some commonly asked questions to help you navigate our platform effectively.</p>
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-full md:w-7/12 justify-between">
        <p className='text-white'>How are crisis situations managed on the platform?</p>
        {showAnswer ? (
          <img src={cross} alt="Toggle 1" className="w-8 cursor-pointer" onClick={toggleAnswer} />
        ) : (
          <img src={plus} alt="Toggle 1" className="w-8 cursor-pointer" onClick={toggleAnswer} />
        )}
      </div>
      {showAnswer && (
        <div className="bg-white p-4 text-justify text-black shadow-md rounded-xl w-full md:w-7/12">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      )}
      {/* Repeat the same pattern for other questions */}
    </div>
  </div>
  );
};
