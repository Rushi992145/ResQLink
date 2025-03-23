import React, { useState, useEffect, useRef } from 'react';

const Navigation = () => {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
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
  const startAutocompleteRef = useRef(null);
  const endAutocompleteRef = useRef(null);
  const userMarkerRef = useRef(null);
  const retryCountRef = useRef(0);

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
      center: { lat: 37.7749, lng: -122.4194 },
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

    // Initialize autocomplete with specific properties for accuracy
    initializeAutocomplete();
    
    // Try to get initial location
    getCurrentLocation(false);
  };

  const initializeAutocomplete = () => {
    // Enhanced autocomplete for start input
    const startAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('start-input'),
      {
        types: ['address'],
        fields: ['place_id', 'formatted_address', 'geometry', 'name']
      }
    );
    
    // Enhanced autocomplete for end input
    const endAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('end-input'),
      {
        types: ['address'],
        fields: ['place_id', 'formatted_address', 'geometry', 'name']
      }
    );

    startAutocompleteRef.current = startAutocomplete;
    endAutocompleteRef.current = endAutocomplete;

    startAutocomplete.addListener('place_changed', () => {
      const place = startAutocomplete.getPlace();
      if (!place.geometry) {
        setError("Please select a location from the dropdown");
        return;
      }
      setStartPoint(place.formatted_address || place.name);
      setError('');
      
      // Center map on selected start location
      if (place.geometry.location) {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }
    });

    endAutocomplete.addListener('place_changed', () => {
      const place = endAutocomplete.getPlace();
      if (!place.geometry) {
        setError("Please select a location from the dropdown");
        return;
      }
      setEndPoint(place.formatted_address || place.name);
      setError('');
    });
  };

  const calculateRoute = () => {
    if (!startPoint || !endPoint) {
      setError('Please enter both start and end points');
      return;
    }

    setError('');
    setIsLoading(true);
    
    // Fallback to geocoding if place objects aren't available
    const geocoder = new window.google.maps.Geocoder();
    let startLocation, endLocation;
    
    // Get place objects from autocomplete
    const startPlace = startAutocompleteRef.current?.getPlace();
    const endPlace = endAutocompleteRef.current?.getPlace();
    
    // If we have the geometry from autocomplete, use it directly
    if (startPlace?.geometry?.location) {
      startLocation = startPlace.geometry.location;
      processRoute();
    } else {
      // Otherwise geocode the address
      geocoder.geocode({ address: startPoint }, (results, status) => {
        if (status === 'OK' && results[0]) {
          startLocation = results[0].geometry.location;
          processRoute();
        } else {
          setIsLoading(false);
          setError('Could not find start location. Please try a different address.');
        }
      });
    }
    
    function processRoute() {
      if (endPlace?.geometry?.location) {
        endLocation = endPlace.geometry.location;
        requestDirections();
      } else {
        geocoder.geocode({ address: endPoint }, (results, status) => {
          if (status === 'OK' && results[0]) {
            endLocation = results[0].geometry.location;
            requestDirections();
          } else {
            setIsLoading(false);
            setError('Could not find end location. Please try a different address.');
          }
        });
      }
    }
    
    function requestDirections() {
      // Get current date for departureTime
      const now = new Date();
      
      directionsService.route(
        {
          origin: startLocation,
          destination: endLocation,
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
            setError('Directions request failed: ' + status + '. Please check your addresses and try again.');
          }
        }
      );
    }
  };

  const startNavigation = () => {
    if (!startPoint || !endPoint) {
      setError('Please enter both start and end points');
      return;
    }

    setError('');
    setIsNavigating(true);
    retryCountRef.current = 0;
    
    // First attempt to get current position
    startWatchingPosition();
  };
  
  const startWatchingPosition = () => {
    // Start tracking user's location with retry mechanism
    if (navigator.geolocation) {
      // Show loading indicator
      setIsLoading(true);
      
      try {
        const id = navigator.geolocation.watchPosition(
          (position) => {
            // Success handler
            setIsLoading(false);
            retryCountRef.current = 0; // Reset retry counter on success
            
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentPosition(userLocation);
            
            // Update map to center on user's current location
            map.setCenter(userLocation);
            map.setZoom(17); // Closer zoom for navigation
            
            // Update user marker
            updateUserMarker(userLocation, position.coords.heading);
            
            // Update route based on current position
            updateRoute(userLocation);
          },
          (geoError) => {
            // Error handler
            console.error("Geolocation error:", geoError);
            
            if (geoError.code === 3) { // TIMEOUT
              retryGeolocation();
            } else {
              setIsLoading(false);
              
              // Provide more user-friendly error messages
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
            // Gradually increase timeout for better chances of success
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
    // Clear previous watch
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    
    // Increment retry counter
    retryCountRef.current += 1;
    
    if (retryCountRef.current <= 3) {
      setError(`Location timed out. Retrying... (${retryCountRef.current}/3)`);
      // Wait a moment before retrying
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
    // Remove previous marker if exists
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
    }
    
    // Create new marker with direction indicator if heading is available
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
      zIndex: 999 // Keep user marker on top
    });
  };

  const updateRoute = (currentPosition) => {
    const now = new Date();
    
    // Geocode end point if needed
    const endPlace = endAutocompleteRef.current?.getPlace();
    
    if (endPlace?.geometry?.location) {
      calculateUpdatedRoute(endPlace.geometry.location);
    } else {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: endPoint }, (results, status) => {
        if (status === 'OK' && results[0]) {
          calculateUpdatedRoute(results[0].geometry.location);
        } else {
          setError('Could not find end location. Please try a different address.');
        }
      });
    }
    
    function calculateUpdatedRoute(endLocation) {
      directionsService.route(
        {
          origin: { lat: currentPosition.lat, lng: currentPosition.lng },
          destination: endLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: now,
            trafficModel: window.google.maps.TrafficModel.BEST_GUESS
          },
          provideRouteAlternatives: false
        },
        (response, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
            
            // Update ETA information
            const route = response.routes[0];
            const leg = route.legs[0];
            setEta({
              distance: leg.distance.text,
              duration: leg.duration.text,
              durationInTraffic: leg.duration_in_traffic ? 
                leg.duration_in_traffic.text : leg.duration.text
            });
            
            // Check if reached destination (within ~30 meters)
            if (leg.distance.value < 30) {
              setError('You have reached your destination!');
              stopNavigation();
            }
          } else {
            console.error("Route update failed:", status);
            // Don't show error on every failed update
            // Only show if it's not already navigating properly
            if (!currentPosition) {
              setError('Unable to update route. Please check your network connection.');
            }
          }
        }
      );
    }
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setIsLoading(false);
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const getCurrentLocation = (setAsStart = true) => {
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
          
          // Update map
          map.setCenter(currentLocation);
          map.setZoom(15);
          
          // Show user's position on map
          updateUserMarker(currentLocation);
          
          console.log("Current location is : ",currentLocation)
          // Only set as start point if requested
          if (setAsStart) {
            // Reverse geocode to get address
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: currentLocation }, (results, status) => {
              if (status === 'OK' && results[0]) {
                setStartPoint(results[0].formatted_address);
                setError('');
              } else {
                setError('Could not determine your address. Using coordinates instead.');
                setStartPoint(`${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`);
              }
            });
          }
        },
        (error) => {
          setIsLoading(false);
          
          // Provide user-friendly error messages
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
        <div className="input-group">
          <label htmlFor="start-input">Start Point:</label>
          <div className="input-with-button">
            <input
              id="start-input"
              type="text"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              placeholder="Enter start location"
              disabled={isNavigating}
            />
            <button 
              onClick={() => getCurrentLocation(true)} 
              disabled={isNavigating}
              className="location-btn"
              title="Use current location"
            >
              📍
            </button>
          </div>
        </div>
        
        <div className="input-group">
          <label htmlFor="end-input">End Point:</label>
          <input
            id="end-input"
            type="text"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            placeholder="Enter destination"
            disabled={isNavigating}
          />
        </div>
        
        <div className="button-group">
          <button 
            onClick={calculateRoute} 
            disabled={isNavigating || isLoading} 
            className="primary-btn"
          >
            {isLoading && !isNavigating ? 'Loading...' : 'Show Route'}
          </button>
          
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
        
        .input-group {
          margin-bottom: 10px;
        }
        
        .input-with-button {
          display: flex;
          gap: 8px;
        }
        
        .input-with-button input {
          flex: 1;
        }
        
        .location-btn {
          width: 40px;
          height: 40px;
          padding: 0;
          font-size: 20px;
          background-color: #4285F4;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          height: 40px;
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