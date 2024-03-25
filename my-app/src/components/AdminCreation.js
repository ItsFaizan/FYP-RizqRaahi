import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import vector from '../assets/Announcement.png'
import vector2 from '../assets/logo.png'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminSidebar from './Sidebar/AdminSidebar';


export default function AdminCreation() {
  const locationdata = useLocation();
  const navigate = useNavigate();
  const data = locationdata.state;

  const [isSuperAdminSelected, setIsSuperAdminSelected] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // use states for Eye symbol in the password and confirm fields
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const token = data.token;
  var id;
  const socket = useRef(null);

  const handleSuperAdminClick = () => {
    setIsSuperAdminSelected(true);
  };

  const handleSubAdminClick = () => {
    setIsSuperAdminSelected(false);
  };

  const handlePasswordVisibility = (field) => {
    // Implement logic to toggle password visibility
  };

  const handleFinalizeAdmin = async () => {
    try {
      if (userId === '' || password === '' || confirmPassword === '') {
        toast.error('Please fill all the fields', {
          autoClose: 3000,
          theme: 'dark',
        });
      } else if (password !== confirmPassword) {
        toast.error('Passwords do not match', {
          autoClose: 3000,
          theme: 'dark',
        });
      } else {
        // Continue with your admin finalization logic
        // ...

        toast.success('Admin finalized successfully', {
          autoClose: 3000,
          theme: 'dark',
        });

        // Redirect or perform additional actions as needed
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred', {
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };



 
  return (
    <div className='flex font-[Inter]'>
      <AdminSidebar/>
      <div className="fixed bottom-[15px] left-64 background">
        <img src={vector} alt={"Img"} className="w-[580px] h-[420px]" />
      </div>
  
      <div className="fixed top-[150px] right-[90px] w-[410px] h-[520px] bg-white rounded-lg border border-white shadow-md">
        <img src={vector2} alt="Img" className=" mt-[-20px] top-[2px] left-[205px] w-[160px] h-[160px] mx-auto" />
        <h1 className="text-center mt-[-28px] font-inter font-semibold text-green-500 text-4xl leading-14 tracking-tight" style={{ fontSize: '30px' }}>Admin Creation</h1>
        <h1 className="text-center mt-[-10px] font-inter font-semibold text-black-500 text-4xl leading-14 tracking-tight" style={{ fontSize: '16px' }}>Create Rizq Rahi Collaborators</h1>
  
        <div className="mt-[40px] px-[20px]">
          <div className="">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-1">
            <div
              className={`w-80 h-8 flex items-center justify-center rounded-l-md cursor-pointer text-xs ${
                isSuperAdminSelected ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={handleSuperAdminClick}
            >
              Super Admin
            </div>
            <div
              className={`w-80 h-8 flex items-center justify-center rounded-r-md cursor-pointer text-xs ${
                !isSuperAdminSelected ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={handleSubAdminClick}
            >
              Sub Admin
            </div>
          </div>

          <div className="relative mt-[10px]">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
                />
                <span
                    className="absolute top-[10px] right-[10px] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ top: '40%', transform: 'translateY(-50%)' }}
                >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
                </div>
         
          <div className="relative">
            <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            />
            <span
                className="absolute top-[10px] right-[10px] cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ top: '40%', transform: 'translateY(-50%)' }}
            >
                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </span>
            </div>

          
        </div>


     
  
        <div className="relative">
          <button
            onClick={handleFinalizeAdmin}
            className="fixed w-[180px] h-[30px] mt-[50px] right-[200px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none"
          >
            Finalize Admin
          </button>
        </div>
      </div>
    </div>
  );
  


}
