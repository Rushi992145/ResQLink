import React, { useState, useEffect } from 'react';

const Navigation = ({longitude,lattitude}) => {

  const [currentPosition, setCurrentPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define the destination coordinates
  const destination = {
    lat: parseFloat(lattitude),
    lng: parseFloat(longitude)
};

  console.log("current position",currentPosition,"disaster position",destination);
  // Format destination coordinates for display
  const formatDestination = () => {
    return `Lat: ${destination.lat.toFixed(4)}, Lng: ${destination.lng.toFixed(4)}`;
  };

  // Initialize Google Maps and services
  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyVdMLfKsY88s5IHijDyH68MEbyEFht-4DW&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    script.onerror = () => {
      setError('Failed to load Google Maps API');
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Initialize map
  const initMap = () => {
    try {
      // Create map instance with destination center
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: destination,
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
      });

      // Create directions service and renderer
      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: false,
      });

      setMap(mapInstance);
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);

      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentPosition(pos);
            mapInstance.setCenter(pos);
            setIsLoading(false);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setError('Unable to get your location. Please check your GPS settings.');
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        setError('Your browser doesn\'t support geolocation.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Map initialization error:', error);
      setError('Failed to initialize map');
      setIsLoading(false);
    }
  };

  // Calculate and display route when current position is available
  useEffect(() => {
    if (directionsService && directionsRenderer && currentPosition) {
      calculateRoute();
    }
  }, [directionsService, directionsRenderer, currentPosition]);

  // Function to calculate route
  const calculateRoute = () => {
    directionsService.route(
      {
        origin: currentPosition,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          const leg = route.legs[0];
          setRouteInfo({
            distance: leg.distance.text,
            duration: leg.duration.text,
          });
          setError(null);
        } else {
          setError(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium">{formatDestination()}</p>
          </div>
          <div className="text-right">
            {routeInfo.distance && routeInfo.duration && (
              <>
                <p className="text-lg font-bold">{routeInfo.distance}</p>
                <p className="text-sm text-gray-500">{routeInfo.duration}</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div 
        id="map" 
        className="w-full h-64 md:h-96 rounded shadow-md" 
        style={{ width: '100%', height: '400px' }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;