import React, { useState, useRef, useEffect } from 'react'
// import Slidebar from './Sidebar'
// import { Link } from 'react-router-dom'
import vector from '../assets/Announcement.png'
import vector2 from '../assets/logo.png'
// import Sidebar from './Sidebar'
import location from "../assets/location2.png";
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


export default function Crisis() {

  
  return (
    <div>

      
        <div className="fixed bottom-[10px] left-[130px] background">
              <img src={vector} alt={"Img"} className="w-[550px] h-[405px]" />
        </div>

      
      <div className="fixed top-[170px] right-[90px] w-[410px] h-[520px] bg-white rounded-lg border border-white shadow-md">
              <img src={vector2} alt="Img" className=" mt-[-24px] top-[2px] left-[205px] w-[160px] h-[160px] mx-auto" />
              <h1 className="text-center mt-[-28px] font-inter font-semibold text-[#1ECF5A] text-4xl leading-14 tracking-tight" style={{ fontSize: '27px' }}>Crisis Alert</h1>
              <h1 className="text-center font-[Inter] text-xs leading-14 tracking-tight">Enable Real-time Donations</h1>

              <div className="mt-[10px] px-[20px] ">

                <div className="">                  
                  <input
                    type="text"
                    placeholder="Crisis Name"
                    // value={amount}
                    // onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-[30px] mb-2 rounded-md p-[10px]  bg-gray-100 focus:outline-none" style={{ fontSize: '10px' }}
                  />                  
                </div>

        <div className="relative">                  
          <input
            type="text"
            placeholder="Location"
            name="location"
            // value={locationValue ? "Location Added" : ""}
            // onChange={handleLocationChange}
            className="w-full h-[30px] mb-2 rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
            readOnly
          />
          <button className="absolute right-2 top-1 " >
            <img src={location} alt="Location Icon" className="w-[19px] h-[20px]" />
          </button>
         </div>

         <div className="">                  
                  <input
                    type="text"
                    placeholder="Estimate People Impacted"
                    // value={amount}
                    // onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-[30px] mb-2 rounded-md p-[10px]  bg-gray-100 focus:outline-none" style={{ fontSize: '10px' }}
                  />                  
                </div>

                <div className="">                  
                  <input
                    type="text"
                    placeholder="Food Lasting Duration (in Days)"
                    // value={amount}
                    // onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-[30px] mb-2 rounded-md p-[10px]  bg-gray-100 focus:outline-none" style={{ fontSize: '10px' }}
                  />                  
                </div>


                <div>
                <textarea
                  id="description"
                  placeholder="Estimated Total Food Requirement"
                //   value={description}
                //   onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-[60px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}
                ></textarea>
              </div>     
               
                <div>
                <textarea
                  id="description"
                  placeholder="Description.."
                //   value={description}
                //   onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-[80px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}
                ></textarea>
              </div>
                

   
        <button className="fixed w-[180px] h-[30px] mt-1 right-[200px] bg-[#1ECF5A] text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none" style={{ fontSize: '12px' }}>
                  Issue Crisis Alert
                  </button>
                
                  
    </div>           
    </div>    
            
      </div>

      
   
  )
}
