import React from 'react'
import vector from '../assets/img1-removebg-preview.png'
import vector2 from '../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg'
import { Link } from 'react-router-dom'
export const SignIn = () => {
  return (
  <div >
      <div className="fixed top-[40px] left-[140px] w-[350px] h-[500px] bg-white rounded-lg border border-white shadow-md">
              <img src={vector2} alt="Image" className=" mt-[1px] top-[7px] left-[205px] w-[150px] h-[160px] mx-auto" />
              <h1 className="text-center font-inter italic text-5xl font-bold leading-[10px] tracking-[0em] text-left  text-green-500" style={{ fontSize: '35px' }}>SIGN IN</h1>
              <p className="text-center mt-[10px] text-base"  style={{ fontSize: '10px' }} >To the world of help</p>

              <div className="mt-[15px] px-[20px] ">

                <div className="">                  
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full h-[30px] mb-[10px] rounded-md p-[10px]  bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}
                  />                  
                </div>
                            
                <div className="">
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '10px' }}
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    title="Invalid email address"
                    required
                  />
                </div>
                

                <div className="">                  
                  <input
                      type="password"
                      placeholder="Password"
                      className="w-full h-[30px] rounded-md p-[10px]   bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}
                    />                  
                </div>
                <div className="">                  
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full h-[30px] mb-[10px] mt-3 rounded-md p-[10px]  bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}
                  />                  
                </div>
                
                
                {/* User Type Dropdown */}
                {/* <div className="mt-3 ">
                  <select className="w-full h-[30px] rounded-md p-[0px]   bg-gray-100 focus:outline-none focus:border-blue-500" style={{ fontSize: '10px' }}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                    
                  </select>
                </div> */}
                
                  <button className="w-full h-[30px] mt-[15px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none" style={{ fontSize: '12px' }}>
                  SIGN IN
                  </button>
            
              </div>    
            <p 
                className="text-center mt-[13px] text-base" 
                style={{ fontSize: '10px' }}>Forgot Password?
            </p>
            <p 
                className="text-center mt-[3px] text-base" 
                style={{ fontSize: '10px' }}>Don't have an account? 
                <Link className="text-green-500 font-bold " style={{ fontSize: '10px' }} to="/signup">Sign up</Link>
            </p>
            
      </div>

   

        <div className="fixed top-0 w-[100%] h-[100px] mt-[100px] ml-[-180px] flex justify-end items-center">
          <div className="text-green-500 mr-8">
            <p
              className="font-inter text-8xl font-extrabold leading-[17px]  ml-[-50px] text-left text-green"
              style={{
                fontSize: '80px',
                fontWeight: 800,
                lineHeight: '157px',
                letterSpacing: '0em',
              }}
            >
              رزق راہی
            </p>
            <p className="text-4xl font-normal leading-[9px] ml-[-70px]" style={{ fontSize: '30px' }}>
              <span className="text-black ">From </span>People <span className="text-black">To </span>People
            </p>
          </div>
        </div>




      <div className="fixed bottom-[10px] right-[80px]">
        <img src={vector} className="w-[550px] h-[295px]" />
      </div>

        
  </div>


  )
}


// border border-gray-300