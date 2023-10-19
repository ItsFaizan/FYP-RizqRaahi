import React from 'react'
import plus from "../../assets/images-removebg-preview.png"
export const FAQ = () => {
  return (
<div className="text-center text-[Inter] mt-40">
  <h2 className="text-4xl font-bold  text-[#1ECF5A] -ml-1">Frequently asked questions</h2>
  <p className="text-gray-600 mb-8 text-left ml-96 text-sm">Do you have questions about how our platform works?  Whether you're<br/> a restaurant, an NGO we've compiled some commonly asked questions <br/>  <span className='ml-20'>to help you navigate our platform effectively.</span></p>
  <div className="flex flex-col items-center space-y-4">
    <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-7/12 justify-between">
    <p className='text-white'>How are crisis situations managed on the platform?</p>
      <img src={plus} alt=" 1" className="w-8" />
      
    </div>
    <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-7/12 justify-between">
    <p className='text-white'>How are NGOs and restaurants verified on the platform?</p>
      <img src={plus} alt=" 2" className="w-8" />
       
    </div>
    <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-7/12 justify-between">
    <p className='text-white'> How do NGOs find nearby donations?</p>
      <img src={plus} alt=" 3" className="w-8" />
      
    </div>
    <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-7/12 justify-between">
    <p className='text-white'>How are resources optimized during a crisis?</p>
      <img src={plus} alt=" 4" className="w-8" />
      
    </div>
    <div className="bg-[#1ECF5A] p-4 flex items-center space-x-2 rounded-xl w-7/12 justify-between">
    <p className='text-white'>Can I track the food donation history of a restaurant?</p>
      <img src={plus} alt=" 4" className="w-8" />
      
    </div>
  </div>

  <p className='mt-40'>Copyright ©2023 RizqRaahi.</p>
</div>




  )
}
