import React, { useState, useRef} from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import mapMarker from '../assets/Marker.png';
import MapStyle from '../styles/MapStyle';
import { toast } from 'react-toastify';
import '../styles/MapItemStyles.css';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';

const LocationSelection = () => {

  const navigate = useNavigate();
  const locationdata = useLocation();
  const data = locationdata.state;

  const option = data.option;
  const screenName = data.screenName;

  const { isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const initialLocation = {
    lat: 33.6844, // Islamabad latitude
    lng: 73.0479, // Islamabad longitude
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const mapRef = useRef(null);

  const handleMapClick = (e) => {
    panToLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          panToLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  const loadMap = () => {
    return (
      <GoogleMap
      center={selectedLocation}
      zoom={13}
      mapContainerStyle={{ height: '94%', width: '100%' }}
      onClick={handleMapClick}
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
      <MarkerF
        position={selectedLocation}
        icon={{
          url: mapMarker,
        }}
      />
    </GoogleMap>
    );
  };

  const panToLocation = (location) => {
    setSelectedLocation(location);

    if (mapRef.current) {
      const newPosition = new window.google.maps.LatLng(location.lat, location.lng);
      mapRef.current.getCenter().equals(newPosition) ||
        mapRef.current.panTo(newPosition);
    }
  };

  const handleConfirmLocation = () => {
    toast.success('Location Confirmed!', {
      theme: 'dark',
      autoClose: 2000,
    });
  
    setTimeout(() => {
      if(screenName === 'signup'){
        navigate(`/signup`, {
          state: {
            option: option,
            coordinates: { latitude: selectedLocation.lat, longitude: selectedLocation.lng },
          },
        });
        
      }
      else{
        navigate(`/crisis`, {
          state: {
            coordinates: { latitude: selectedLocation.lat, longitude: selectedLocation.lng },
          },
        });
      }
    }, 2000);
    
  };

  


  return (
    <div style={{ height: '100vh', width: '100%' }}>

      {isLoaded ? 
      (
        loadMap()
      ) 
      : 
      (
        <div className="loadingMap">
        <h1>Loading Map...</h1>
        </div>
      )}


      <div className="currentLocationButton">
        <button onClick={requestLocationPermission}>
          <FontAwesomeIcon icon={faLocationCrosshairs} size='lg' />
        </button>
      </div>


        <div className="confirmationPopup" onClick={() => handleConfirmLocation()}>
          <button style={{ color: 'white'  }} >
            <FontAwesomeIcon icon={faLocationCrosshairs} size='lg' spin color='white' />
            &nbsp; <b>Confirm Location</b>
          </button>
        </div>
      
    </div>
  );
};

export default LocationSelection;
