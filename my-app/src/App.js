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
import { Overview } from './components/LandingPage/Overview';
import { Solution } from './components/LandingPage/Solution';
import { About } from './components/LandingPage/About';
import { Work } from './components/LandingPage/Work';
import { FAQ } from './components/LandingPage/FAQ';
import DeliveryTracker from './components/DeliveryTracker';
import { ClaimDonation } from './components/ClaimDonation';
import { AdminLogin } from './components/AdminLogin';
import { AdminSignup } from './components/AdminSignup';

import Sidebar from './components/Sidebar/Sidebar';
import Sidebar2 from './components/Sidebar/Sidebar2';
import Conversations from './components/Chats/Conversations';
import AdminCreation from './components/AdminCreation';
import Crisis from './components/Crisis';
import { CrisisDonationTracking } from './components/CrisisDonationTracking';
import { CrisisDonationStatus } from './components/CrisisDonationStatus';
import ApplicationManagement from './components/ApplicationManagement';
import { CrisisManagment } from './components/CrisisManagment';
import AdminSidebar from './components/Sidebar/AdminSidebar';
import SubAdminSidebar from './components/Sidebar/SubAdminSidebar';
import { Footer } from './components/LandingPage/Footer';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import Prediction from './components/Prediction';
import { ToastProvider } from 'react-toast-notifications';
import Analytics from './components/Analytics';




function App() {
  
  return (
    <div> 

   <ToastProvider>
    <NotificationListener />
    <Router>
        <Routes>
          {/* <Route path='/' element={<AdminCreation/>} ></Route> */}
          <Route path="/" element={<div><NavbarWeb /><LandingPageHome/><Overview/> <Solution/><About/><Work/><FAQ/><Footer/></div>} />
          <Route path="/donationAnnouncement" element={<div><Navbar/><Home /></div>} />
          <Route path="/signin" element={<div><SignIn/></div>} />
          <Route path="/signup" element={<div><Signup /></div>} />
          <Route path="/adminlogin" element={<div><AdminLogin /></div>} />
          <Route path="/adminsignup" element={<div><AdminSignup /></div>} />
          <Route path="/admincreation" element={<div><AdminCreation /></div>} />
          <Route path="/location-selection" element={<div><LocationSelection /></div>} />
          <Route path="/MainMap" element={<div><MainMap /></div>} />
          <Route path="/deliverytracker" element={<div><DeliveryTracker/></div>} />
          <Route path="/claimdonation" element={<div><ClaimDonation/></div>} />
          <Route path="/analytics" element={<div><Analytics/></div>} />
          <Route path="/chats" element={<div><Conversations/></div>} />
          <Route path="/crisis" element={<div><Navbar/><AdminSidebar/><Crisis/></div>} />
          <Route path="/subadmincrisis" element={<div><Navbar/><SubAdminSidebar/><Crisis/></div>} />
          <Route path="/crisisdonationtracking" element={<div><CrisisDonationTracking/></div>} />
          <Route path="/crisisdonationstatus" element={<div><CrisisDonationStatus/></div>} />
          <Route path="/applicationmanagment" element={<div><ApplicationManagement/></div>} />
          <Route path="/crisismanagment" element={<div><Navbar/><div className='flex'><AdminSidebar/></div><CrisisManagment/></div>} />
          <Route path="/subadmincrisismanagment" element={<div><Navbar/><div className='flex'><SubAdminSidebar/></div><CrisisManagment/></div>} />
          <Route path="/profile" element={<div><Profile/></div>} />
          <Route path="/update-profile" element={<div><UpdateProfile/></div>} />
          <Route path="/prediction" element={<div><Prediction/></div>} />
        </Routes>
        <ToastContainer
          position="top-center"
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
         />
    </Router>
    </ToastProvider>
    </div>
  );
}

export default App;
