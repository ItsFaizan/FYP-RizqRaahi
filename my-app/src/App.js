import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn';
// import { Signup } from './components/Signup';
// import Home from './components/Home';
// import Sidebar from './components/Sidebar';
// import Announcement from './components/Announcement';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/announcement" element={<Announcement />} /> */}
         <Route path='/' element={<SignIn/>} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
