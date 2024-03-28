import React, { useState, useRef, useEffect} from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import donoBox from '../assets/donoBox.png';
import MapStyle from '../styles/MapStyle';
// import { toast } from 'react-toastify';
import '../styles/MapItemStyles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import CustomModal from './CustomModal';
import RecommendationModal from './RecommendationModal';
import ReactLoading from 'react-loading';
import Sidebar from './Sidebar/Sidebar';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


const MainMap = () => {

    const navigate = useNavigate();
    const locationdata = useLocation();
    const data = locationdata.state;
    const { t, i18n } = useTranslation();

    const leftplacement = i18n.language == 'en' ? '43.5%' : '45%';

    const [selectedMarker, setSelectedMarker] = useState(null); // State for the selected marker
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    const [showMarkerDetails, setShowMarkerDetails] = useState(false); // State for showing marker details popup
    const [showRecommendationDetails, setShowRecommendationDetails] = useState(false);
    const [markers, setMarkers] = useState([]); // Store markers data from the server
    const [recommendations, setRecommendations] = useState([]);
    const socket = useRef(null);

    const mapRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
  
    const token = data.token;

    const { isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['geometry'],
    });
    
    const initialLocation = {
        lat: 33.6844, // Islamabad latitude
        lng: 73.0479, // Islamabad longitude
    };

    const animateMapTo = (targetLatLng, duration) => {
      const startLatLng = mapRef.current.getCenter();
      const startTimestamp = performance.now();

      function animate(timestamp) {
          const elapsed = timestamp - startTimestamp;
          const progress = elapsed / duration;
          if (progress < 1) {
              const newLatLng = window.google.maps.geometry.spherical.interpolate(startLatLng, targetLatLng, progress);
              mapRef.current.panTo(newLatLng);
              requestAnimationFrame(animate);
          } else {
              mapRef.current.panTo(targetLatLng);
          }
      }

      requestAnimationFrame(animate);
  };

    
    useEffect(() => {

    
        console.log('initiating socket communication ');
    
        // Connect to the Socket.io server when the component mounts
        socket.current = io("http://localhost:3001", {
          auth: { token },
        });
    
        
        
    
        socket.current.on('getMarkers', (data) => {
          setMarkers(data);
        });
    
        socket.current.on('updateMap', (data) => {
          setMarkers((prevMarkers) => [...prevMarkers, data]);
    
          console.log('updateMap: ', markers);
        });
    
        socket.current.on('RemoveMarker', (data) => {
          console.log("Map Removal Called");
          setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== data));
        });
  
        socket.current.on('ClaimCompleted', () => {
          toast.success('Donation Claimed Successfully', {
            autoClose: 3000,
            theme: 'dark',
          });
  
          setTimeout(() => {
            navigate('/claimdonation');
          }, 1500);
        });
  
        socket.current.on('ClaimFailed', (data) => {
          toast.error(data, {
            autoClose: 3000,
            theme: 'dark',
          });
          closeMarkerDetails();
        });
  
        socket.current.emit('getMarkers');
        return () => {
          socket.current.disconnect();
        };
      }, []);

        // Function to handle marker tap and show details
  const handleMarkerTap = (marker) => {
    setSelectedMarker(marker);
    setShowMarkerDetails(true);
  };

  // Function to close the marker details popup
  const closeMarkerDetails = () => {
    setSelectedMarker(null);
    setShowMarkerDetails(false);
  };

    // Function to close the recommendation details popup
    const closeRecommendationDetails = () => {
      setSelectedRecommendation(null);
      setShowRecommendationDetails(false);
    };

    const getRecommendationDetails = async() => {

      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/rankrestaurants', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (data.success === true) {
        // console.log(data.rankings);
        setRecommendations(data.rankings);
        return data.rankings;
      } else {
          toast.error(`${data.message}`, {
            autoClose: 3000,
            theme: 'dark',
          });
  
        return null;
      }
    };



    const getRecommendations = async() => {

      const rankings = await getRecommendationDetails();
  
      if (rankings) {
        initializeRecommendation(rankings);
      }
    };

    const initializeRecommendation = (rankings) => {

      if (mapRef.current) {
        const newCenter = { lat: rankings[0].details.latitude, lng: rankings[0].details.longitude };
        animateMapTo(newCenter, 500);
  
        setTimeout(() => {
          setCurrentIndex(0);
          setSelectedRecommendation(rankings[0].details);
          setShowRecommendationDetails(true);
        }, 1000);
  
      }
  };

  const traverseRecommendations = (index) => {

    if (recommendations) {

      closeRecommendationDetails();
      setCurrentIndex(index);

      if (mapRef.current) {
        const newCenter = { lat: recommendations[index].details.latitude, lng: recommendations[index].details.longitude };
        animateMapTo(newCenter, 500);

  
        setTimeout(() => {
          setSelectedRecommendation(recommendations[index].details);
          setShowRecommendationDetails(true);
        }, 1100);
  
      }
    }
  }


  const loadMap = () => {
    return (

      
      <GoogleMap
      center={initialLocation}
      zoom={13}
      mapContainerStyle={{ height: '100%', width: '100%'  }}   
      options={{
        styles: MapStyle,
        streetViewControlOptions: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        mapTypeControlOptions: false,
        
      }}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
    {markers.map((marker) => (
      <MarkerF
        key={marker.id}
        position={{lat: marker.latitude, lng: marker.longitude}}
        icon={{
          url: donoBox,
        }}

        title={marker.title}
        onClick={() => handleMarkerTap(marker)}
        />
    ))}
    <Sidebar/>

    <button 
    style={{ 
      position: 'absolute', 
      top: "5%", 
      left: leftplacement,
      backgroundColor: '#1ECF5A',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      padding: 10,
      color: 'white',
      fontWeight: 'bold', 
      zIndex: 1000, }}
      onClick={() => getRecommendations()}
    >
      
      {t("getrecommendationsword")}
    </button>
    
    </GoogleMap>
   
    );
  };



  return (
    <div  style={{ height: '100vh', width: '100%' , zIndex: 999 }}>



    {isLoaded ? 
    (
      loadMap()
    ) 
    : 
    (
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <ReactLoading type={'spin'} color={'black'} width={64} height={64} />
    </div>
    )}

    <CustomModal
        visible={showMarkerDetails}
        closeModal={closeMarkerDetails}
        animationType="slide"
        transparent={true}
        tableData={{
          rows: [
            [t("amountword"), `${selectedMarker?.donationAnnouncement.amount}`],
            [t("typeword"), `${selectedMarker?.donationAnnouncement.amountType == "KG" ? t("KGword") : t("Unitword")}`],
            [t("descriptionword"), `${selectedMarker?.donationAnnouncement.description}`],
          ],
        }}
        textColors={
          [`${selectedMarker?.donationAnnouncement.isFresh ? '#33FF57' : '#FF5733'}`,
          `${selectedMarker?.donationAnnouncement.isPerishable ? '#33FF57' : '#FF5733'}`,
          `${selectedMarker?.donationAnnouncement.isCooked ? '#33FF57' : '#FF5733'}`]

        }
        buttonLabels={[t("claimdonationword")]}
        onButtonPress={async(buttonLabel) => {
          socket.current.emit('ClaimDonation', selectedMarker);
          // setTimeout(() => {
          //   navigate('/claimdonation');
          //   console.log("Navigating to Claim Donation")
          //   }, 1500);
        }}
        
      />

    <RecommendationModal
        visible={showRecommendationDetails}
        closeModal={closeRecommendationDetails}
        animationType="slide"
        transparent={true}
        headerdetails={selectedRecommendation?.donationAnnouncement.announcedByRelation.name}
        tableData={{
          rows: [
            [t("amountword"), `${selectedRecommendation?.donationAnnouncement.amount}`],
            [t("typeword"), `${selectedRecommendation?.donationAnnouncement.amountType == "KG" ? t("KGword") : t("Unitword")}`],
            [t("amountword"), `${selectedRecommendation?.donationAnnouncement.description}`],
          ],
        }}
        textColors={
          [`${selectedRecommendation?.donationAnnouncement.isFresh ? '#33FF57' : '#FF5733'}`,
          `${selectedRecommendation?.donationAnnouncement.isPerishable ? '#33FF57' : '#FF5733'}`,
          `${selectedRecommendation?.donationAnnouncement.isCooked ? '#33FF57' : '#FF5733'}`]

        }
        buttonLabels={[t("claimdonationword")]}
        onButtonPress={async(buttonLabel) => {
          socket.current.emit('ClaimDonation', selectedRecommendation);
        }}
        onButtonPressLeftArrow={async() => {
          // console.log("Left Arrow Pressed");
          traverseRecommendations(currentIndex - 1);
        }}
        onButtonPressRightArrow={async() => {
          traverseRecommendations(currentIndex + 1);
        }}
        currentIndex={currentIndex}
        indexLimit={recommendations.length}
      />

    </div>
  );


};

export default MainMap;