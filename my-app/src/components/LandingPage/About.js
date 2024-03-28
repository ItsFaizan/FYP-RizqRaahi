import React from 'react';
import image1 from "../../assets/2913091-removebg-preview.png";
import image2 from "../../assets/1465898-removebg-preview.png";
import image3 from "../../assets/2654594-removebg-preview.png";
import image4 from "../../assets/5526457-removebg-preview.png";
import image5 from "../../assets/pngtree-cross-platform-accessibility-concept-icon-app-notion-mobile-vector-png-image_12551317-removebg-preview.png";

export const About = () => {
  return (
    <div id="about" className="text-center font-[Inter]">
      <h2 className="text-5xl font-bold mb-16 text-[#1ECF5A] mt-16">What We Provide</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 2xl:max-w-[1440px] 2xl:mx-auto">
        
        <div className="bg-white p-4">
          <img src={image1} alt="1" className="w-32 mx-auto mb-4" />
          <h3 className="text-xl font-bold mt-4">Real time donation</h3>
          <p className="mt-2 text-gray-600 leading-tight">Restaurants can create announcements of food donation which will be visible to NGOs in real time.</p>
        </div>

        <div className="bg-white p-4">
          <img src={image2} alt="2" className="w-32 mx-auto mb-4" />
          <h3 className="text-xl font-bold mt-4">Prediction of Donations</h3>
          <p className="mt-2 text-gray-600 leading-tight">We forecast future donations from restaurants, helping NGOs plan and manage their food requirements effectively.</p>
        </div>

        <div className="bg-white p-4">
          <img src={image3} alt="3" className="w-32 mx-auto mb-4" />
          <h3 className="text-xl font-bold mt-4">Resource Optimization in Crisis</h3>
          <p className="mt-2 text-gray-600 leading-tight">NGOs will be allocated resources according to the capacity and needs. Also, resources will be allocated to only those NGOs which are near the crisis area.</p>
        </div>

        <div className="sm:flex justify-center sm:col-span-3 col-span-1">
          <div className="bg-white p-4">
            <img src={image4} alt="4" className="w-32 mx-auto mb-4" />
            <h3 className="text-xl font-bold mt-4">Recommendation of Restaurants</h3>
            <p className="mt-2 text-gray-600 leading-tight">Our app recommends the best restaurants<br/> based on the quality and quantity of food they provide by<br/> analyzing the reviews submitted by NGOs.</p>
          </div>
          <div className="bg-white p-4">
            <img src={image5} alt="5" className="w-44 mx-auto mb-4" />
            <h3 className="text-xl font-bold mt-4">Multi-Platform Application</h3>
            <p className="mt-2 text-gray-600 leading-tight">Our dual approach, encompassing<br/> Android and web applications, ensures a seamless<br/> user experience across different platforms.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
