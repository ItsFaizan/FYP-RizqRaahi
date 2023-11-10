import React, { useState, useRef, useEffect} from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import donoBox from '../assets/donoBox.png';
import MapStyle from '../styles/MapStyle';
// import { toast } from 'react-toastify';
import '../styles/MapItemStyles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import CustomModal from './CustomModal';
import ReactLoading from 'react-loading';


const MainMap = () => {

    const navigate = useNavigate();
    const locationdata = useLocation();
    const data = locationdata.state;

    const [selectedMarker, setSelectedMarker] = useState(null); // State for the selected marker
    const [showMarkerDetails, setShowMarkerDetails] = useState(false); // State for showing marker details popup
    const [markers, setMarkers] = useState([]); // Store markers data from the server
    const socket = useRef(null);

    const mapRef = useRef(null);
  
    const token = data.token;

    const { isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    
    const initialLocation = {
        lat: 33.6844, // Islamabad latitude
        lng: 73.0479, // Islamabad longitude
    };

    useEffect(() => {

    
        console.log('initiating socket communication ');
    
        // Connect to the Socket.io server when the component mounts
        socket.current = io("http://localhost:3001", {
          auth: { token },
        });
    
        
        socket.current.emit('getMarkers');
    
        socket.current.on('getMarkers', (data) => {
          setMarkers(data);
        });
    
        socket.current.on('updateMap', (data) => {
          setMarkers((prevMarkers) => [...prevMarkers, data]);
    
          console.log('updateMap: ', markers);
        });
    
    
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


  const loadMap = () => {
    return (
      <GoogleMap
      center={initialLocation}
      zoom={13}
      mapContainerStyle={{ height: '100%', width: '100%' }}
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
    </GoogleMap>
    );
  };



  return (
    <div style={{ height: '100vh', width: '100%' }}>

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
            ['Amount', `${selectedMarker?.donationAnnouncement.amount}`],
            ['Type', `${selectedMarker?.donationAnnouncement.amountType}`],
            ['Description', `${selectedMarker?.donationAnnouncement.description}`],
          ],
        }}
        textColors={
          [`${selectedMarker?.donationAnnouncement.isFresh ? '#33FF57' : '#FF5733'}`,
          `${selectedMarker?.donationAnnouncement.isPerishable ? '#33FF57' : '#FF5733'}`,
          `${selectedMarker?.donationAnnouncement.isCooked ? '#33FF57' : '#FF5733'}`]

        }
        buttonLabels={['Claim Donation']}
        onButtonPress={async(buttonLabel) => {
          socket.current.emit('ClaimDonation', selectedMarker);
          setTimeout(() => {
            navigate('/claimdonation');
            console.log("Navigating to Claim Donation")
            }, 1500);
        }}
        
      />

    </div>
  );


};

export default MainMap;