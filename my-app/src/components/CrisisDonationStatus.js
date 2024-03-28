import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pic from "../assets/admin3.png";
import Sidebar from "./Sidebar/Sidebar";
import Sidebar2 from "./Sidebar/Sidebar2";


export const CrisisDonationStatus = () => {

  const [crisisDonation, setCrisisDonation] = useState();
  const [isInfo, setIsInfo] = useState(false);

  const getCrisisDonations = async () => {
    const value = await localStorage.getItem("authToken");

    const response = await fetch(`/getcrisisdonationstatus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
    });

    const data = await response.json();

    if (data.success === true) {
      setIsInfo(false);
      setCrisisDonation(data.assignedDonation);
    } else {
      setIsInfo(true);
      toast.update({
        render: `${data.message}`,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: true,
    })
    }
  };

  useEffect(
    React.useCallback(() => {
      getCrisisDonations();
    }, [])
  );


 
  return (
    <div className="flex font-[Inter]">
      <Sidebar2/>
      {crisisDonation && crisisDonation.length > 0 ? (
        <div className="flex-1 flex-col items-center justify-center mt-10 font-[Inter]">
          <h1 className="text-center text-5xl font-semibold text-[#1ECF5A] mb-4 ">Allocated Crisis Donations</h1>
          {crisisDonation.map((donation) => (
            <div className="flex flex-col items-center mt-10 mb-40 font-[Inter] font-semibold" key={donation.id}>
              <p>{donation.claimedByRelation.name} is on the way to collect donation for {donation.crisisRelation.name} Crisis</p>
              <p>Below are the details of the assigned donation:</p>
  
              <div className="flex flex-col items-center mt-12 -ml-96">
                <div className="border-4 border-[#1ECF5A] p-4 rounded-lg w-3/4">
                  <img src={pic} className="w-full h-auto" alt="Donation Image" />
                </div>
              </div>
  
              <div className="flex flex-col text-black " style={{ marginLeft: "28rem", marginTop: "-20rem" }}>
                <div className="text-black font-semibold text-2xl mx-auto">{donation?.claimedByRelation.name}</div>
                <div className="w-96 h-8 bg-[#D9D9D9] mt-2 rounded-lg flex items-center justify-center">
                  <span className="text-black text-sm font-semibold">Donation Details</span>
                </div>
                <div className=" font-semibold text-sm mt-4 ml-14">Amount <span className='ml-48'>{donation?.amount}</span></div>
                <div className=" font-semibold text-sm mt-4 ml-14">Type <span className='ml-52'>{donation?.amountType}</span> </div>
                <div className=" font-semibold text-sm mt-4 ml-14">Description <span className='ml-44'>{donation?.description}</span></div>
                <div className="w-96 h-0.5 bg-[#D9D9D9] mt-6"></div>
  
                <div className="flex justify-between mt-4">
                  <div className={`w-20 h-8 ${donation?.isFresh ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
                    <span>Fresh</span>
                  </div>
                  <div className={`w-24 h-8 ${donation?.isPerishable ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
                    <span>Perishable</span>
                  </div>
                  <div className={`w-20 h-8 ${donation?.isCooked ? 'bg-[#1ECF5A]' : 'bg-[#e82929]'} text-white rounded-lg flex items-center justify-center`}>
                    <span>Cooked</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
  
      {isInfo ? (
        <div className="mx-auto">
          <p>No Uncompleted Crisis Donations</p>
        </div>
      ) : null}
    </div>
  );

};