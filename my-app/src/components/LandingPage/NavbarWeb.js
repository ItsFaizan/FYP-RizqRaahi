import React, {useState} from 'react'
import logo from "../../assets/Logo-removebg-preview.png"
import {FaBars, FaTimes} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

export default function NavbarWeb () {
    const navigate = useNavigate();
  

const handleButtonClick = (option) => {
 
  console.log("Landing page sending: "+ option);
  navigate('/signin', { state: {option: option }});
};



  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)
  return (
    <div className='relative w-full h-[80px] flex justify-between items-center px-4 text-black font-[Inter]'>
      <div className='flex items-center'>
  <img src={logo} alt="news" className='w-24 h-30' />
</div>


        <ul className='hidden md:flex font-medium space-x-8'>
            <li className='hover:text-[#1ECF5A]'>
              <Link to="#" smooth="true"  duration={500}>Home</Link>
            </li>
            <li className='hover:text-[#1ECF5A]'>
            <Link to="#" smooth="true"  duration={500}>Overview</Link>
            </li>
            <li className='hover:text-[#1ECF5A]'>
            <Link to="#" smooth="true"  duration={500}>About</Link>
            </li >
            <li className='text-[#1ECF5A] border-2 px-4 py-0 border-[#1ECF5A] rounded-[5px] hover:text-white hover:bg-[#1ECF5A] transition duration-500'>
            <button smooth="true"  duration={500} onClick={() => handleButtonClick("NGO")}>NGO</button>
            </li>
            <li className='text-[#1ECF5A] border-2 px-4  border-[#1ECF5A] rounded-[5px] hover:text-white hover:bg-[#1ECF5A] transition duration-500'>
            <button smooth="true"  duration={500} onClick={() => handleButtonClick("Restaurant")} >Restaurant</button>
            </li>
        </ul>

      <div onClick={handleClick} className='md:hidden z-10'>
        {!nav ? <FaBars/> : <FaTimes/>}
      </div>
      
      <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center'}>
            <li className='py-6 text-4xl hover:text-[#1ECF5A]'> <Link onClick={handleClick} to="#" smooth="true" duration={500}>Home</Link> </li>
            <li className='py-6 text-4xl hover:text-[#1ECF5A]'> <Link onClick={handleClick} to="#" smooth="true"  duration={500}>Overview</Link> </li>
            <li className='py-6 text-4xl hover:text-[#1ECF5A]'> <button onClick={handleClick} to="#" smooth="true"  duration={500}>About</button></li>
            <li className='py-6 text-4xl hover:text-[#1ECF5A]'> <button onClick={() => handleButtonClick("NGO")} to="#" smooth="true"  duration={500}>NGO</button></li>
            <li className='py-6 text-4xl hover:text-[#1ECF5A]'> <button onClick={() => handleButtonClick("Restaurant")} to="#" smooth="true"  duration={500}>Restaurant</button></li>
        </ul>

    
    </div>


  )
}
