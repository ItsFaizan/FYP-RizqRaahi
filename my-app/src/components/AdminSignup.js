import React, { useState, useEffect, useRef} from "react";
import vector from "../assets/img1-removebg-preview.png";
import vector2 from "../assets/_57454385-7184-4a81-b3ca-2734fb9f043e.jpeg";
import location from "../assets/location2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useTranslation } from "react-i18next";


export const AdminSignup = () => {

  const { t } = useTranslation();
  const Navigate = useNavigate();
  const [id, setID] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [cpass, setCpass] = useState('');

  // const [images, setImages] = useState(Array(4).fill(null));
  const [isImagedAdded, setIsImageAdded] = useState(false);


  const [imageUrls, setImageUrls] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const cropperRef = useRef();

  const containerSize = { width: 50, height: 50}; // Set your desired fixed container size

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];

    if (file) {
      const newImageUrls = [...imageUrls];
      newImageUrls[index] = URL.createObjectURL(file);
      setImageUrls(newImageUrls);
      setSelectedImageIndex(index);
      setIsImageAdded(true);
    }
  };

  const handleOnInitialized = (cropper) => {
    cropperRef.current = cropper;
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedImage = croppedCanvas.toDataURL();
        const newCroppedImages = [...croppedImages];
        newCroppedImages[selectedImageIndex] = croppedImage;
        setCroppedImages(newCroppedImages);
        setSelectedImageIndex(null);
      }
    }
  };

  const handlePlusClick = (index) => {
    if (selectedImageIndex === index) {
      // Handle click for the currently selected image
      handleCrop();
    } else {
      // Set the selected image index for cropping
      setSelectedImageIndex(index);
    }
  };




  // useEffect(() => {
  //   (async () => {
  //     // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== 'granted') {
  //       toast.show("Media Permission is essential for applying to Rizq Raahi", {
  //         type: "danger",
  //         });
  //     }
  //   })();
  // }, []);


  const handleSignup = async() => 
  {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


     if (id == '' || email == '' ||  password == '' || cpass == '') {
        toast.error('Please fill all the fields', {
          autoClose: 3000,
         theme: 'dark',
      });

    }
    else if (!emailRegex.test(email)) {
      toast.error('Invalid Email', {
        autoClose: 3000,
       theme: 'dark',
    });

    }else if (password.length < 8) {
      toast.error('Password must be atleast 8 characters long', {
        autoClose: 3000,
       theme: 'dark',
    });
    


    } 
    else if (password != cpass) {
      
      toast.error('Passwords do not match', {
        autoClose: 3000,
       theme: 'dark',
    });

    }
    else if (isImagedAdded == false) {
      toast.error('Atleast 1 Image is Required as Proof', {
        autoClose: 3000,
       theme: 'dark',
    });
  
    }
    

    else {
    

      var actualImages = croppedImages.filter((image) => image != null);
    //  console.log(actualImages);
      const formData = new FormData();
      formData.append('userid', id);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('images', actualImages);
      
        console.log("img", actualImages.length);

        croppedImages.forEach(async (image, index) => {
      
            console.log(image.type);
            
            const imageTypeArray = image.type.split('/');
            console.log(imageTypeArray);
            const fileType = imageTypeArray[1]; // "png"
            const base64Data = imageTypeArray[1]; // Base64-encoded data
            console.log(fileType);  
            if (fileType) { // Check if fileType is defined
              formData.append(`image${index + 1}`, image, `image${index + 1}.${fileType}`);
            }
          
        });
    
      for (var key of formData.entries()) {
        console.log("data:",key[0] + ', ' + JSON.stringify(key[1]));

    }
     
      //  toast.loading(`Attempting to Register as Admin`,{
      //   theme: 'dark',
      // })
  
  
      fetch(`/applyforsubadmin`, {
        method: 'POST',
        body: formData,
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
            Navigate('/adminlogin');
          }, 2000);
          }
        });
    }
  };

  return (
    <div className="font-[Inter]">
      <div className="absolute mx-auto my-[16%] sm:my-[6%]  sm:left-[15%] sm:h-[80%] sm:w-[408px]  md:my-[4%]  md:left-[25%] md:h-[90%] md:w-[408px]  lg:my-[6%]  lg:left-[15%] lg:h-[80%] lg:w-[408px] transform translate(-50%, -50%) w-[100%] h-[100%] bg-white rounded-lg border border-white shadow-md">
        <img
          src={vector2}
          alt="logo"
          className=" -mt-[24px] top-[7px] left-[205px] w-[150px] h-[160px] mx-auto"
        />
        <h1
          className="text-center text-5xl font-bold leading-[10px] tracking-[0em] text-[#1ECF5A]"
          style={{ fontSize: "35px" }}
        >
          {t("adminapptext")}
        </h1>
        <p
          className="text-center mt-[14px] text-base"
          style={{ fontSize: "10px" }}
        >
          {t("adminappsubtext")}
        </p>

        <div className="mt-[4px] px-[20px] ">

        <div className="">
          <input
            type="text"
            placeholder={t("useridtext")}
            name="id"
            value={id}
            onChange={(text) => setID(text.target.value)}
            className="w-full h-[30px] mb-[4px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>

        <div className="">
          <input
            type="email"
            placeholder={t("emailtext")}
            name="email"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
            className="w-full h-[30px] mb-[4px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>

        <div className="">
      <p className="text-sm text-[#1ECF5A] font-semibold">{t("adminapppictext")}</p>
      <div className="flex mt-1 mx-24">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="mr-2 relative bg-transparent border-2 px-6 py-4 rounded-md">
            <input
              id={`fileInput${index}`}
              type="file"
              className="opacity-0 absolute w-full h-full"
              onChange={(e) => handleImageChange(index, e)}
            />
            <div className="flex items-center justify-center" onClick={() => handlePlusClick(index)}>
              {imageUrls[index] && selectedImageIndex === index ? (
                <Cropper
                  src={imageUrls[index]}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  aspectRatio={1}
                  guides={false}
                  viewMode={1}
                  dragMode="move"
                  autoCropArea={1} // Set to a value less than 1
                  onInitialized={(cropper) => handleOnInitialized(cropper)}
                />
              ) : (
                <React.Fragment>
                  {imageUrls[index] ? (
                    <img
                      src={croppedImages[index] || imageUrls[index]}
                      alt={`Cropped ${index + 1}`}
                      style={{
                        maxWidth: containerSize.width,
                        maxHeight: containerSize.height,
                        borderRadius: '8px',

                      }}
                    />
                  ) : (
                    <span className="text-[#1ECF5A] border-[#1ECF5A] px-2 py-1  border-2 rounded-md text-sm">+</span>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-1 mx-24">
        {[...Array(2)].map((_, index) => (
          <div key={index + 2} className="mr-2 relative bg-transparent border-2 px-6 py-4 rounded-md">
            <input
              id={`fileInput${index + 2}`}
              type="file"
              className="opacity-0 absolute w-full h-full"
              onChange={(e) => handleImageChange(index + 2, e)}
            />
            <div className="flex items-center justify-center" onClick={() => handlePlusClick(index + 2)}>
              {imageUrls[index + 2] && selectedImageIndex === index + 2 ? (
                <Cropper
                  src={imageUrls[index + 2]}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  aspectRatio={1}
                  guides={false}
                  viewMode={1}
                  dragMode="move"
                  autoCropArea={1} // Set to a value less than 1
                  onInitialized={(cropper) => handleOnInitialized(cropper)}
                />
              ) : (
                <React.Fragment>
                  {imageUrls[index + 2] ? (
                    <img
                      src={croppedImages[index + 2] || imageUrls[index + 2]}
                      alt={`Cropped ${index + 3}`}
                      style={{
                        maxWidth: containerSize.width,
                        maxHeight: containerSize.height,
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <span className="text-[#1ECF5A] border-[#1ECF5A] px-2 py-1 border-2 rounded-md text-sm">+</span>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

        <div className=" mt-2">
          <input
            type="password"
            placeholder={t("passwordtext")}
            name="password"
            value={password}
            onChange={(text) => setPassword(text.target.value)}
            className="w-full h-[30px] mb-[4px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>

        <div className="">
          <input
            type="password"
            placeholder={t("sconfirmpasstext")}
            name="cpassword"
            value={cpass}
            onChange={(text) => setCpass(text.target.value)}
            className="w-full h-[30px] mb-[10px] rounded-md p-[10px] bg-gray-100 focus:outline-none focus:border-blue-500"
            style={{ fontSize: "10px" }}
            required
          />
        </div>


        
        <button
          onClick={handleSignup}
          className="w-full h-[30px] mt-[2px] bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none"
          style={{ fontSize: "12px" }}
        >
          {t("adminappsubmittext")}
        </button>
        </div>
        <p
          className="text-center mt-[3px] text-base"
          style={{ fontSize: "10px" }}
        >
          {t("adminapplasttext")} &nbsp;
          <Link
            className="text-[#1ECF5A] font-bold "
            style={{ fontSize: "10px" }}
             to={`/adminlogin`} 
          >
            {t("adminapplink")}
          </Link>
        </p>
      </div>

      <div className="hidden lg:block fixed top-0 w-[100%] h-[100px] mt-[100px] ml-[-180px]   md:top-[]  lg:left-[79%] flex justify-end items-center">
        <div className="text-[#1ECF5A] mr-8">
          <p
            className=" text-8xl font-extrabold leading-[17px] -ml-10 text-left text-green"
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

      <div className="hidden lg:block sm:right-[] md:top-[] md:right-[2%] lg:right-[9%] fixed bottom-[25px] right-[80px]">
        <img src={vector} alt='' className="w-[550px] h-[295px]" />
      </div>
      
      {/* {console.log(formData)} */}
    </div>
  );
};
