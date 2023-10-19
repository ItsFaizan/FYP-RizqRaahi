import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn';
import { Signup } from './components/Signup';
import Home from './components/Home';
// import Sidebar from './components/Sidebar';
// import Announcement from './components/Announcement';
import LocationSelection from './components/LocationSelection';
import {ToastContainer} from 'react-toastify';
import MainMap from './components/MainMap';
import NotificationListener from './components/Notifications/NotificationListener';
import Navbar from './components/Navbar';
import  NavbarWeb  from './components/LandingPage/NavbarWeb';
import  LandingPageHome  from './components/LandingPage/LandingPageHome';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div> 
    {/* <NotificationListener /> */}
    <Router>
        <Routes>
          <Route path="/" element={<div><NavbarWeb /><LandingPageHome/></div>} />
          <Route path="/donationAnnouncement" element={<div><Navbar/><Home /></div>} />
          <Route path="/signin" element={<div><SignIn/></div>} />
          <Route path="/signup" element={<div><Signup /></div>} />
          <Route path="/location-selection" element={<div><LocationSelection /></div>} />
          <Route path="/MainMap" element={<div><Navbar/><MainMap /></div>} />

        </Routes>
        <ToastContainer
          position="top-center"
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
         />
    </Router>
    </div>
  );
}

export default App;
