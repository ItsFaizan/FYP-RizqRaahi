import React from 'react'
import { useState, useEffect } from 'react';
import { motion, useAnimation  } from 'framer-motion';

export default function LandingPageHome ()  {
    const [isUrdu, setIsUrdu] = useState(true);

    const animationVariants = {
      urdu: {
        opacity: 1,
      },
      transition: {
        duration: 1, // Adjust the duration as needed
      },
    };
  
    const animationVariantsHidden = {
      urdu: {
        opacity: 1,
      },
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsUrdu((prevIsUrdu) => !prevIsUrdu);
      }, 2500); // Adjust the interval as needed
  
      return () => clearInterval(interval);
    }, []);
  
    
  return (
    <div className='font-[Inter]'>
         <h1 className="text-[100px] font-extrabold text-[#1ECF5A] text-center mt-20">
         <motion.div
          variants={isUrdu ? animationVariants : animationVariantsHidden}
          initial={isUrdu ? 'urdu' : 'hidden'}
          animate={isUrdu ? 'hidden' : 'urdu'}
        >
          {isUrdu ? 'رزق راہی' :   <span style={{ fontSize: '80px' }}>RizqRaahi</span>}
        </motion.div>
   
    </h1>
    <h1 className='text-center text-5xl -mt-4'>From <span className='text-[#1ECF5A]'>People</span> To <span className='text-[#1ECF5A]'>People</span></h1>
    
    <button className='flex items-center justify-center rounded-[10px] px-5 py-2 text-1xl bg-[#1ECF5A] text-white ml-[528px] my-6 hover:text-[#1ECF5A] hover:bg-white hover:border-[#1ECF5A] hover:border-2 transition duration-500' > Explore Now →</button>

    </div>
  )
}
