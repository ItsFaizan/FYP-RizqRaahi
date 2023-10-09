import React from "react";
import vector from "../assets/img1-removebg-preview.png";
import vector2 from "../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const Navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the desired route when the button is clicked
    Navigate("/signin");
  };

  return (
    <div>
      <div className="fixed top-[40px] left-[190px] w-[350px] h-[500px] bg-white rounded-lg border border-white shadow-md">
        <img
          src={vector2}
          alt="Image"
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
            className="w-full h-[30px] mt-[150px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none"
            style={{ fontSize: "12px" }}
            onClick={handleButtonClick}
          >
            Restaurant
          </button>

          <button
            className="w-full h-[30px] mt-[15px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none"
            style={{ fontSize: "12px" }}
            onClick={handleButtonClick}
          >
            NGO
          </button>
        </div>
      </div>
    </div>
  );
};

// border border-gray-300
