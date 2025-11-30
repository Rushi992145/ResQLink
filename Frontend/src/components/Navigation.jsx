import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const Navigation = ({ longitude, lattitude }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routeInfo, setRouteInfo] = useState({ distance: "", duration: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const destination = {
    lat: parseFloat(lattitude),
    lng: parseFloat(longitude),
  };
  console.log("Destination coordinates:", destination);

  // fix leaflet marker icon path
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  // Component to add routing control
  const Routing = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
        routeWhileDragging: false,
        showAlternatives: false,
        lineOptions: { styles: [{ weight: 4 }] },
      })
        .on("routesfound", (e) => {
          const route = e.routes[0];
          setRouteInfo({
            distance: (route.summary.totalDistance / 1000).toFixed(1) + " km",
            duration: Math.round(route.summary.totalTime / 60) + " mins",
          });
        })
        .addTo(map);

      return () => map.removeControl(routingControl);
    }, [map, start, end]);

    return null;
  };

  // get current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        () => {
          setError("Unable to access your location.");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by your device.");
      setIsLoading(false);
    }
  }, []);

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
            <p className="font-medium">
              Lat: {destination.lat.toFixed(4)}, Lng: {destination.lng.toFixed(4)}
            </p>
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

      <div className="w-full h-64 md:h-96 rounded shadow-md" style={{ height: "400px" }}>
        {currentPosition && (
          <MapContainer center={[currentPosition.lat, currentPosition.lng]} zoom={13} scrollWheelZoom>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Routing start={currentPosition} end={destination} />
          </MapContainer>
        )}
      </div>

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
