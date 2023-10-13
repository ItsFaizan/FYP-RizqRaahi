import React, { useState } from "react";
import vector from "../assets/img1-removebg-preview.png";
import vector2 from "../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg";
import location from "../assets/location2.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [proximity , serProximity] = useState("")
  const { option } = useParams();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationValue(e.target.value);
  };

  const handleProximityChange = (e) => {
    serProximity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with individual state variables (name, email, password, locationValue)
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Location:", locationValue);
    console.log("proximity:", proximity);
    // Add your form submission logic here, such as making an API call
  };
  
  return (
    <div>
      <div className="fixed top-[40px] left-[140px] w-[350px] h-[500px] bg-white rounded-lg border border-white shadow-md">
        <img
          src={vector2}
          alt="Image"
          className=" mt-[1px] top-[7px] left-[205px] w-[150px] h-[160px] mx-auto"
        />
        <h1
          className="text-center font-inter italic text-5xl font-bold leading-[10px] tracking-[0em] text-left  text-green-500"
          style={{ fontSize: "35px" }}
        >
          SIGN UP
        </h1>
        <p
          className="text-center mt-[10px] text-base"
          style={{ fontSize: "10px" }}
        >
          To the world of help
        </p>

        <div className="mt-[15px] px-[20px] ">

        <div className="">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>

        <div className="">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>

        <div className="">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>


        <div className="relative">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full h-[30px] mb-[10px] mt-3 rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
          <button className="absolute right-2 top-4 ">
            <img src={location} alt="Location Icon" className="w-[19px] h-[20px]" />
          </button>
        </div>

        {option === "NGO" && (
        <div className="">
          <input
            type="text"
            placeholder="Proximity"
            name="proximity"
            value={proximity}
            onChange={handleProximityChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>
        )}

        
        <button
          onClick={handleSubmit}
          className="w-full h-[30px] mt-[15px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none"
          style={{ fontSize: "12px" }}
        >
          SIGN UP
        </button>
        </div>
        <p
          className="text-center mt-[13px] text-base"
          style={{ fontSize: "10px" }}
        >
          Forgot Password?
        </p>
        <p
          className="text-center mt-[3px] text-base"
          style={{ fontSize: "10px" }}
        >
          Don't have an account?
          <Link
            className="text-green-500 font-bold "
            style={{ fontSize: "10px" }}
            to={`/signin/${option}`}
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="fixed top-0 w-[100%] h-[100px] mt-[100px] ml-[-180px] flex justify-end items-center">
        <div className="text-green-500 mr-8">
          <p
            className="font-inter text-8xl font-extrabold leading-[17px]  ml-[-50px] text-left text-green"
            style={{
              fontSize: "80px",
              fontWeight: 800,
              lineHeight: "157px",
              letterSpacing: "0em",
            }}
          >
            رزق راہی
          </p>
          <p
            className="text-4xl font-normal leading-[9px] ml-[-70px]"
            style={{ fontSize: "30px" }}
          >
            <span className="text-black ">From </span>People{" "}
            <span className="text-black">To </span>People
          </p>
        </div>
      </div>

      <div className="fixed bottom-[10px] right-[80px]">
        <img src={vector} className="w-[550px] h-[295px]" />
      </div>
      {/* {console.log(formData)} */}
    </div>
  );
};







