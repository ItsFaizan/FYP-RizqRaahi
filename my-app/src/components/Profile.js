import React, { useState, useEffect } from 'react';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md'; // Importing Material Icons location icon
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar2 from './Sidebar/Sidebar2';
import ngoIcon from '../assets/ngodrawericon.png';
import donorIcon from '../assets/resdrawericon.png';

export const Profile = () => {
  const [baseinfo, setBaseInfo] = useState({ name: '', email: '' });
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState('Donor');
  const [proximity, setProximity] = useState('');
  const [capacity, setCapacity] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState(null);


  useEffect(
    React.useCallback(() => {
    const retrieveToken = async () => {
      try {
        const value = await localStorage.getItem("authToken");
        // console.log("Token retrieved in Donation Status:"+value);
        if (value !== null) {
          // console.log("Token retrieved in Donation Status:" + value);
          // console.log("Socket URL:" + SOCKET_BASE_URL);
       
          setToken(value);
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    retrieveToken();
  }, [token])
);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/getuserProfileDetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const userData = await response.json();

      if (userData.success) {
        toast.success(userData.message);

        const statData = [
          { category: 'Donations', value: userData.totalDonationsMade },
          { category: 'Rating', value: userData.avgRating ? userData.avgRating.toFixed(2) : 'N/A' },
          {
            category: 'Amount of Food Donated',
            value: `${userData.totalDonationsMadeAmountKG} KG & ${userData.totalDonationsMadeAmountUnits} Units`,
          },
        ];

        setData(statData);
        setBaseInfo({ name: userData.data.name, email: userData.data.email });
        setUserType(userData.type);

        if (userData.type === 'NGO') {
          setProximity(userData.data.ngoPreferences.proximity.toString());
          setCapacity(userData.data.ngoPreferences.capacity.toString());
        }
      } else {
        toast.error(userData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderStatItem = (item, index) => (
    <div className="bg-green-500 rounded-md p-4 m-2 flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 transform hover:scale-105 bg-gray-200 hover:shadow-2xl" key={index}>
      <div className="text-center">{item.value}</div>
      <div className="text-center">{item.category}</div>
    </div>
  );

  const handleUpdateProfile = () => {
    navigate('/update-profile', { state: { option: "Restaurant", token } });
  };

  return (
    <div className="flex">
      <Sidebar2 />
      <div className="container mx-auto flex flex-col items-center mt-8">
        
        <div className="bg-green-500 rounded-lg shadow-lg p-20 mb-10 w-full lg:w-3/4 xl:w-2/3 ">
          
       

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10   ">
        <img className="rounded-full w-24 h-24 mb-4 mx-auto hover:scale-105 bg-gray-200 hover:shadow-2xl" src={userType === 'NGO' ? ngoIcon : donorIcon} alt="Profile" />
          <h2 className="font-bold text-xl text-center">{baseinfo.name}</h2>
          <div className="flex items-center justify-center mt-4">
            <FiMail size={20} color="#1ECF5A" />
            <p className="ml-2">{baseinfo.email}</p>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex justify-center p-8">
            <div className="flex flex-wrap justify-center">
             
              {userType === 'NGO' ? (
                <>
                  <div className="bg-green-500 rounded-md p-4 m-2 flex flex-col justify-center items-center cursor-pointer  hover:bg-gray-200 hover:shadow-2xl">
                    <div className="text-center">{proximity}</div>
                    <div className="text-center">Proximity</div>
                  </div>
                  <div className="bg-green-500 rounded-md p-4 m-2 flex flex-col justify-center items-center cursor-pointer hover:scale-105 bg-gray-200 hover:shadow-2xl">
                    <div className="text-center">{capacity}</div>
                    <div className="text-center">Capacity</div>
                  </div>
                  <div className="bg-green-500 rounded-md p-4 m-2 flex flex-col justify-center items-center cursor-pointer hover:scale-105 bg-gray-200 hover:shadow-2xl">
                    <MdLocationOn size={30} color="#fff" /> {/* Location icon */}
                    <div className="text-center">Location</div>
                  </div>
                </>
              ) : (
                <>
                 {data.map((item, index) => renderStatItem(item, index))} 
                 <div className="bg-green-500 rounded-md p-4 m-2 flex flex-col justify-center items-center cursor-pointer hover:scale-105 bg-gray-200 hover:shadow-2xl">
                    <MdLocationOn size={30} color="#fff" /> {/* Location icon */}
                    <div className="text-center">Location</div>
                  </div>
                 </>
              )}
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          {/* <Link to="/update-profile" className="block w-40 bg-green-500 rounded-md text-white py-3 mt-8 mx-auto text-center hover:bg-green-900 hover:shadow-2xl">
          Update Profile
        </Link> */}
       
                <button
              onClick={handleUpdateProfile}
              className="block w-40 bg-green-500 rounded-md text-white py-3 mt-8 mx-auto text-center hover:bg-green-900 hover:shadow-2xl"
            >
              Update Profile
            </button>
        </div>
        
      </div>
      </div>
    </div>
  );
};

export default Profile;
