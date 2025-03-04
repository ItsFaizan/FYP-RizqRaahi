import React, { useState} from "react";
import vector from "../assets/Kid4.jpeg";
import vector2 from "../assets/logo.png";
import location from "../assets/location2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const Signup = () => {

  const { t } = useTranslation();
  const Navigate = useNavigate();
  const locationdata = useLocation();
  const data = locationdata.state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [locationValue, setLocationValue] = useState(data.coordinates);
  const [proximity , setProximity] = useState("");
  const [capacity, setCapacity] = useState('');

  const option = data.option;

  // const toastId = useRef(null)

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCPasswordChange = (e) => {
    setCPassword(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationValue(e.target.value);
  };

  const handleProximityChange = (e) => {
    setProximity(e.target.value);
  };

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const handleSubmit = (e) => {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


     if (name === '' || email === '' || password === '' || cpassword === '') 
     {

      toast.error('Please fill all the fields', {
        autoClose: 3000,
        theme: 'dark',
      });

    } else if (locationValue === '') {

      toast.error('Please Select a Location', {
        autoClose: 3000,
       theme: 'dark',
      });

    } else if (!emailRegex.test(email)) {

      toast.error('Please Enter a Valid Email Address', {
        autoClose: 3000,
       theme: 'dark',
      });

    } else if (password.length < 8) {

      toast.error('Password must be at least 8 characters long', {
        autoClose: 3000,
       theme: 'dark',
      });


    } else if (password !== cpassword) {

      toast.error('Passwords do not match', {
        autoClose: 3000,
       theme: 'dark',
      });
    }
      

    else {

      if (option === 'NGO') 
      {
        if (proximity === '') 
        {
          toast.error('Proximity must be given', {
            autoClose: 3000,
           theme: 'dark',
          });
          return;
        } 
        else if (isNaN(proximity) || parseInt(proximity) !== parseFloat(proximity)) 
        {
          toast.error('Proximity must be an integer', {
            autoClose: 3000,
           theme: 'dark',
          });
          return;
        } 
        else if (parseInt(proximity) <= 0 || parseInt(proximity) > 50)
        {
          toast.error('Proximity is Invalid, Should be (1-50)', {
            autoClose: 3000,
           theme: 'dark',
          });
          return;
        } 

        else if (capacity === '') 
        {
          toast.error('Capacity must be given', {
            autoClose: 3000,
           theme: 'dark',
          });
          return;
        } 
        else if (isNaN(capacity) || parseInt(capacity) !== parseFloat(capacity)) 
        {
          toast.error('Proximity must be an integer', {
            autoClose: 3000,
           theme: 'dark',
          });
          return;
        } 
        else if (parseInt(capacity) <= 0 || parseInt(capacity) > 10000)
        {
          toast.error('Capacity is Invalid, Should be (0-10,000)', {
            autoClose: 3000,
           theme: 'dark',
          });
          return;
        } 
      }

      let uniqueemail = email.toLowerCase();

      const requestBody = {
        name: name,
        email: uniqueemail,
        password: password,
        type: option,
        latitude: locationValue.latitude,
        longitude: locationValue.longitude,
      };
  
      if (option === 'NGO') {
        requestBody.proximity = parseInt(proximity);
        requestBody.capacity = parseInt(capacity);
      }

      // toastId.current = toast(`Attempting to Register as ${option}`,{
      //   theme: 'dark',
      //   type: toast.TYPE.LOADING ,
      // })

      const id = toast.loading(`Attempting to Register as ${option}`,{
        theme: 'dark',
      })
  
      fetch(`/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then(async(data) => {
          console.log(data);
          if (data.success === false) {

            toast.update(id, {
              render: `${data.message}`,
              type: toast.TYPE.ERROR,
              isLoading: false,
              autoClose: true,
          })


          } else {

            toast.update(id, {
              render: `${data.message}`,
              type: toast.TYPE.SUCCESS,
              isLoading: false,
              autoClose: true,
          })

            setTimeout(() => {
              Navigate('/signin', { state: { option: option }});
            }, 2000);
          }
        });
    }
  };

  console.log(locationValue);
  return (
    <div className="font-[Inter]">
      <div className="absolute mx-auto my-[16%] sm:my-[6%]  sm:left-[15%] sm:h-[80%] sm:w-[408px]  md:my-[4%]  md:left-[25%] md:h-[90%] md:w-[408px]  lg:my-[6%]  lg:left-[15%] lg:h-[80%] lg:w-[408px] transform translate(-50%, -50%) w-[100%] h-[100%] bg-white rounded-lg border border-white shadow-md">
        <img
          src={vector2}
          alt="logo"
          className="-mt-6 top-[7px] left-[205px] w-[150px] h-[160px] mx-auto"
        />
        <h1
          className="text-center font-inter italic text-5xl font-bold leading-[10px] tracking-[0em] text-green"
          style={{ fontSize: "35px" }}
        >
          {t('signuptext')}
        </h1>
        <p
          className="text-center mt-[10px] text-base"
          style={{ fontSize: "10px" }}
        >
          {t('signupsubtext')}
        </p>

        <div className="mt-[15px] px-[20px] ">

        <div className="">
          <input
            type="text"
            placeholder={t('snametext')}
            name="name"
            value={name}
            onChange={handleNameChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>

        <div className="">
          <input
            type="email"
            placeholder={t('semailtext')}
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>


        <div className="relative">
          <input
            type="text"
            placeholder={t('slocationtext')}
            name="location"
            value={locationValue ? t('locationaddedtext') : ""}
            onChange={handleLocationChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
            readOnly
          />

          <button className="absolute right-2 top-1 " onClick={() => Navigate(`/location-selection`, {state: {option: option, screenName: "signup"}})}>
            <img src={location} alt="Location Icon" className="w-[19px] h-[20px]" />
          </button>

        </div>

        <div className="">
          <input
            type="password"
            placeholder={t('passwordtext')}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>

        <div className="">
          <input
            type="password"
            placeholder={t('sconfirmpasstext')}
            name="cpassword"
            value={cpassword}
            onChange={handleCPasswordChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>




        {option === "NGO" && (
        <div className="">
          <input
            type="text"
            placeholder={t('sproximity')}
            name="proximity"
            value={proximity}
            onChange={handleProximityChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />

          <input
            type="text"
            placeholder={t('scrisis')}
            name="capacity"
            value={capacity}
            onChange={handleCapacityChange}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>

        

        
        )}

        
        <button
          onClick={handleSubmit}
          className="w-full h-[30px] mt-[15px] bg-green text-white rounded-lg text-lg font-semibold hover:bg-green focus:outline-none"
          style={{ fontSize: "12px" }}
        >
          {t('signuptext')}
        </button>
        </div>
        <p
          className="text-center mt-[4px] text-base"
          style={{ fontSize: "10px" }}
        >
          {t('forgottext')}
        </p>
        <p
          className="text-center mt-[3px] text-base"
          style={{ fontSize: "10px" }}
        >
          {t('signuplasttext')} &nbsp;
          <Link
            className="text-green font-bold "
            style={{ fontSize: "10px" }}
            to={`/signin`} state={{option: option}}
          >
            {t('signuplinktext')}
          </Link>
        </p>
      </div>

      <div className="hidden lg:block fixed top-0 w-[100%] h-[100px] mt-[100px] ml-[-180px]   md:top-[]  lg:left-[79%] flex justify-end items-center">
        <div className="text-green mr-8">
          <p
            className=" text-8xl font-extrabold leading-[17px]  ml-[-50px] text-left text-green"
            style={{
              fontSize: "80px",
              fontWeight: 800,
              lineHeight: "157px",
              letterSpacing: "0em",
            }}
          >
            رزق راہی
          </p>
          <p
            className="text-4xl font-normal leading-[9px] ml-[-70px]"
            style={{ fontSize: "30px" }}
          >
            <span className="text-black ">From </span>People{" "}
            <span className="text-black">To </span>People
          </p>
        </div>
      </div>

      <div className="hidden lg:block sm:right-[] md:top-[] md:right-[2%] lg:right-[18%] fixed bottom-[25px] right-[80px] mb-1">
        <img src={vector} alt='' className="w-auto h-[295px]" />
      </div>
      
      {/* {console.log(formData)} */}
    </div>
  );
};







