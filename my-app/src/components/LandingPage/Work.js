import React from 'react'
import image1 from "../../assets/1820002-removebg-preview.png"
import image2 from "../../assets/1870127-removebg-preview.png"
import image3 from "../../assets/Logo-removebg-preview.png"
import image4 from "../../assets/1865269-removebg-preview.png"
import image5 from "../../assets/4882559-removebg-preview.png"
import image6 from "../../assets/07aa68865d3044de19b850a2fe4fdc99-removebg-preview.png"
import image7 from "../../assets/straightarrow.svg"
import image8 from "../../assets/aboveArrow.svg"
import image9 from "../../assets/belowArrow.svg"

export const Work = () => {
  return (
    <div className="text-center font-[Inter] hidden lg:block">
    <h2 className="text-5xl font-bold mb-16 text-[#1ECF5A] mt-16">How We Work</h2>
    <div className="flex items-center justify-center">
  <div className="flex items-center -mt-24 mx-4">
    <div>
      <img src={image1} alt="1" className='w-32 mt-32' />
      <p className='font-bold'>Restaurant</p>
    </div>
    <div>
      <img src={image7} alt="1" className='w-8 mt-32 ml-4 mr-4' />
    </div>
    <div>
      <img src={image2} alt="2" className='w-32 mt-40 ' />
      <p className='ml-0 font-bold'>Create <br/> Announcement</p>
    </div>
    <div>
      <img src={image7} alt="2arrow" className='w-8 mt-32' />
    </div>
    <div>
      <img src={image3} alt="3" className='w-48 mt-28' />
      <p className='font-bold -mt-4'>RizqRaahi</p>
    </div>
    <div>
      <img src={image8} alt="1" className='w-8' />
    </div>
    <div className="relative" style={{ marginLeft: '-2rem' }} >
      <img src={image9} alt="1" className='w-8 mt-72 ' />
    </div>
    <div className='ml-12'>
      <img src={image4} alt="3" className='w-32 -mt-32 ' />
      <p className='font-bold'>Display on maps</p>
    </div>
    <div className='-ml-28'>
      <img src={image5} alt="3" className='w-32 mt-96  ' />
      <p className='font-bold -ml-8'>Prediction of Donations</p>
    </div>
    <div>
      <img src={image9} alt="1" className='w-8  ' />
    </div>
    <div  className="relative" style={{ marginLeft: '-2rem' }}>
      <img src={image8} alt="1" className='w-8 mt-80 ' />
    </div>
    <div className='ml-12'>
      <img src={image6} alt="3" className='w-32 mt-32' />
      <p className='font-bold'>NGOs</p>
    </div>
  </div>
</div>

  </div>
  
  )
}
