import React from 'react'
import Donation from "../../assets/21683580_Tiny people standing near box of donation food for delivery.jpg"
export const Overview = () => {
  const scrollToAbout = () => {
    // Scroll to the position of the "About" component
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
};
  return (
    <div id="home" className="flex flex-col md:flex-row items-center font-[Inter] lg:mt-80 mt-32 2xl:max-w-[1440px] 2xl:mx-auto ">
    <div className="flex flex-col mx-10 md:mx-20 md:w-1/2  ">
      <div className="w-16 h-1 bg-[#1ECF5A] ml-1 mb-5"></div>
      <h1 className="text-4xl md:text-5xl font-bold mb-2">Be the Reason <br />Someone Smiles Today!</h1>
      <p className="text-gray-600 mb-4">Introducing RizqRaahi, we bridge the gap between those<br /> with surplus food and those in dire need. Our mission is to<br /> connect Non-Governmental Organizations (NGOs) with<br /> restaurants, enabling the donation of excess, untouched<br /> food to the less fortunate.</p>
      <button onClick={scrollToAbout} className='flex items-center justify-center rounded-full w-40 px-2 py-2 text-1xl bg-[#1ECF5A] text-white my-7 hover:text-[#1ECF5A] hover:bg-white hover:border-[#1ECF5A] hover:border-2 transition duration-500' > Explore More →</button>
    </div>

    <img
      src={Donation}
      alt="Your"
      className="w-full md:w-1/2 h-auto md:-mt-16 max-w-xl mx-auto"
    />
  </div>
  )
}