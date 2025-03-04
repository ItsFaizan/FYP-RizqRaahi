import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function LandingPageHome() {
  const [isUrdu, setIsUrdu] = useState(true);
  const controls = useAnimation();
  const textToDisplay = isUrdu ? "رزق راہی" : "RizqRaahi";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(0);
      setIsUrdu((prevIsUrdu) => !prevIsUrdu);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < textToDisplay.length) {
        setIndex(index + 1);
        setDisplayedText(textToDisplay.slice(0, index + 1));
      }
    }, 100); // Adjust the typing speed as needed

    return () => clearTimeout(timeout);
  }, [index, textToDisplay]);

  useEffect(() => {
    controls.start({ opacity: 1, x: 0 });
  }, [controls]);

  const scrollToAbout = () => {
    // Scroll to the position of the "About" component
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
};

  return (
      <div className="relative font-[Inter] ">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-transparent lg:border-[40px] border-0 border-[#1ECF5A] opacity-10 rounded-full"></div>

        <div className="absolute top-60  right-0 w-80 h-80 bg-transparent lg:border-[40px] border-0 border-[#1ECF5A] opacity-10 rounded-full"></div>

        <h1 className="sm:text-8xl text-5xl font-extrabold text-[#1ECF5A] text-center mb-5 mt-20">
          <motion.div style={{ display: "inline-block" }}>
            <motion.div
              style={{
                display: "inline-block",
                marginTop: "4rem"
              }}
              initial={{ opacity: 0, x: 0 }}
              animate={controls}
              exit={{ opacity: 0, x: 0 }}
            >
              {displayedText}
            </motion.div>
          </motion.div>
        </h1>
        <h1 className="text-center sm:text-5xl text-2xl -mt-4">
          From <span className="text-[#1ECF5A]">People</span> To{" "}
          <span className="text-[#1ECF5A]">People</span>
        </h1>
        <button onClick={scrollToAbout} className="flex items-center justify-center rounded-[10px] px-5 py-2 text-1xl bg-[#1ECF5A] text-white mx-auto my-6 hover:text-[#1ECF5A] hover:bg-white hover:border-[#1ECF5A] hover:border-2 transition duration-500">
          Explore Now →
        </button>
      </div>
  );
}
