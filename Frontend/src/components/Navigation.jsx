import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const Navigation = ({ longitude, lattitude }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routeInfo, setRouteInfo] = useState({ distance: "", duration: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert incoming props to floating numbers
  const destination = {
    lat: parseFloat(lattitude),
    lng: parseFloat(longitude),
  };

  // Custom Marker Icons
  const startIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
  });

  const endIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
    iconSize: [40, 40],
  });

  // Routing Component
  const Routing = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
        lineOptions: { styles: [{ color: "blue", weight: 5 }] },
        addWaypoints: false,
        routeWhileDragging: false,
        showAlternatives: false,
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1/driving/",
        }),
      })
        .on("routesfound", (e) => {
          const route = e.routes[0];
          setRouteInfo({
            distance: (route.summary.totalDistance / 1000).toFixed(1) + " km",
            duration: Math.round(route.summary.totalTime / 60) + " mins",
          });

          // Fit map to route bounds
          const bounds = L.latLngBounds(
            [start.lat, start.lng],
            [end.lat, end.lng]
          );
          map.fitBounds(bounds);
        })
        .addTo(map);

      return () => map.removeControl(routingControl);
    }, [map, start, end]);

    return null;
  };

  // Get Current Device Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      () => {
        setError("Unable to fetch your location");
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <div className="w-full relative">
      {error && <div className="bg-red-200 p-3">{error}</div>}

      <div className="bg-white shadow-md p-4 mb-2 flex justify-between">
        <p className="font-bold">Navigation to Disaster Location</p>
        {routeInfo.distance && (
          <p>
            {routeInfo.distance} | {routeInfo.duration}
          </p>
        )}
      </div>

      <div style={{ height: "420px" }}>
        {currentPosition && (
          <MapContainer
            center={[currentPosition.lat, currentPosition.lng]}
            zoom={14}
            scrollWheelZoom
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={currentPosition} icon={startIcon}>
              <Popup>📍 Your Location</Popup>
            </Marker>

            <Marker position={destination} icon={endIcon}>
              <Popup>🚨 Disaster Location</Popup>
            </Marker>

            <Routing start={currentPosition} end={destination} />
          </MapContainer>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
