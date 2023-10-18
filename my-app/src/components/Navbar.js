import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css'; // Import your CSS file

const TopNavBar = () => {
    const navigate = useNavigate();
    const pageLocation = useLocation();

    const backgroundClass = pageLocation.pathname === "/donationAnnouncement" ? "whiteBackground" : "blackBackground";
    const navigateToSelection = () => {
        navigate('/');
    };

    return (
        <div className={`container ${backgroundClass}`}>
            <div className="leftIcon">
                <FontAwesomeIcon icon={faBars} size="2x" color='#1ECF5A' />
            </div>
            <div className="centerText">رزق راہی</div>
            <div className="rightIcon">
                <FontAwesomeIcon icon={faPowerOff} size="2x" color='#1ECF5A' onClick={navigateToSelection} />
            </div>
        </div>
    );
};

export default TopNavBar;
