import React, { useState, useEffect } from 'react';

const Navigation = ({ longitude, latitude, volunteerLocations }) => {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const destination = {
    lat: Number.isFinite(parseFloat(latitude)) ? parseFloat(latitude) : 0,
    lng: Number.isFinite(parseFloat(longitude)) ? parseFloat(longitude) : 0,
  };

  useEffect(() => {
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

  const initMap = () => {
    try {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: destination,
        zoom: 14,
      });

      const disasterMarker = new window.google.maps.Marker({
        position: destination,
        map: mapInstance,
        animation: window.google.maps.Animation.DROP,
        title: `Disaster Location (${destination.lat.toFixed(6)}, ${destination.lng.toFixed(6)})`,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      });

      // Add markers for volunteer locations
      volunteerLocations.forEach((location) => {
        const volunteerMarker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance,
          title: `Volunteer Location (${location.lat}, ${location.lng})`,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        });

        const infoWindow = new window.google.maps.InfoWindow({
            content: `<div style="width: 80%; text-align: center; font-family: Arial, sans-serif;">
                        <h3>Destination</h3>
                        <p>Coordinates: ${destination.lat.toFixed(6)}, ${destination.lng.toFixed(6)}</p>
                      </div>`,
          });          

        volunteerMarker.addListener('click', () => {
          infoWindow.open(mapInstance, volunteerMarker);
        });
      });

      setMap(mapInstance);
      setIsLoading(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setError('Failed to initialize map');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <p className="font-medium">Disaster and Volunteer Locations</p>
      </div>
      <div id="map" style={{ width: '100%', height: '400px' }} />
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default Navigation;
