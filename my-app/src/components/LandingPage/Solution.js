import React from 'react'
import arrow from "../../assets/arrow.svg"
import green from "../../assets/greencircle.svg"
import blue from "../../assets/bluecircle.svg"
import orange from "../../assets/orangecircle.svg"
import purple from "../../assets/purplecircle.svg"
export const Solution = () => {
  return (
    <div id="overview" className="flex items-center font-[Inter] -mt-40 ">
   
    <div className="w-1/2 ml-20">
    <div className="w-16 h-1 bg-[#1ECF5A] ml-1 mb-5"></div>
      <h2 className="text-3xl font-bold mt-4 ">The ultimate hunger crisis<br/> solution for you</h2>
      <p className="mt-4 text-gray-600 text-md leading-tight">While we are committed to alleviating hunger in Pakistan,<br /> we believe our application can be a model for other <br/>countries to reduce food problems and enhance crisis <br/>management. Governments can utilize FoodConnect to<br/>  optimize resources and reduce disaster-related costs.</p>
      <p className='text-[#1ECF5A] mt-4 font-medium'>Join the RizqRaahi community </p>
      <img src={arrow} alt='1' className='ml-60 -mt-5'/>
      
    </div>
  
   
    <div className="w-1/2">
      <div className="grid grid-cols-2 gap-4 mt-80">
       
        <div className="bg-white p-4 ">
          <img src={green} alt='1'/>
          <h3 className="text-lg font-bold mt-2 mb-3">Feeding the Hungry</h3>
          <div className="w-16 h-1 bg-[#1ECF5A] ml-0 mb-2"></div>
          <p class=" ml-0 leading-tight text-gray-600">We connect restaurants with NGOs, ensuring that surplus food reaches those who need it the most, one meal at a time.</p>
        </div>
  
        <div className="bg-white p-4 ">
          <img src={blue} alt='1'/>
          <h3 className="text-lg font-bold mt-2 mb-3">Cutting Food Waste</h3>
          <div className="w-16 h-1 bg-[#1ECF5A] ml-0 mb-2"></div>
          <p class=" ml-0 leading-tight text-gray-600">By diverting restaurant leftovers from landfills to the plates of the needy, we help reduce food wastage and its environmental impact.</p>
        </div>

        <div className="bg-white p-4 ">
          <img src={purple} alt='1'/>
          <h3 className="text-lg font-bold mt-2 mb-3">Predictive Donations</h3>
          <div className="w-16 h-1 bg-[#1ECF5A] ml-0 mb-2"></div>
          <p class=" ml-0 leading-tight text-gray-600">We forecast future donations <br/>from restaurants, helping NGOs<br/> plan and manage their food requirements effectively.</p>
        </div>

        <div className="bg-white p-4 ">
          <img src={orange} alt='1'/>
          <h3 className="text-lg font-bold mt-2 mb-3">Smart Recommendations</h3>
          <div className="w-16 h-1 bg-[#1ECF5A] ml-0 mb-2"></div>
          <p class=" ml-0 leading-tight text-gray-600">Our app recommends the best restaurants based on the quality and quantity of food they provide.</p>
        </div>
      
      </div>
    </div>
  </div>
  
  )
}
