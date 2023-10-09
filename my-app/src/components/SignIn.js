import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import vector from '../assets/img1-removebg-preview.png';
import vector2 from '../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg';

export const SignIn = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
    console.log(formData); // Example: Log form data to the console
    // Add your form submission logic here, such as making an API call
  };

  return (
    <div>
      <div className="fixed top-[90px] left-[140px] w-[321px] h-[430px] bg-white rounded-lg border border-white shadow-md">
        <img src={vector2} alt="Image" className="top-[60px] left-[205px] w-[150px] h-[160px] mx-auto" />
        <h1 className="text-center font-inter italic text-5xl font-bold leading-[10px] tracking-[0em] text-left text-green-500" style={{ fontSize: '35px' }}>
          SIGN IN
        </h1>
        <p className="text-center mt-[13px] text-base" style={{ fontSize: '10px' }}>
          To the world of help
        </p>

        <div className="mt-[20px] px-[20px]">
          <div className="">
            <input
              type="text"
              placeholder="Name or Email"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleInputChange}
              className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
              style={{ fontSize: '10px' }}
              required
            />
          </div>
          <div className="">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full h-[30px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
              style={{ fontSize: '10px' }}
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full h-[30px] mt-[15px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none"
            style={{ fontSize: '12px' }}
          >
            SIGN IN
          </button>
        </div>
        <p className="text-center mt-[13px] text-base" style={{ fontSize: '10px' }}>
          Forgot Password?
        </p>
        <p className="text-center mt-[3px] text-base" style={{ fontSize: '10px' }}>
          Already have an account?{' '}
          <Link className="text-green-500 font-bold" style={{ fontSize: '10px' }} to="/signup">
            Sign up
          </Link>
          <br />
          <Link className="text-green-500 font-bold" style={{ fontSize: '10px' }} to="/announcement">
            Go to announcements
          </Link>
        </p>
      </div>

      <div className="fixed top-0 w-[100%] h-[100px] mt-[100px] ml-[-180px] flex justify-end items-center">
        <div className="text-green-500 mr-8">
          <p
            className="font-inter text-8xl font-extrabold leading-[17px] ml-[-50px] text-left text-green"
            style={{
              fontSize: '80px',
              fontWeight: 800,
              lineHeight: '157px',
              letterSpacing: '0em',
            }}
          >
            رزق راہی
          </p>
          <p className="text-4xl font-normal leading-[7px] ml-[-70px]" style={{ fontSize: '30px' }}>
            <span className="text-black">From </span>People <span className="text-black">To </span>People
          </p>
        </div>
      </div>

      <div className="fixed bottom-[25px] right-[80px]">
        <img src={vector} className="w-[550px] h-[295px]" alt="Vector" />
      </div>
      {console.log(formData)}
    </div>
  );
};
