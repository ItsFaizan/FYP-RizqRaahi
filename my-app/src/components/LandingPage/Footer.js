import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'

import logo from "../../assets/Logo-removebg-preview.png"


export const Footer = () => {
    return (
        <>
        <div class="lg:w-[800px] xl:w-[1300px] md:w-[600px] w-[280px] mx-auto h-px mt-20 bg-gray-300"></div>
        <div className=" flex flex-col sm:flex-row bg-white mx-auto 2xl:max-w-[1440px] 2xl:mx-auto">

        <div className="flex flex-col lg:mx-auto mx-4">
            <img src={logo} className="w-40 h-40 mb-2 mx-auto" alt="Logo"/>
            <div className="flex justify-center mx-auto">
                <FaLinkedin className="w-10 h-10 mr-4 text-green"/>
                <FaTwitter className="w-10 h-10 mr-4 text-green"/>
                <FaFacebook className="w-10 h-10 mr-4 text-green"/>
            </div>
            <h2 className="text-black mx-auto sm:text-xl text-lg my-8 flex items-center">Made with <FaHeart className='text-green mx-4'/> by Team RizqRaahi</h2>
        </div>
    
        <div className="flex flex-col mx-auto text-black sm:mt-16">
            <div className="flex flex-col lg:flex-row justify-center mb-8">
                <div className="flex flex-col lg:mr-36 mx-auto mb-8 lg:mb-0">
                    <h1 className="text-xl mb-4 text-green font-bold">Resources</h1>
                    <h1 className="text-xl mb-4">Blog</h1>
                    <h1 className="text-xl">Newsletter</h1>
                </div>
                <div className="flex flex-col mx-auto">
                    <h1 className="text-xl mb-4 text-green font-bold">Company</h1>
                    <h1 className="text-xl mb-4">About</h1>
                    <h1 className="text-xl">Sponsor</h1>
                </div>
            </div>
            <h2 className="text-black sm:text-xl text-lg mx-auto my-7">© 2024 RizqRaahi. All rights reserved.</h2>
        </div>
    
    </div>
    </>
    
    )
}   