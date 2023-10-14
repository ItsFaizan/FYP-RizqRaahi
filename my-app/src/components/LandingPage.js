import React, { useState } from "react";
import vector2 from "../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const Navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

const handleButtonClick = (option) => {
  // Set the selected option when the button is clicked
  setSelectedOption(option);
  // Navigate to the Signup component and pass the selected option as a prop
  console.log("Landing page sending: "+ option);
  Navigate(`/signin`, { state: {option: option }});
};


  return (
    <div>
      <div className="fixed top-[40px] left-[190px] w-[350px] h-[500px] bg-white rounded-lg border border-white shadow-md">
        <img
          src={vector2}
          alt="Img"
          className=" mt-[1px] top-[7px] left-[205px] w-[150px] h-[160px] mx-auto"
        />
        <h1
          className="text-center font-inter italic text-5xl font-bold leading-[10px] tracking-[0em] text-left  text-green-500"
          style={{ fontSize: "35px" }}
        >
          Getting Started
        </h1>
        <p
          className="text-center mt-[20px] text-base"
          style={{ fontSize: "10px" }}
        >
          To the world of help
        </p>

        <div className="mt-[15px] px-[20px] ">
          <button
            className={`w-full h-[30px] mt-[150px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none ${
              selectedOption === "Restaurant" ? "bg-green-600" : ""
            }`}
            style={{ fontSize: "12px" }}
            onClick={() => handleButtonClick("Restaurant")}
          >
            Restaurant
          </button>

          <button
            className={`w-full h-[30px] mt-[15px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none ${
              selectedOption === "NGO" ? "bg-green-600" : ""
            }`}
            style={{ fontSize: "12px" }}
            onClick={() => handleButtonClick("NGO")}
          >
            NGO
          </button>
        </div>
      </div>
    </div>
  );
};
