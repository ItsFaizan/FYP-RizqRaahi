import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import vector2 from '../../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg';
import './mainmap.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import vector from '../../assets/admin3.png'

library.add(fas);

const Sidebar3 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const locationdata = useLocation();
  const data = locationdata.state;
  const option = data.option;

  const handleToggleSidebar = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);

  };

  const handleNavigateTo = (path) => {
    // navigate('/chats', { state: { option: option, token: data.token } });
    navigate(path, { state: { option: option, token: data.token } });
  };

  return (
    <div>
    <aside className="h-screen">
      <nav
        className={`${
          isExpanded
            ? 'w-64 transition-width duration-300 ease-in-out'
            : 'w-16 transition-width duration-300 ease-in-out'
        } h-full flex flex-col bg-white border-r shadow-2xl relative`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          {isExpanded && (
            <img
              src={vector}
              className={`overflow-hidden transition-all ${
                isExpanded ? 'w-32' : 'w-0'
              }`}
              alt=""
            />
          )}
          <button
            onClick={handleToggleSidebar}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>

        <ul className="flex-1 px-3">
          <li
            className="relative flex items-center py-2 px-3 my-4 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
            onClick={() => handleNavigateTo('/donationAnnouncement')}
          >
            <span className="group-hover:bg-indigo-50 flex items-center w-full">
              <FontAwesomeIcon
                icon="home"
                size="lg"
                className="group-hover:text-indigo-800 mr-2 text-green-500"
              />
              <span
                className={`transition-all group-hover:bg-indigo-50 mr-2 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                Home
              </span>
            </span>
          </li>

          <li
          
          onClick={() => handleNavigateTo('/chats')}
            className="relative flex items-center py-2 px-3 my-4 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
            
          >
            <span  className="group-hover:bg-indigo-50 flex items-center w-full">
              <FontAwesomeIcon
                icon="comment"
                size="lg"
                className="group-hover:text-indigo-800 mr-2 text-green-500"
              />
              <span
                className={`transition-all group-hover:bg-indigo-50 mr-2 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                Chat
              </span>
            </span>
          </li>

          <li
            className="relative flex items-center py-2 px-3 my-4 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
            onClick={() => handleNavigateTo('/settings')}
          >
            <span  className="group-hover:bg-indigo-50 flex items-center w-full">
              <FontAwesomeIcon
                icon="cogs"
                size="lg"
                className="group-hover:text-indigo-800 mr-2 text-green-500"
              />
              <span
                className={`transition-all group-hover:bg-indigo-50 mr-2 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                Settings
              </span>
            </span>
          </li>

          <li
            className="relative flex items-center py-2 px-3 my-4 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
            onClick={() => handleNavigateTo('/')}
          >
            <span  className="group-hover:bg-indigo-50 flex items-center w-full">
              <FontAwesomeIcon
                icon="power-off"
                size="lg"
                className="group-hover:text-indigo-800 mr-2 text-green-500"
              />
              <span
                className={`transition-all group-hover:bg-indigo-50 mr-2 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                Sign Out
              </span>
            </span>
          </li>

          {/* Add more manual entries for other buttons as needed */}
        </ul>

        {isExpanded && (
          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div className="flex justify-between items-center overflow-hidden transition-all w-52 ml-3">
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-black-600">johndoe@gmail.comss</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>
        )}
      </nav>
    </aside>
    </div>
  );
};

export default Sidebar3;
