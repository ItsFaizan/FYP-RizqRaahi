import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo-removebg-preview.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import languageur from "../../assets/language-ur.png";
import languageen from "../../assets/language-en.png";
import { useTranslation } from "react-i18next";

export default function NavbarWeb() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleLanguageSwitch = () => {
    if (currentLanguage === "en") {
      i18n.changeLanguage("ur");
      setCurrentLanguage("ur");
    } else {
      i18n.changeLanguage("en");
      setCurrentLanguage("en");
    }
  };

  const handleButtonClick = (option) => {
    console.log("Landing page sending: " + option);
    navigate("/signin", { state: { option: option } });
  };

  const handleButtonClickAdmin = (option) => {
    console.log("Landing page sending: " + option);
    navigate("/adminlogin", { state: { option: option } });
  };

  const scrollToHome = () => {
    // Scroll to the position of the "About" component with an offset
    const aboutElement = document.getElementById("home");
    if (aboutElement) {
      const yOffset = -160; // Adjust this value as needed
      const y = aboutElement.getBoundingClientRect().top + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToOverview = () => {
    // Scroll to the position of the "About" component
    const aboutElement = document.getElementById("overview");
    if (aboutElement) {
      const yOffset = 140; // Adjust this value as needed
      const y = aboutElement.getBoundingClientRect().top + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToFooter = () => {
    const aboutElement = document.getElementById("footer");
    if (aboutElement) {
      const yOffset = 140; // Adjust this value as needed
      const y = aboutElement.getBoundingClientRect().top + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="relative w-full h-[80px] flex justify-between items-center px-4 text-black font-[Inter]">
      <div className="flex items-center">
        <img src={logo} alt="news" className="w-24 h-30" />
        <img
          src={currentLanguage === "en" ? languageen : languageur}
          alt="language"
          className="w-24 h-9"
          onClick={handleLanguageSwitch}
        />
      </div>

      <ul className="hidden lg:flex font-medium space-x-8">
        <li className="hover:text-[#1ECF5A]">
          <button onClick={scrollToHome} duration={500}>
            {t("drawerHome")}
          </button>
        </li>
        <li className="hover:text-[#1ECF5A]">
          <button onClick={scrollToOverview} duration={500}>
            {t("overviewword")}
          </button>
        </li>
        <li className="hover:text-[#1ECF5A]">
          <button onClick={scrollToFooter} duration={500}>
            {t("aboutword")}
          </button>
        </li>
        <li className="text-[#1ECF5A] border-2 px-4 py-0 border-[#1ECF5A] rounded-[5px] hover:text-white hover:bg-[#1ECF5A] transition duration-500">
          <button
            smooth="true"
            duration={500}
            onClick={() => handleButtonClickAdmin("Admin")}
          >
            {t("adminword")}
          </button>
        </li>
        <li className="text-[#1ECF5A] border-2 px-4 py-0 border-[#1ECF5A] rounded-[5px] hover:text-white hover:bg-[#1ECF5A] transition duration-500">
          <button
            smooth="true"
            duration={500}
            onClick={() => handleButtonClick("NGO")}
          >
            {t("NGOword")}
          </button>
        </li>
        <li className="text-[#1ECF5A] border-2 px-4  border-[#1ECF5A] rounded-[5px] hover:text-white hover:bg-[#1ECF5A] transition duration-500">
          <button
            smooth="true"
            duration={500}
            onClick={() => handleButtonClick("Restaurant")}
          >
            {t("restaurantword")}
          </button>
        </li>
      </ul>

      <div onClick={handleClick} className="lg:hidden z-10">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-20 left-0 w-full h-screen bg-white flex flex-col justify-center items-center z-20 lg:hidden"
        }
      >
        <li className="py-6 text-4xl hover:text-[#1ECF5A]">
          {" "}
          <button onClick={scrollToHome} duration={500}>
            Home
          </button>{" "}
        </li>
        <li className="py-6 text-4xl hover:text-[#1ECF5A]">
          {" "}
          <button onClick={scrollToOverview} duration={500}>
            Overview
          </button>{" "}
        </li>
        <li className="py-6 text-4xl hover:text-[#1ECF5A]">
          {" "}
          <button onClick={scrollToFooter} duration={500}>
            About
          </button>
        </li>
        <li className="py-6 text-4xl hover:text-[#1ECF5A]">
          {" "}
          <button
            smooth="true"
            duration={500}
            onClick={() => handleButtonClick("Admin")}
          >
            Admin
          </button>
        </li>
        <li className="py-6 text-4xl hover:text-[#1ECF5A]">
          {" "}
          <button
            onClick={() => handleButtonClick("NGO")}
            to="#"
            smooth="true"
            duration={500}
          >
            NGO
          </button>
        </li>
        <li className="py-6 text-4xl hover:text-[#1ECF5A]">
          {" "}
          <button
            onClick={() => handleButtonClick("Restaurant")}
            to="#"
            smooth="true"
            duration={500}
          >
            Restaurant
          </button>
        </li>
      </ul>
    </div>
  );
}
