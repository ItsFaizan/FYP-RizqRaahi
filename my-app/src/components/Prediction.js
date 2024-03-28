import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";
import restaurantImageUrl from "../assets/chat.jpg";
import Sidebar from "./Sidebar/Sidebar";
import Restaurant from "../assets/resdrawericon.png";
import "./Prediction.css";

const Prediction = () => {
  const { t } = useTranslation();
  const [predictiondata, setPredictionData] = useState([]);
    const [resnames, setResnames] = useState([]);
    const [emails, setEmails] = useState([]);
    const [totaldonations, setTotalDonations] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPredictions = async() => {

      const token = await localStorage.getItem("authToken");
      const response = await fetch(`/getpredictions`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });

      const data = await response.json();
      setIsLoading(false);
      if (data.success)
      {
        setEmails(data.resemails);
        setResnames(data.resnames);
        setTotalDonations(data.totaldonations);
        setPredictionData(data.predictions);

        setIsReady(true);

      }
      else
      {
        console.log("Failed to fetch predictions");
      }
      
  };

  useEffect(
    React.useCallback(() => { 
        fetchPredictions();
    }
    , [])
);

// const disclaimer = i18n.t("disclaimersentence");


  return (
    <div className="flex">
      <Sidebar />
    
      <div
        className="h-full min-h-screen w-half bg-white pt-12 p-4 mb-20"
        style={{ marginLeft: "4rem" }}
      >
          <p className="ml-[450px] font-bold text-5xl mb-8 text-green">{t("donationpredictionword")}</p>
        <div className="container mx-auto cursor-pointer">
          <div className="card bg-white rounded-lg shadow-md mb-6">
            <div className="bg-green text-white px-4 py-2 rounded-t-md">
              <h1 className="text-lg font-bold">{t("disclaimerword")}</h1>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{t("disclaimersentence")}</p>
            </div>
          </div>
        </div>

        {isLoading ? (
  <>
  <div className="flex justify-center items-center h-full z-100000 mx-32">
    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green"></div> 
  </div>
   <p className="text-xl font-medium text-green ml-[480px]">{t("donationpredictiontext")}</p>
   </>
) : (

        <div className="container mx-auto pt-10">
          <div className="grid gap-14 md:grid-cols-3 md:gap-5">
            {predictiondata.map((restaurant, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-6 text-center shadow-xl hover:bg-gray-200 hover:shadow-2xl cursor-pointer"
              >
                <div
                  src={Restaurant}
                  className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40"
                >
                  <img
                    src={Restaurant}
                    alt="Restaurant"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h1 className="text-darken mb-2 text-xl font-medium lg:px-14">
                {resnames[i]}
                </h1>
                <p className="px-2 text-gray-500 mb-5 lg:px-14">{emails[i]}</p>
                <div class="flex justify-center flex-wrap mb-9">
                  <div class="bg-green text-white px-2 py-2 rounded-md mr-4 mb-4">
                    <h3 class="font-bold">{t("givendonationsword")}</h3>
                    <p>{totaldonations[i]}</p>
                  </div>
                  <div class="bg-green text-white px-4 py-2 rounded-md mb-4">
                    <h3 class="font-bold">{t("nextweekpredictionword")}</h3>
                    <p>{Math.round(predictiondata[i])} KG</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      )}
      </div>
    </div>
  );
};

export default Prediction;
