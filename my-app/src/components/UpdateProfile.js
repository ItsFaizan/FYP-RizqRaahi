import React, { useState, useEffect } from 'react';
import { FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Sidebar2 from './Sidebar/Sidebar2';
import ngoIcon from '../assets/ngodrawericon.png';
import donorIcon from '../assets/resdrawericon.png';
import map1 from '../assets/map1.jpeg';
import map2 from '../assets/map2.png';
import LocationSelection from './LocationSelection';
import { MdLocationOn } from 'react-icons/md';
import {  useLocation, useNavigate } from 'react-router-dom';
import Sidebar  from './Sidebar/Sidebar';

export const UpdateProfile = () => {
  const navigate = useNavigate();
  const [baseinfo, setBaseInfo] = useState({ name: '', email: '' });
  // const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [proximity, setProximity] = useState('');
  const [capacity, setCapacity] = useState('');
  const [donations, setDonations] = useState(0);
  const [rating, setRating] = useState(0);
  const [foodDonated, setFoodDonated] = useState('');
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState('Donor');
  const [token, setToken] = useState(null);
  // const [locationValue, setLocationValue] = useState({ latitude: 0, longitude: 0 });
  // const [locationValue, setLocationValue] = useState(null);


 
  const locationdata = useLocation();
  const data1 = locationdata.state;
  const option = data1.option;
  const coordinates = data1.coordinates;

  const [locationValue, setLocationValue] = useState(coordinates);


  console.log("here is the coordinate data: ", locationValue )

  useEffect(() => {
    fetchUserDetails();
    console.log("here is the coordinate data: ", locationValue )
  }, [locationValue]);

  const fetchUserDetails = async () => {
    try {
      const value = await localStorage.getItem("authToken");
      const response = await fetch(`/getuserProfileDetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setData([
          { category: 'Donations', value: data.totalDonationsMade },
          { category: 'Rating', value: data.avgRating ? data.avgRating.toFixed(2) : 'N/A' },
          {
            category: 'Amount of Food Donated',
            value: `${data.totalDonationsMadeAmountKG} KG & ${data.totalDonationsMadeAmountUnits} Units`,
          },
        ]);
        setBaseInfo({ name: data.data.name, email: data.data.email });
        setUserType(data.type);

        if (data.type === 'NGO') {
          setProximity(data.data.ngoPreferences.proximity.toString());
          setCapacity(data.data.ngoPreferences.capacity.toString());
        } else {
          setDonations(data.totalDonationsMade);
          setRating(data.avgRating ? data.avgRating.toFixed(2) : 0);
          setFoodDonated(`${data.totalDonationsMadeAmountKG} KG & ${data.totalDonationsMadeAmountUnits} Units`);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const value = await localStorage.getItem('authToken');
  
      let body = {
        name: baseinfo.name,
        latitude: coordinates && coordinates.latitude !== undefined ? coordinates.latitude : 0,
        longitude: coordinates && coordinates.longitude !== undefined ? coordinates.longitude : 0,
      };
      

      if (userType === 'NGO') {
        body.proximity = parseInt(proximity);
        body.capacity = parseInt(capacity);
      } else {
        body.donations = parseInt(donations);
        body.rating = parseFloat(rating);
        const foodDonatedArray = foodDonated.split(' ');
        body.foodDonatedKG = parseInt(foodDonatedArray[0]);
        body.foodDonatedUnits = parseInt(foodDonatedArray[3]);
      }

      const response = await fetch(`/updateProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value}`,
        },
        body: JSON.stringify(body),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
      navigate('/profile')
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while saving changes.');
    }

    
  };

  const handleLocationChange = (e) => {
    setLocationValue(e.target.value);
    console.log("here is the coordinate data: ", locationValue )
  };

 

  const handleLocationSelection = (e) => {
    navigate(`/location-selection`, { state: { option: option, screenName: "UpdateProfile" } });
    setLocationValue(e.target.value);
  };
  

  const renderStatItem = (item, index) => (
    <div className="bg-green-500 rounded-md p-4 m-2 flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 transform hover:scale-105 bg-gray-200 hover:shadow-2xl" key={index}>
      <div className="text-center text-white">{item.value}</div>
      <div className="text-center text-white">{item.category}</div>
    </div>
  );
  
 

 

  return (
    <div className="flex">
       {userType === 'NGO' ? (
                <>
      <Sidebar />
      </>
              ) : ( 
                <>
      <Sidebar2 />
                 </>
              )}
      <div className="container mx-auto flex flex-col items-center mt-2">
        <div className="profileContainer mt-8 bg-green-500 rounded-lg shadow-lg p-20 mb-10 w-full lg:w-3/4 xl:w-2/3 ">
         
          <div className="bg-white rounded-lg shadow-lg p-8 mb-10 ">
            <img className="profilePhoto rounded-full w-24 h-24 mb-4 mx-auto transform hover:rotate-3 hover:perspective-1000 hover:scale-105 transition duration-300" src={userType === 'NGO' ? ngoIcon : donorIcon} alt="Profile" />
           
            <div className="flex items-center justify-center mt-4">
          <input 
            className="nameText font-bold text-center border-2 rounded-md p-1 mx-auto"
            value={baseinfo.name}
            onChange={(e) => setBaseInfo({ ...baseinfo, name: e.target.value })}
          />
           </div>
           <div className="text-sm mt-2 text-gray-500 flex s flex items-center justify-center mt-4">
            <FiMail size={20} color="#1ECF5A" />
            <span className="ml-2">{baseinfo.email}</span>
          </div>
          <hr className="border-t border-gray-300 my-4" />
            
            {userType === 'NGO' ? (
              <>
                <div className="flex flex-col">
                  <label htmlFor="proximity" className="text-lg font-semibold mb-2">Proximity (in kilometers)</label>
                  <input 
                    id="proximity"
                    type="number"
                    className="bg-gray-100 p-2 rounded-md"
                    value={proximity}
                    onChange={(e) => setProximity(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="capacity" className="text-lg font-semibold mb-2">Capacity</label>
                  <input 
                    id="capacity"
                    type="number"
                    className="bg-gray-100 p-2 rounded-md"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div className='mb-8'>
                {/* <div className="flex flex-col">
                  <label htmlFor="donations" className="text-lg font-semibold mb-2">Donations</label>
                  <input 
                    id="donations"
                    type="number"
                    className="bg-gray-100 p-2 rounded-md"
                    value={donations}
                    onChange={(e) => setDonations(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="rating" className="text-lg font-semibold mb-2">Rating</label>
                  <input 
                    id="rating"
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    className="bg-gray-100 p-2 rounded-md"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="foodDonated" className="text-lg font-semibold mb-2">Food Donated</label>
                  <input 
                    id="foodDonated"
                    type="text"
                    className="bg-gray-100 p-2 rounded-md"
                    value={foodDonated}
                    onChange={(e) => setFoodDonated(e.target.value)}
                  />
                </div> */}
                {data.map((item, index) => renderStatItem(item, index))} 
              </div>
            )}
        
         
        <hr className="border-t border-gray-300 my-4" />
          <div   type="text"
            placeholder={('slocationtext')}
            name="location"
            value={locationValue ? ('locationaddedtext') : ""} onChange={handleLocationChange} 
            
            className="bg-white-500 rounded-md pt-8 p-3 m-2 flex flex-col justify-center items-center cursor-pointer hover:scale-95 bg-gray-200 hover:shadow-2xl"
            style={{
              backgroundImage: `url(${map2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          //  onClick={() => Navigate(`/location-selection`, {state: {option: option, screenName: "UpdateProfile"}})}
          
          onClick={handleLocationSelection}
          >
            <MdLocationOn size={50} color="red" />
            <div className="text-center text-red-500 font-bold text-1xl">Navigate To Change Location</div>           
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <button 
            className="buttonres block w-40 bg-green-500 rounded-md text-white py-3 mt-8 mx-auto text-center hover:bg-green-900 hover:shadow-2x1"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>


          </div>

        </div>
      </div>
      {/* <LocationSelection handleConfirmLocation={handleConfirmLocation} /> */}
    </div>
  );
};

export default UpdateProfile;
