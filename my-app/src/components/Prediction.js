import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import restaurantImageUrl from '../assets/chat.jpg';
import Sidebar2 from './Sidebar/Sidebar2';
import Restaurant from '../assets/resdrawericon.png';
import './Prediction.css';


const Prediction = () => {
    const { t } = useTranslation();
    const { addToast } = useToasts();
    
    const disclaimerword = "Please note that the predictions provided here are estimates and may not reflect the actual donations from restaurants. These predictions are intended to give a general idea of what to expect from each restaurant. As restaurants donate more frequently, the predictions will become more accurate over time. We apologize for any inconvenience caused and appreciate your understanding.\n";
    const [predictionData, setPredictionData] = useState([
        "Prediction 1",
        "Prediction 2",
        "Prediction 3"
    ]);
    const [resNames, setResNames] = useState([
        "Restaurant 1",
        "Restaurant 2",
        "Restaurant 3"
    ]);
    const [emails, setEmails] = useState([
        "restaurant1@example.com",
        "restaurant2@example.com",
        "restaurant3@example.com"
    ]);
    const [totalDonations, setTotalDonations] = useState([
        "100 KG",
        "200 KG",
        "150 KG"
    ]);
    const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);

    useEffect(() => {
        // Commented out API call
        // fetchPredictions();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentRestaurantIndex((prevIndex) => (prevIndex + 1) % resNames.length);
        }, 1200); // Adjust the interval time as needed (5000 milliseconds = 5 seconds)

        return () => clearInterval(intervalId); // Clear the interval on component unmount
    }, [resNames.length]);

    // const fetchPredictions = async () => {
    //     try {
    //         // API call logic here...
    //     } catch (error) {
    //         console.error("Error fetching predictions:", error);
    //         addToast("An error occurred while fetching predictions", { appearance: 'error' });
    //     }
    // };

    const goToNextRestaurant = () => {
        setCurrentRestaurantIndex((prevIndex) => (prevIndex + 1) % resNames.length);
    };

    return (
        <div className="flex">
             <Sidebar2 />
             <div className="h-full min-h-screen w-half bg-white pt-12 p-4 mb-20" style={{ marginLeft: '4rem' }}>


           
            <div className="container mx-auto cursor-pointer">
                <div className="card bg-white rounded-lg shadow-md mb-6">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-t-md">
                        <h1 className="text-lg font-bold">{t("disclaimerword")}</h1>
                    </div>
                    <div className="p-4">
                        <p className="text-gray-700">{disclaimerword}</p>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto pt-10">
                <div className="grid gap-14 md:grid-cols-3 md:gap-5">
                    {resNames.map((resName, i) => (
                        <div key={i} className="rounded-xl bg-white p-6 text-center shadow-xl hover:bg-gray-200 hover:shadow-2xl cursor-pointer">
                            <div src={Restaurant} className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
                                <img src={Restaurant} alt="Restaurant" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <h1 className="text-darken mb-2 text-xl font-medium lg:px-14">{resName}</h1>
                            <p className="px-2 text-gray-500 mb-5 lg:px-14">{emails[i]}</p>
                            <div class="flex justify-center flex-wrap mb-9">
                            <div class="bg-green-500 text-white px-4 py-2 rounded-md mr-4 mb-4">
                                <h3 class="font-bold">{t("givendonationsword")}</h3>
                                <p>{totalDonations[i]}</p>
                            </div>
                            <div class="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
                                <h3 class="font-bold">{t("nextweekpredictionword")}</h3>
                                <p>{Math.round(predictionData[i])} KG</p>
                            </div>
                        </div>

                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto pt-10 relative" >

                <div className="card bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-t-md">
                        <h1 className="text-lg font-bold">Restaurant Details</h1>
                    </div>

                    {/* <div className="p-4 flex justify-center" style={{ marginRight: '-50rem' }}>
                        <div className="transition-transform duration-500 ease-in-out transform -translate-x-full" style={{ transform: `translateX(-${currentRestaurantIndex * 100}%)` }}>
                            <div className="flex flex-col gap-2 text-white rounded-xl shadow-md p-6 max-w-[400px] bg-gray-600 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                                <div className="font-semibold text-lg">{resNames[currentRestaurantIndex]}</div>
                                <div className="font-semibold text-5xl tracking-tight">{totalDonations[currentRestaurantIndex]}</div>
                                <div className="font-normal">{emails[currentRestaurantIndex]}</div>
                                <div className="flex justify-center mb-9">
                                    <div className="bg-green-500 text-white px-4 py-2 rounded-md mr-4">
                                        <h3 className="font-bold">{t("givendonationsword")}</h3>
                                        <p>{totalDonations[currentRestaurantIndex]}</p>
                                    </div>
                                    <div className="bg-green-500 text-white px-4 py-2 rounded-md">
                                        <h3 className="font-bold">{t("nextweekpredictionword")}</h3>
                                        <p>{Math.round(predictionData[currentRestaurantIndex])} KG</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

{/* <div className="p-4 flex justify-center items-center">
  <div className="transition-transform duration-500 ease-in-out transform -translate-x-full">
    <div className="flex flex-col gap-4 text-white rounded-lg shadow-md p-6 max-w-[400px] bg-gray-600 bg-opacity-30 backdrop-filter backdrop-blur-lg">
      <div className="flex items-center justify-center mb-4">
        <img src={Restaurant} alt="Restaurant" className="w-12 h-12 rounded-full" />
        <div className="ml-3">
          <h2 className="text-xl font-semibold">{resNames[currentRestaurantIndex]}</h2>
          <p className="text-sm">{emails[currentRestaurantIndex]}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold">{t("givendonationsword")}</h3>
          <p className="text-xl font-bold">{totalDonations[currentRestaurantIndex]}</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold">{t("nextweekpredictionword")}</h3>
          <p className="text-xl font-bold">{Math.round(predictionData[currentRestaurantIndex])} KG</p>
        </div>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 transition-colors duration-300">
        View More
      </button>
    </div>
  </div>
</div> */}


<div className="p-4 flex justify-center items-center">
  <div className={`transition-transform duration-500 ease-in-out transform ${currentRestaurantIndex === 0 ? '' : 'slide-out'}`}>
    <div className={`flex flex-col gap-4 text-white rounded-lg shadow-md p-6 max-w-[400px] bg-gray-600 bg-opacity-30 backdrop-filter backdrop-blur-lg ${currentRestaurantIndex === 0 ? '' : 'slide-in'}`}>
      <div className="flex items-center justify-center mb-4">
        <img src={Restaurant} alt="Restaurant" className="w-12 h-12 rounded-full" />
        <div className="ml-3">
          <h2 className="text-xl font-semibold">{resNames[currentRestaurantIndex]}</h2>
          <p className="text-sm">{emails[currentRestaurantIndex]}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold">{t("givendonationsword")}</h3>
          <p className="text-xl font-bold">{totalDonations[currentRestaurantIndex]}</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold">{t("nextweekpredictionword")}</h3>
          <p className="text-xl font-bold">{Math.round(predictionData[currentRestaurantIndex])} KG</p>
        </div>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 transition-colors duration-300">
        View More
      </button>
    </div>
  </div>
</div>







                </div>
                <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-md" onClick={goToNextRestaurant}>Next</button>
            </div>

        </div>
        </div>
    );
};

export default Prediction;
