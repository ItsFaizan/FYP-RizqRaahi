import React from 'react'
import Donation from "../../assets/21683580_Tiny people standing near box of donation food for delivery.jpg"
export const Overview = () => {
  return (
    <div className="flex items-center font-[Inter] mt-56">
    <div className="flex flex-col ml-20">
    <div className="w-16 h-1 bg-[#1ECF5A] ml-1 mb-5"></div>
      <h1 className="text-4xl font-bold mb-2">Be the Reason <br/>Someone Smiles Today!</h1>
      <p className="text-gray-600 mb-4 ">Introducing RizqRaahi, we bridge the gap between those<br/> with surplus food and those in dire need. Our mission is to<br/> connect Non-Governmental Organizations (NGOs) with<br/> restaurants, enabling the donation of excess, untouched<br/> food to the less fortunate.</p>
      <button className='flex items-center justify-center rounded-full w-40 px-2 py-2 text-1xl bg-[#1ECF5A] text-white my-7 hover:text-[#1ECF5A] hover:bg-white hover:border-[#1ECF5A] hover:border-2 transition duration-500' > Explore More →</button>
    </div>
    
    <img
      src={Donation}
      alt="Your"
      className="w-1/2 h-auto ml-20 -mt-16 "
    />
    
  </div>
  )
}