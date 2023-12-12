import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import vector2 from '../assets/map-pin-location-icon-in-flat-style-vector.jpg';
import { Route, useNavigate } from 'react-router-dom';

export const CrisisManagment = () => { 

    const Navigate = useNavigate();
    const [crisis, setCrisis] = useState();
    const [isInfo, setIsInfo] = useState(false);
  
    const getCurrentCrisis = async () => {
      const value = await localStorage.getItem("authToken");
  
      const response = await fetch(`/getcurrentcrisisalert`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      });
  
      const data = await response.json();
  
      if (data.success === true) {
        setIsInfo(false);
        setCrisis(data.crisisAlert);
      } else {
        setIsInfo(true);
        toast.show(`${data.message}`, {
          type: "danger",
        });
      }
    };
  
    useEffect(
      React.useCallback(() => {
        getCurrentCrisis();
      }, [])
    );
  
    const handleResolveCrisis = async(crisisId) =>
    {
  
      const value = await localStorage.getItem("authToken");
  
      const response = await fetch(`/resolvecrisisalert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
        body: JSON.stringify({ crisisId }),
      });
  
      const data = await response.json();
  
      if (data.success === true) {
        toast.success(data.message);
  
        setCrisis(() => {
          return crisis.filter((crisisAlert) => crisisAlert.id !== crisisId);
        });
  
        if (!crisis || crisis.length == 0) {
          setIsInfo(true);
        }
        
      } else {
        toast.error(data.message);;
      }
      
    }

    const calculateProgressBarColor = (percentage) => {
        if (percentage >= 75) {
          return "bg-green-500"; // Green
        } else if (percentage >= 50) {
          return "bg-yellow-500"; // Yellow
        } else {
          return "bg-red-500"; // Red
        }
      };


      function route (crisis){
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${crisis.location.latitude},${crisis.location.longitude}`;
      
        window.open(googleMapsUrl, '_blank');
       }


  return (
    <>
    {crisis ? (
      crisis.map((crisis) => (
        <div key={crisis.id} className="bg-white p-4 w-1/3 mb-4 mt-12 mx-auto l items-center rounded-md shadow-md">
          <div className="flex items-center mb-4">
            <div className="flex-1">
              <p className="text-xl font-semibold mb-2">{crisis.name}</p>
              <p className="text-gray-700 mb-4">{crisis.description}</p>
            </div>
            <img src={vector2} className="w-1/3 h-1/3 ml-4 cursor-pointer" onClick={() => route(crisis)} alt="Crisis Vector" />
            
          </div>
  
          <div className="bg-gray-200 h-8 rounded-full mb-2">
            <div
              style={{
                width: ((crisis.gatheredDonations / crisis.requiredDonations) * 100) < 8
                  ? '8%'
                  : (crisis.gatheredDonations / crisis.requiredDonations) * 100 + "%",
              }}
              className={`h-full rounded-full ${calculateProgressBarColor((crisis.gatheredDonations / crisis.requiredDonations) * 100)}`}
            >
              <p className="text-white text-sm p-2">{Math.round((crisis.gatheredDonations / crisis.requiredDonations) * 100)}%</p>
            </div>
          </div>
  
          <button
            onClick={() => handleResolveCrisis(crisis.id)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-40 mt-4"
          >
            Resolve Crisis
          </button>
        </div>
      ))
    ) : null}
  
    {isInfo ? (
      <div className="bg-green-100 p-4 mb-4 rounded-md shadow-md">
        <p className="text-green-700">No Unresolved Crisis Situation</p>
      </div>
    ) : null}
  </>
  
  
  );
};



