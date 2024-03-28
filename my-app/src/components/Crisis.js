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
  const Navigate = useNavigate();
  const locationdata = useLocation();
  const data = locationdata.state;
  const option = "Admin";



  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [impactedPeople, setImpactedPeople] = useState("");
  const [durationamount, setDurationamount] = useState("");
  const [locationValue, setLocationValue] = useState(data?.coordinates);
  

  const handleLocationChange = (e) => {
    setLocationValue(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImpactChange = (e) => {
    setImpactedPeople(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDurationamount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleCrisisCreation = async () => {

    if (name == "" || description == "" || impactedPeople == "" || durationamount == "") {
      toast.error('Please fill all the fields', {
        autoClose: 3000,
       theme: 'dark',
      });
     
    } else if (locationValue === '') {
      toast.error('Please select a location', {
        autoClose: 3000,
       theme: 'dark',
      });
      
    } else if (isNaN(impactedPeople) || parseInt(impactedPeople) != parseFloat(impactedPeople)) {
      toast.error('Estimate People Impacted must be an integer', {
        autoClose: 3000,
       theme: 'dark',
      });
     
    } else if (isNaN(durationamount) || parseInt(durationamount) != parseFloat(durationamount)) {
      toast.error('Duration Amount must be an integer', {
        autoClose: 3000,
       theme: 'dark',
      });
      
    } 
    else 
    {

      var token = await localStorage.getItem("authToken");

      const requestBody = {
        name: name,
        impactedPeople: parseInt(impactedPeople),
        requiredDonations: parseInt(parseFloat(impactedPeople) * parseFloat(durationamount) * 0.5),
        description: description,
        latitude: locationValue.latitude,
        longitude: locationValue.longitude,
      };


      fetch(`/createcrisisalert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          if (data.success == true) {
            toast.success(data.message);

           
          } else {
            toast.error(data.message);
          }
        });
    }
  };
  
  return (
    <div className='font-[Inter]'>
      
      
        <div className="fixed bottom-[10px] left-72 background">
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
                    name="Crisis Name"
                   value={name}
                   onChange={handleNameChange}
                    className="w-full h-[30px] mb-2 rounded-md p-[10px]  bg-gray-100 focus:outline-none" style={{ fontSize: '10px' }}
                  />                  
                </div>

        <div className="relative">                  
          <input
             type="text"
             placeholder="Location"
             name="location"
             value={locationValue ? "Location Added" : ""}
             onChange={handleLocationChange}
            className="w-full h-[30px] mb-2 rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
            readOnly
          />
          <button className="absolute right-2 top-1 " onClick={() => Navigate(`/location-selection`, {state: {option: option, screenName: "crisis"}})}>
            <img src={location} alt="Location Icon" className="w-[19px] h-[20px]" />
          </button>
         </div>

         <div className="">                  
                  <input
                    type="text"
                    placeholder="Estimate People Impacted"
                    name="Estimate People Impacted"
                    value={impactedPeople}
                    onChange={handleImpactChange}
                    className="w-full h-[30px] mb-2 rounded-md p-[10px]  bg-gray-100 focus:outline-none" style={{ fontSize: '10px' }}
                  />                  
                </div>

                <div className="">                  
                  <input
                    type="text"
                    placeholder="Food Lasting Duration (in Days)"
                    name="Food Lasting Duration (in Days)"
                    value={durationamount}
                    onChange={handleDurationChange}
                    className="w-full h-[30px] mb-2 rounded-md p-[10px]  bg-gray-100 focus:outline-none" style={{ fontSize: '10px' }}
                  />                  
                </div>


                <div>
                <p
                  className="w-full h-[60px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}
                >
                  {isNaN(parseFloat(impactedPeople)) || isNaN(parseFloat(durationamount))
            ? 
            'Note: Enter number of impacted people and expected duration to generate a KG estimate of food for the crisis.'
            : 
            `Estimated Total Food Requirement = ${parseFloat(
                impactedPeople
              ) * parseFloat(durationamount) * 0.5} Kg`}
                </p>
                {"\n\n"}
                {isNaN(parseFloat(impactedPeople)) || isNaN(parseFloat(durationamount))
          ?
          ""
          : (
            <div>
              Note: This is just an estimation. You may adjust duration and impacted people to get a better estimate.
            </div>
          )}
              </div>     
               
                <div>
                <textarea
                  id="description"
                  placeholder="Description.."
                  name="Description.."
                  value={description}
                  onChange={handleDescriptionChange}
                  className="w-full h-[80px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}
                ></textarea>
              </div>
   
        <button className="fixed w-[180px] h-[30px] mt-1 right-[200px] bg-[#1ECF5A] text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none" style={{ fontSize: '12px' }}
        onClick={handleCrisisCreation}
        >
                  Issue Crisis Alert
                  </button>
                
                  
    </div>           
    </div>    
            
      </div>

      
   
  )
}
