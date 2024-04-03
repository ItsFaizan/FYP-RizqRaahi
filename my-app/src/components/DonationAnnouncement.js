import React, { useState, useRef, useEffect } from "react";
import vector from "../assets/kid9.jpeg";
import vector2 from "../assets/logo.png";
import { io } from "socket.io-client";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar2 from "./Sidebar/Sidebar2";
import { useTranslation } from "react-i18next";

export default function Announcement() {
  const { t } = useTranslation();
  const locationdata = useLocation();
  const navigate = useNavigate();
  const data = locationdata.state;

  const [isFresh, setIsFresh] = useState(false);
  const [isCooked, setIsCooked] = useState(false);
  const [isPerishable, setIsPerishable] = useState(false);
  const [isKgSelected, setIsKgSelected] = useState(true);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [crisisData, setCrisisData] = useState();
  const [token, setToken] = useState(null);
  const [selectedCrisisId, setSelectedCrisisId] = useState();

  //const token = data.token;
  var id;
  const socket = useRef(null);

  const handleFreshToggle = () => {
    setIsFresh(!isFresh);
  };

  const handleCookedToggle = () => {
    setIsCooked(!isCooked);
  };

  const handlePerishableToggle = () => {
    setIsPerishable(!isPerishable);
  };

  const handleSubmitCrisis = async () => {
    try {
      const parsedAmount = parseInt(amount, 10);

      if (isNaN(parsedAmount) || description === "") {
        toast.error("Please fill all the fields", {
          autoClose: 3000,
          theme: "dark",
        });
      } else if (!Number.isInteger(parsedAmount)) {
        toast.error("Please Enter an Integer", {
          autoClose: 3000,
          theme: "dark",
        });
      } else if (parsedAmount <= 0 || parsedAmount > 100000) {
        toast.error("Please Enter a valid Amount (0-100,000)", {
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        const token = localStorage.getItem("authToken");
        const amountType = isKgSelected ? "KG" : "Units";

        id = toast.loading(`Creating Real-Time Donation...`, {
          theme: "dark",
        });

        const response = await fetch(`/crisisdonation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: parsedAmount,
            description: description,
            isFresh: isFresh,
            isCooked: isCooked,
            isPerishable: isPerishable,
            amountType: amountType,
            crisisId: parseInt(selectedCrisisId),
          }),
        });

        const data = await response.json();
        if (data.success === true) {
          console.log("Announcement Created");
          toast.update(id, {
            render: `${data.message}`,
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: true,
          });
        } else {
          console.log("Announcement not Created");
          console.log(data);
          console.log("data.message: " + data.message);
          toast.update(id, {
            render: `${data.message}`,
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: true,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.update(id, {
        render: `${data.message}`,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: true,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const parsedAmount = parseInt(amount, 10);

      if (isNaN(parsedAmount) || description === "") {
        toast.error("Please fill all the fields", {
          autoClose: 3000,
          theme: "dark",
        });
      } else if (!Number.isInteger(parsedAmount)) {
        toast.error("Please Enter an Integer", {
          autoClose: 3000,
          theme: "dark",
        });
      } else if (parsedAmount <= 0 || parsedAmount > 100000) {
        toast.error("Please Enter a valid Amount (0-100,000)", {
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        const token = localStorage.getItem("authToken");
        const amountType = isKgSelected ? "KG" : "Units";

        id = toast.loading(`Creating Real-Time Donation...`, {
          theme: "dark",
        });

        const response = await fetch(`/createdonation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: parsedAmount,
            description: description,
            isFresh: isFresh,
            isCooked: isCooked,
            isPerishable: isPerishable,
            amountType: amountType,
          }),
        });

        const data = await response.json();
        if (data.success === true) {
          console.log("Announcement Created");
          toast.update(id, {
            render: `${data.message}`,
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: true,
          });
          await socket.current.emit("newAnnouncement", data.markerData);
          setTimeout(() => {
            navigate("/deliverytracker");
            console.log("Navigating to Delivery Tracker");
          }, 1500);
        } else {
          console.log("Announcement not Created");
          console.log(data);
          console.log("data.message: " + data.message);
          toast.update(id, {
            render: `${data.message}`,
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: true,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.update(id, {
        render: `${data.message}`,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: true,
      });
    }
  };

  const getCrisisInfo = async (value) => {
    try {
      const response = await fetch(`/checkcrisis`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      });

      const data = await response.json();
      if (data.success === true) {
        setCrisisData(data.crisisAlert);
        console.log("Crisis Data: " + JSON.stringify(data.crisisAlert));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const retrieveToken = async () => {
    try {
      const value = await localStorage.getItem("authToken");
      if (value !== null) {
        setToken(value);
        await getCrisisInfo(value);
      }
    } catch (e) {
      console.log("Error in Donation Status:" + e);
      console.log(JSON.stringify(e));
    }
  };

  useEffect(() => {
    retrieveToken();
    setAmount("");
    setDescription("");
    setIsKgSelected(true);
  }, []);

  window.addEventListener("load", (event) => {
    const toggleButtons = document.querySelectorAll(".toggle-button");

    toggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener("click", () => {
        const handle = toggleButton.querySelector("div");
        const id = toggleButton.getAttribute("data-id");
        const toggleStateText = document.getElementById(`toggleState${id}`);
        let isToggled = handle.classList.contains("translate-x-full");

        isToggled = !isToggled;
        const newState = isToggled ? "Fresh" : "Unfresh";
        const newState2 = isToggled ? "Cooked" : "Uncooked";
        const newState3 = isToggled ? "Perishable" : "Unperishable";

        handle.classList.toggle("translate-x-full", isToggled);
        toggleStateText.innerText =
          id === "1" ? newState : id === "2" ? newState2 : newState3;

        // Toggle color class
        toggleButton.classList.toggle("bg-green-500", isToggled);
        toggleButton.classList.toggle("bg-gray-300", !isToggled);
      });
    });
  });

  const handleKgClick = () => {
    setIsKgSelected(true);
  };

  const handleUnitsClick = () => {
    setIsKgSelected(false);
  };

  useEffect(() => {
    if (token != null) {
      // Connect to the Socket.io server when the component mounts
      socket.current = io("http://localhost:3001", {
        auth: { token: token },
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [token]);

  return (
    <div className="flex">
      <Sidebar2 />

      <div className="fixed bottom-[60px] left-80 background">
        <img src={vector} alt={"Img"} className="w-auto h-[405px]" />
      </div>

      <div className="fixed top-[160px] right-[90px] w-[410px] h-[550px] bg-white rounded-lg border border-white shadow-md">
        <img
          src={vector2}
          alt="Img"
          className=" mt-[-28px] top-[2px] left-[205px] w-[160px] h-[160px] mx-auto"
        />
        {crisisData ? (
          <h1
            className="text-center mt-[-28px] font-inter font-semibold text-green text-4xl leading-14 tracking-tight"
            style={{ fontSize: "27px" }}
          >
            {t("crisisdonationtext")}
          </h1>
        ) : (
          <h1
            className="text-center mt-[-28px] font-inter font-semibold text-green text-4xl leading-14 tracking-tight"
            style={{ fontSize: "27px" }}
          >
            {t("donationannouncementheading1")}
          </h1>
        )}
        <h1
          className="text-center mt-[-16px] font-inter font-semibold text-green text-4xl leading-14 tracking-tight"
          style={{ fontSize: "27px" }}
        >
          {t("donationannouncementheading2")}
        </h1>

        <div className="mt-[10px] px-[20px] ">
          <div className="">
            <input
              type="text"
              placeholder={t("amountword")}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-[30px] mb-[10px] rounded-md p-[10px]  bg-gray-100 focus:outline-none focus:border-blue-500"
              style={{ fontSize: "10px" }}
            />
          </div>

          <div className="flex space-x-1">
            <div
              className={`w-80 h-8 flex items-center justify-center rounded-l-md cursor-pointer text-xs ${
                isKgSelected ? "bg-green" : "bg-gray-300"
              }`}
              onClick={handleKgClick}
            >
              {t("KGword")}
            </div>
            <div
              className={`w-80 h-8 flex items-center justify-center rounded-r-md cursor-pointer text-xs ${
                !isKgSelected ? "bg-green" : "bg-gray-300"
              }`}
              onClick={handleUnitsClick}
            >
              {t("Unitword")}
            </div>
          </div>

          <div className="paragraph-input">
            <textarea
              id="description"
              placeholder={t("descriptionword")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[60px] mt-2 rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex mx-28">
            {crisisData ? (
              <select
                value={selectedCrisisId}
                onChange={(e) => setSelectedCrisisId(e.target.value)}
              >
                <option value={" "} hidden>
                  {t("selectcrisisword")}
                </option>
                {crisisData.map((crisis) => (
                  <option key={crisis.id} value={crisis.id}>
                    Crisis: {crisis.name}
                  </option>
                ))}
              </select>
            ) : null}
          </div>

          <div className="relative"></div>

          <div className="relative">
            <div className="relative">
              {/* Fresh Toggle Button */}
              <div className="flex items-center space-x-4">
                <span className="fixed top-[528px] right-[230px] text-sm font-semibold mx-[90px]">
                  {t("freshword")}
                </span>
                <button
                  className={`fixed top-[524px] right-[200px] w-16 h-8 rounded-full focus:outline-none ${
                    isFresh ? "bg-green" : "bg-gray-300"
                  }`}
                  onClick={handleFreshToggle}
                >
                  <div
                    className={`inner absolute left-1 top-1 w-7 h-6 rounded-full bg-white shadow transition duration-300 ${
                      isFresh ? "translate-x-full" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Cooked Toggle Button */}
              <div className="flex items-center space-x-4">
                <span className="fixed top-[568px] right-[320px] text-sm font-semibold">
                  {t("cookedword")}
                </span>
                <button
                  className={`fixed top-[562px] right-[200px] w-16 h-8 rounded-full focus:outline-none ${
                    isCooked ? "bg-green" : "bg-gray-300"
                  }`}
                  onClick={handleCookedToggle}
                >
                  <div
                    className={`inner absolute left-1 top-1 w-7 h-6 rounded-full bg-white shadow transition duration-300 ${
                      isCooked ? "translate-x-full" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Perishable Toggle Button */}
              <div className="flex items-center space-x-4">
                <span className="fixed top-[604px] right-[240px] text-sm font-semibold mx-[80px]">
                  {t("perishableword")}
                </span>
                <button
                  className={`fixed top-[600px] right-[200px] w-16 h-8 rounded-full focus:outline-none ${
                    isPerishable ? "bg-green" : "bg-gray-300"
                  }`}
                  onClick={handlePerishableToggle}
                >
                  <div
                    className={`inner absolute left-1 top-1 w-7 h-6 rounded-full bg-white shadow transition duration-300 ${
                      isPerishable ? "translate-x-full" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {console.log("so here are ", isPerishable, isCooked, isFresh)}

            <button
              onClick={crisisData ? handleSubmitCrisis : handleSubmit}
              className="fixed w-[180px] h-[30px] mt-40 right-[200px] bg-green text-white rounded-lg text-lg font-semibold hover:bg-green focus:outline-none"
              style={{ fontSize: "12px" }}
            >
              {t("createannouncementtext")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
