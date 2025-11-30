import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Fix marker icons path for React
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Routing = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ weight: 4 }],
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;
};

const Navigation = ({ longitude, latitude, volunteerLocations }) => {
  const destination = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => console.log("Location permission denied")
      );
    }
  }, []);

  return (
    <div className="w-full">
      <MapContainer
        center={[destination.lat, destination.lng]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Disaster Marker */}
        <Marker position={[destination.lat, destination.lng]}>
          <Popup>
            <b>Disaster Location</b>
            <br />
            {destination.lat.toFixed(6)}, {destination.lng.toFixed(6)}
          </Popup>
        </Marker>

        {/* Volunteer Markers */}
        {volunteerLocations?.map((v, index) => (
          <Marker
            key={index}
            position={[v.lat, v.lng]}
            icon={L.icon({
              iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
              iconSize: [30, 30],
            })}
          >
            <Popup>
              <b>Volunteer</b>
              <br />({v.lat}, {v.lng})
            </Popup>
          </Marker>
        ))}

        {/* Routing from Current Position to Disaster */}
        {currentPosition && (
          <Routing start={currentPosition} end={destination} />
        )}
      </MapContainer>
    </div>
  );
};

export default Navigation;
