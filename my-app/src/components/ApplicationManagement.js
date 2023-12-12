import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import pic1 from "../assets/ngogenericlogo.jpg";
import pic2 from "../assets/addimgpic.png";

export default function ApplicationManagement() {

    
  const [applicants, setApplicants] = useState();
  const [isInfo, setIsInfo] = useState(false);


  const getApplicants = async () => {
    // console.log('getConversations called');

    const value = await localStorage.getItem("authToken");

    const response = await fetch(`/getsubadminapplications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
    });

    const data = await response.json();
    // console.log(data.subAdminApplications)
    // console.log(data);

    if (data.success === true && data.subAdminApplications.length === 0) {
      // console.log(data.message);
      setIsInfo(true);
      setApplicants([]);
     
    } else if (data.success === true && data.subAdminApplications.length > 0) {
      // console.log(data);
      setIsInfo(false);
      setApplicants(data.subAdminApplications);
    } else {
        toast.error(data.message);
    }
  };

  useEffect(
    React.useCallback(() => {
      getApplicants();
    }, [])
  );


  const renderApplicants = ({ item }) => {
    console.log(item)
    return (
        <div>
        <div>
          <img
            src={pic1}
            alt="Profile"
           
          />
          
          <div>
            <p >{item.email}</p>
            <p >
              The proof images for pending admin are as follows
            </p>
          </div>
        </div>
        <div >
          {item.proofImage.map((image, index) => (
            <button key={index}>
              <div >
                {image ? (
                  <img src={{ uri: image }}  />
                ) : (
                  <img
                    src={pic2}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
        <div>
          <button onClick={() => giveVerdict(item.userid, 'approved')}>
            Approve
          </button>
          <button onClick={() => giveVerdict(item.userid, 'rejected')}>
            Reject
          </button>
        </div>
      </div>
    );
  };


  const giveVerdict = async(userid, decision) => {

    const value = await localStorage.getItem("authToken");

    console.log(userid, decision);

    const response = await fetch(`/decidesubadmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
      body: JSON.stringify({userid, decision})
    });

    const data = await response.json();


    if (data.success === true ) {
      
        toast.success(data.message);;


      setApplicants(applicants.filter((item) => item.userid !== userid));
    } else {
        toast.error(data.message);;

    }

  };
    return(
        <>
      {applicants && applicants.length > 0 ? (
        <div >
          <ul>
            {applicants?.map((applicant) => (
              <li key={applicant.id}>
                 <div>
        <div>
          <img
            src={pic1}
            alt="Profile"
           
          />
          
          <div>
            <p >{applicant.email}</p>
            <p >
              The proof images for pending admin are as follows
            </p>
          </div>
        </div>
        <div >
          {applicant.proofImage.map((image, index) => (
            <button key={index}>
              <div >
                {image ? (
                  <img src={image}  />
                ) : (
                  <img
                    src={pic2}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
        <div>
          <button onClick={() => giveVerdict(applicant.userid, 'approved')}>
            Approve
          </button>
          <button onClick={() => giveVerdict(applicant.userid, 'rejected')}>
            Reject
          </button>
        </div>
      </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {isInfo ? (
        <div >
          <p >No Applications Found</p>
        </div>
      ) : null}
    </>

    )

}