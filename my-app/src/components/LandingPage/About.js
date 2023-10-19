import React from 'react'
import image1 from "../../assets/2913091-removebg-preview.png"
import image2 from "../../assets/1465898-removebg-preview.png"
import image3 from "../../assets/2654594-removebg-preview.png"
import image4 from "../../assets/5526457-removebg-preview.png"
import image5 from "../../assets/pngtree-cross-platform-accessibility-concept-icon-app-notion-mobile-vector-png-image_12551317-removebg-preview.png"
export const About = () => {
  return (
    <div className="text-center font-[Inter]">
  <h2 className="text-5xl font-bold mb-16 text-[#1ECF5A] mt-16">What We Provide</h2>

  <div className="flex  space-x-8">
  
    <div className="w-1/3 bg-white p-4">
      <img src={image1} alt="1" className='w-32 ml-28  '/>
      <h3 className="text-xl font-bold mt-4 -ml-3">Real time donation </h3>
      <p className="mt-2 text-gray-600 text-left ml-20 leading-tight">Restaurants can create <br/>announcements of food donation <br/>which will be visible to NGOs in<br/> real time.</p>
    </div>

    
    <div className="w-1/3 bg-white p-4">
      <img src={image2} alt="2" className='w-32 ml-28' />
      <h3 className="text-xl font-bold mt-4 -ml-1">Prediction of Donations</h3>
      <p className="mt-2 text-gray-600 text-left ml-16 leading-tight">We forecast future donations from <br/>restaurants, helping NGOs plan<br/> and manage their food <br/>requirements effectively.</p>
    </div>

    
    <div className="w-1/3 bg-white p-4">
      <img src={image3} alt="3" className='w-32 ml-28' />
      <h3 className="text-xl font-bold mt-4 -ml-2">Resource Optimization in Crisis</h3>
      <p className="mt-2 text-gray-600 text-left ml-7 leading-tight">NGOs will be allocated resources according to the capacity and needs. <br/>Also, resources will be allocated to only those NGOs which are near the crisis area</p>
    </div>
  </div>

  <div className="flex justify-center items-center space-x-8 mt-8">
    
    <div className="w-1/3 bg-white p-4">
      <img src={image4} alt="4" className='w-32 ml-28'/>
      <h3 className="text-xl font-bold mt-4 -ml-2">Recommendation of Restaurants </h3>
      <p className="mt-2 text-gray-600 text-left ml-7 leading-tight">Our app recommends the best restaurants based on the quality and quantity of food<br/> they provide by analyzing the reviews <br/>submitted by NGOs.</p>
    </div>

   
    <div className="w-1/3 bg-white p-4">
      <img src={image5} alt="5"className='w-44 ml-28 mt-1 mb-1' />
      <h3 className="text-xl font-bold  -ml-2">Multi-Platform Application</h3>
      <p className="mt-2 text-gray-600 text-left ml-14 leading-tight">Our dual approach, encompassing <br/>Android and web applications, ensures a <br/>seamless user experience across <br/>different platforms.</p>
    </div>
  </div>
</div>

  )
}
