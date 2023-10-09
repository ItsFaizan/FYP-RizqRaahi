import React, { useState } from 'react'
import Slidebar from './Sidebar'
import { Link } from 'react-router-dom'
import vector from '../assets/Announcement.png'
import vector2 from '../assets/logo.png'
import Sidebar from './Sidebar'


export default function Home() {

  const [isFresh, setIsFresh] = useState(false);
  const [isCooked, setIsCooked] = useState(false);
  const [isPerishable, setIsPerishable] = useState(false);
  

  const handleFreshToggle = () => {
    setIsFresh(!isFresh);
  };

  const handleCookedToggle = () => {
    setIsCooked(!isCooked);
  };

  const handlePerishableToggle = () => {
    setIsPerishable(!isPerishable);
  };


  window.addEventListener('load', (event) => {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    
    toggleButtons.forEach(toggleButton => {
        toggleButton.addEventListener('click', () => {
            const handle = toggleButton.querySelector('div');
            const id = toggleButton.getAttribute('data-id');
            const toggleStateText = document.getElementById(`toggleState${id}`);
            let isToggled = handle.classList.contains('translate-x-full');
            
            isToggled = !isToggled;
            const newState = isToggled ? 'Fresh' : 'Unfresh';
            const newState2 = isToggled ? 'Cooked' : 'Uncooked';
            const newState3 = isToggled ? 'Perishable' : 'Unperishable';
            
            handle.classList.toggle('translate-x-full', isToggled);
            toggleStateText.innerText = (id === '1') ? newState : (id === '2') ? newState2 : newState3;
            
            // Toggle color class
            toggleButton.classList.toggle('bg-green-500', isToggled);
            toggleButton.classList.toggle('bg-gray-300', !isToggled);
        });
    });
});


const [isKgSelected, setIsKgSelected] = useState(true);

const handleKgClick = () => {
  setIsKgSelected(true);
};

const handleUnitsClick = () => {
  setIsKgSelected(false);
};





  
  return (
    <div>

      
        <div className="fixed bottom-[10px] left-[130px] background">
              <img src={vector} className="w-[550px] h-[405px]" />
        </div>

      
      <div className="fixed top-[40px] right-[90px] w-[410px] h-[520px] bg-white rounded-lg border border-white shadow-md">
              <img src={vector2} alt="Image" className=" mt-[-20px] top-[2px] left-[205px] w-[160px] h-[160px] mx-auto" />
              <h1 className="text-center mt-[-28px] font-inter font-semibold text-green-500 text-4xl leading-14 tracking-tight" style={{ fontSize: '27px' }}>Food Donation</h1>
              <h1 className="text-center mt-[-16px] font-inter font-semibold text-green-500 text-4xl leading-14 tracking-tight" style={{ fontSize: '27px' }}>Announcements</h1>

              <div className="mt-[10px] px-[20px] ">

                <div className="">                  
                  <input
                    type="text"
                    placeholder="Amount"
                    className="w-full h-[30px] mb-[10px] rounded-md p-[10px]  bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}
                  />                  
                </div>
                            
               
  
  
                <div className="flex space-x-1">
        <div
          className={`w-80 h-8 flex items-center justify-center rounded-l-md cursor-pointer text-xs ${
            isKgSelected ? 'bg-green-500' : 'bg-gray-300'
          }`}
          onClick={handleKgClick}
        >
          KG
        </div>
        <div
          className={`w-80 h-8 flex items-center justify-center rounded-r-md cursor-pointer text-xs ${
            !isKgSelected ? 'bg-green-500' : 'bg-gray-300'
          }`}
          onClick={handleUnitsClick}
        >
          Units
        </div>
      </div>






                <div className="paragraph-input">

                <textarea
                  id="description"
                  placeholder="Description.."
                  className="w-full h-[80px] mb-[10px] mt-2 rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
                

              <div className="relative">



</div>

<div className='relative'>

<div className="relative">
        {/* Fresh Toggle Button */}
        <div className="flex items-center space-x-4">
          <span className="fixed top-[400px] right-[230px] text-sm font-semibold mx-[90px]">
            {isFresh ? 'Fresh' : 'Unfresh'}
          </span>
          <button
            className={`fixed top-[395px] right-[200px] w-16 h-8 rounded-full focus:outline-none ${
              isFresh ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={handleFreshToggle}
            >
            <div
              className={`inner absolute left-1 top-1 w-7 h-6 rounded-full bg-white shadow transition duration-300 ${
                isFresh ? 'translate-x-full' : ''
              }`}
            />            
          </button>
        </div>

        {/* Cooked Toggle Button */}
        <div className="flex items-center space-x-4">
          <span className="fixed top-[435px] right-[320px] text-sm font-semibold">
            {isCooked ? 'Cooked' : 'Uncooked'}
          </span>
          <button
            className={`fixed top-[430px] right-[200px] w-16 h-8 rounded-full focus:outline-none ${
              isCooked ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={handleCookedToggle}
          >
            <div
              className={`inner absolute left-1 top-1 w-7 h-6 rounded-full bg-white shadow transition duration-300 ${
                isCooked ? 'translate-x-full' : ''
              }`}
            />
          </button>
        </div>

        {/* Perishable Toggle Button */}
        <div className="flex items-center space-x-4">
          <span className="fixed top-[474px] right-[240px] text-sm font-semibold mx-[80px]">
            {isPerishable ? 'Perishable' : 'Unperishable'}
          </span>
          <button
            className={`fixed top-[466px] right-[200px] w-16 h-8 rounded-full focus:outline-none ${
              isPerishable ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={handlePerishableToggle}
          >
            <div
              className={`inner absolute left-1 top-1 w-7 h-6 rounded-full bg-white shadow transition duration-300 ${
                isPerishable ? 'translate-x-full' : ''
              }`}
            />
          </button>
        </div>
      </div>


{console.log("so here are " , isPerishable , isCooked , isFresh )}


                
        <button className="fixed w-[180px] h-[30px] mt-[110px] right-[200px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none" style={{ fontSize: '12px' }}>
                  Create Announcement
                  </button>
                
                  
    </div>           
    </div>    
            
      </div>

      
    </div>
  )
}
