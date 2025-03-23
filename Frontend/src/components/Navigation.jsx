import React, { useState, useEffect, useRef } from 'react';

const Navigation = () => {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [error, setError] = useState('');
  const [eta, setEta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Create refs for autocomplete instances
  const userMarkerRef = useRef(null);
  const retryCountRef = useRef(0);

  // Define destination coordinates
  const destination = {
    lat: 18.6517,
    lng: 73.7616
  };

  // Initialize Google Maps with Pro API
  useEffect(() => {
    // Load Google Maps Script with premium plan parameters
    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyAj1yuRdak1TF_O2UzcMz0ewNfhB2NHGgI&libraries=places&v=weekly&channel=GMAPS_PRO&client=gme-yourclientid`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
      // Clean up geolocation watch
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const initMap = () => {
    // Create map with advanced options for better performance
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 18.6517, lng: 73.7616 }, // Center on destination
      zoom: 12,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      optimized: true
    });

    // Set up directions service with traffic model enabled
    const directionsServiceInstance = new window.google.maps.DirectionsService();
    
    // Create a directions renderer with custom styling
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeWeight: 6,
        strokeOpacity: 0.8
      }
    });

    setMap(mapInstance);
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);
    
    // Get initial location and start navigation
    getCurrentLocation();
  };

  const calculateRoute = (startLocation) => {
    if (!startLocation) {
      setError('Unable to determine start location');
      return;
    }

    setError('');
    setIsLoading(true);
    
    const now = new Date();
    
    directionsService.route(
      {
        origin: startLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: now,
          trafficModel: window.google.maps.TrafficModel.BEST_GUESS
        },
        provideRouteAlternatives: true,
        optimizeWaypoints: true
      },
      (response, status) => {
        setIsLoading(false);
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          
          // Extract ETA information
          const route = response.routes[0];
          const leg = route.legs[0];
          setEta({
            distance: leg.distance.text,
            duration: leg.duration.text,
            durationInTraffic: leg.duration_in_traffic ? 
              leg.duration_in_traffic.text : leg.duration.text
          });
          
          // Fit map to route bounds
          const bounds = new window.google.maps.LatLngBounds();
          route.overview_path.forEach(point => bounds.extend(point));
          map.fitBounds(bounds);
        } else {
          setError('Directions request failed: ' + status + '. Please try again.');
        }
      }
    );
  };

  const startNavigation = () => {
    if (!currentPosition) {
      setError('Unable to get your current location');
      return;
    }

    setError('');
    setIsNavigating(true);
    retryCountRef.current = 0;
    
    // Start watching position
    startWatchingPosition();
  };
  
  const startWatchingPosition = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      
      try {
        const id = navigator.geolocation.watchPosition(
          (position) => {
            setIsLoading(false);
            retryCountRef.current = 0;
            
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentPosition(userLocation);
            
            map.setCenter(userLocation);
            map.setZoom(17);
            
            updateUserMarker(userLocation, position.coords.heading);
            
            // Calculate route with current position
            calculateRoute(userLocation);
          },
          (geoError) => {
            console.error("Geolocation error:", geoError);
            
            if (geoError.code === 3) {
              retryGeolocation();
            } else {
              setIsLoading(false);
              
              let errorMsg = "Unable to access your location. ";
              
              if (geoError.code === 1) {
                errorMsg += "Please allow location access in your browser settings.";
              } else if (geoError.code === 2) {
                errorMsg += "Position unavailable. Check your device's GPS or try again later.";
              }
              
              setError(errorMsg);
              
              if (retryCountRef.current >= 3) {
                stopNavigation();
              }
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 15000 + (retryCountRef.current * 5000),
            maximumAge: 0
          }
        );
        
        setWatchId(id);
      } catch (e) {
        setIsLoading(false);
        setError("Error starting navigation: " + e.message);
        stopNavigation();
      }
    } else {
      setError('Geolocation is not supported by this browser.');
      stopNavigation();
    }
  };
  
  const retryGeolocation = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    
    retryCountRef.current += 1;
    
    if (retryCountRef.current <= 3) {
      setError(`Location timed out. Retrying... (${retryCountRef.current}/3)`);
      setTimeout(() => {
        if (isNavigating) {
          startWatchingPosition();
        }
      }, 1000);
    } else {
      setIsLoading(false);
      setError("Location detection failed after multiple attempts. Please check your GPS settings and try again.");
      stopNavigation();
    }
  };

  const updateUserMarker = (position, heading) => {
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
    }
    
    const icon = {
      path: heading ? window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW : 
                     window.google.maps.SymbolPath.CIRCLE,
      scale: heading ? 6 : 8,
      fillColor: '#4285F4',
      fillOpacity: 1,
      strokeColor: 'white',
      strokeWeight: 2,
      rotation: heading || 0
    };
    
    userMarkerRef.current = new window.google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      zIndex: 999
    });
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setIsLoading(false);
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    retryCountRef.current = 0;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          map.setCenter(currentLocation);
          map.setZoom(15);
          
          updateUserMarker(currentLocation);
          setCurrentPosition(currentLocation);
          
          // Start navigation automatically
          startNavigation();
        },
        (error) => {
          setIsLoading(false);
          
          let errorMsg = "Unable to access your location. ";
          
          if (error.code === 1) {
            errorMsg += "Please allow location access in your browser settings.";
          } else if (error.code === 2) {
            errorMsg += "Position unavailable. Check your device's GPS or try again later.";
          } else if (error.code === 3) {
            errorMsg += "Location request timed out. Please try again.";
          }
          
          setError(errorMsg);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
        }
      );
    } else {
      setIsLoading(false);
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="navigation-app">
      <div className="controls">
        <div className="button-group">
          {!isNavigating ? (
            <button 
              onClick={startNavigation} 
              disabled={isLoading}
              className="primary-btn"
            >
              {isLoading ? 'Loading...' : 'Start Navigation'}
            </button>
          ) : (
            <button 
              onClick={stopNavigation} 
              className="stop-btn"
            >
              Stop Navigation
            </button>
          )}
        </div>
        
        {error && <div className="error">{error}</div>}
        
        {eta && (
          <div className="navigation-info">
            <p><strong>Distance:</strong> {eta.distance}</p>
            <p><strong>Estimated Time:</strong> {eta.durationInTraffic}</p>
            {isNavigating && <p><strong>Status:</strong> {isLoading ? 'Acquiring location...' : 'Navigating'}</p>}
          </div>
        )}
      </div>
      
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      
      <style jsx>{`
        .navigation-app {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .controls {
          margin-bottom: 20px;
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        
        button {
          padding: 10px 15px;
          background-color: #4285F4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          min-height: 40px;
          min-width: 120px;
        }
        
        .primary-btn {
          background-color: #4285F4;
        }
        
        .primary-btn:hover {
          background-color: #3367D6;
        }
        
        .stop-btn {
          background-color: #EA4335;
        }
        
        .stop-btn:hover {
          background-color: #D32F2F;
        }
        
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .error {
          color: #EA4335;
          margin-top: 10px;
          font-weight: bold;
          padding: 8px;
          background-color: #FFEBEE;
          border-radius: 4px;
        }
        
        .navigation-info {
          margin-top: 10px;
          padding: 10px;
          background-color: #e8f0fe;
          border-radius: 4px;
        }
        
        #map {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Navigation;