import React, { useState } from 'react';
import vector from '../assets/img1-removebg-preview.png';
import vector2 from '../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg';
import { Link } from 'react-router-dom';
import { useLocation , useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {requestForToken} from '../firebaseConfig';

export const SignIn = () => {
  
  const navigate = useNavigate();
  const locationdata = useLocation();
  const data = locationdata.state;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const option  = data.option;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async() => {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email === '' || password === '') {
      
      toast.error('Please fill all the fields', {
        autoClose: 3000,
        theme: 'dark',
      });
    }
    else if (!emailRegex.test(email)) {
      
      toast.error('Please Enter a Valid Email Address', {
        autoClose: 3000,
       theme: 'dark',
      });
    }
    else
    {

        let uniqueemail = email.toLowerCase();

        var expoPushToken = await requestForToken();

        if (expoPushToken == null) {
          toast.error('Please Allow Notfication Access', {
            autoClose: 3000,
            theme: 'dark',
          });
        }

        const id = toast.loading(`Attempting to Login as ${option}`,{
          theme: 'dark',
        })

        await fetch(`/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
  
          body: JSON.stringify({
            email: uniqueemail,
            password: password,
            type: option,
            expoPushToken: expoPushToken,
            deviceType: 'Web',
          }),
        })
  
          .then((response) => response.json())
          .then(async(data) => {
            if (data.success === true) {
  
              localStorage.setItem('authToken', data.token);
  
              toast.update(id, {
                render: `${data.message}`,
                type: toast.TYPE.SUCCESS,
                isLoading: false,
                autoClose: true,
            })
  
              setTimeout(() => {
                if (option === 'Restaurant') {
                  navigate('/donationAnnouncement', { state: { option: option , token: data.token}});
                }
                else if (option === 'NGO') {
                  navigate('/MainMap', { state: { option: option , token: data.token}});
                }
              }, 2000);
            } else {
              toast.update(id, {
                render: `${data.message}`,
                type: toast.TYPE.ERROR,
                isLoading: false,
                autoClose: true,
            })
            }
          })
        } 
        

  };

  return (
    console.log("Sign in got option: "+option),
    <div>
      <div className="fixed top-[90px] left-[140px] w-[321px] h-[430px] bg-white rounded-lg border border-white shadow-md">
        <img src={vector2} alt="Img" className="top-[60px] left-[205px] w-[150px] h-[160px] mx-auto" />
        <h1
          className="text-center font-inter italic text-5xl font-bold leading-[10px] tracking-[0em] text-left text-green-500"
          style={{ fontSize: '35px' }}
        >
          SIGN IN
        </h1>
        <p className="text-center mt-[13px] text-base" style={{ fontSize: '10px' }}>
          To the world of help
        </p>

        <div className="mt-[20px] px-[20px]">
          <div className="">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
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
          Already have an account?{' '}
          <Link className="text-green-500 font-bold" style={{ fontSize: '10px' }} to={`/signup`} state={{option}}>
            Sign up
          </Link>
          <br />
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
        <img src={vector} alt="vector" className="w-[550px] h-[295px]" />
      </div>
    </div>
  );
};
