import React, { useState } from 'react';
import vector from '../assets/img1-removebg-preview.png';
import vector2 from '../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg';
import { Link } from 'react-router-dom';
import { useLocation , useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {requestForToken} from '../firebaseConfig';


export const AdminLogin = () => {
  
  const navigate = useNavigate();
  const locationdata = useLocation();
  const data = locationdata.state;
  
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  const handleIDChange = (e) => {
    setID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async() => {

    if (ID === '' || password === '') {
      toast.error('Please fill all the fields');
    }
    
    else {
     
        const response = await fetch(`/adminlogin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: ID,
            password: password,
          }),
        });

        const data = await response.json();

        if (data.success == true) {
          localStorage.setItem('authToken', data.token);

          toast.success(data.message);

          setTimeout(() => {
            if (data.isSuper) {
                navigate('/crisis');
        
            } else {
              navigate('/subadmincrisis');
            }
          }, 2000);
        } else {
          toast.error(data.message);
        }


      }
    }

  

  return (
    
    <div>
      <div className="absolute mx-auto my-[16%] sm:my-[8%]  sm:left-[15%] sm:h-[75%] sm:w-[408px]  md:my-[12%]  md:left-[25%] md:h-[75%] md:w-[408px]  lg:my-[8%]  lg:left-[15%] lg:h-[75%] lg:w-[408px] transform translate(-50%, -50%) w-[100%] h-[100%] bg-white rounded-lg border border-white shadow-md">
        <img src={vector2} alt="Img" className="top-[60px] left-[205px] w-[150px] h-[160px] mx-auto" />
        <h1
          className="text-center font-inter italic text-5xl font-bold leading-[10px] tracking-[0em] text-left text-green-500"
          style={{ fontSize: '35px' }}
        >
          SIGN IN
        </h1>
        <p className="text-center mt-[20px] text-base" style={{ fontSize: '10px' }}>
          To the world of help
        </p>

        <div className="mt-[70px] px-[20px]">
          <div className="">
            <input
              type="text"
              placeholder=" ID"
              value={ID}
              onChange={handleIDChange}
              className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
              style={{ fontSize: '10px' }}
            />
          </div>
          <div className="">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full h-[30px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
              style={{ fontSize: '10px' }}
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
          Want to be a Sub Admin?{' '}
          <Link className="text-green-500 font-bold" style={{ fontSize: '10px' }} to={`/adminsignup`} >
            Apply here!
          </Link>
          <br />
        </p>
      </div>

      <div className="hidden lg:block fixed top-0 w-[100%] h-[100px] mt-[100px] ml-[-180px]   md:top-[]  lg:left-[79%] flex justify-end items-center">
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

      <div className="hidden lg:block sm:right-[] md:top-[] md:right-[2%] lg:right-[8%] fixed bottom-[25px] right-[80px]">
        <img src={vector} alt="vector" className="w-[550px] h-[295px]" />
      </div>
    </div>
  );
};