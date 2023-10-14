import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const Sidebar = () => {
  const [isExtended, setIsExtended] = useState(false);
  // const [activeMenu, setActiveMenu] = useState(null);

  // const toggleSidebar = () => {
  //   setIsExtended(!isExtended);
  // };

  const handleMouseEnter = () => {
    setIsExtended(true);
  };

  const handleMouseLeave = () => {
    setIsExtended(false);
  };

  return (
    <nav
       className={`${
        isExtended
          ? 'w-64 transition-width duration-300 ease-in-out'
          : 'w-16 transition-width duration-300 ease-in-out'
      } h-screen bg-green-500 text-white fixed top-0 left-0 z-10`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between p-4">
        {isExtended ? (
          <div className="flex items-center">
            <div className="mr-2">
              {/* <FontAwesomeIcon icon="random" size="lg" /> */}
            </div>
            <div className="font-semibold">رزق راہی</div>
          </div>
        ) : (
          <div className="mr-2">
            <FontAwesomeIcon icon="random" size="lg" />
          </div>
        )}
      </div>
      <ul>
        {/* Your sidebar items go here */}
      </ul>

      {/* Team Members Section */}
      {isExtended && (
        <div className="p-4">
          <h3 className="mb-2 text-xl font-semibold">Please don't help it</h3>
          <ul>


            {/* Team members list goes here */}

            siuu
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
