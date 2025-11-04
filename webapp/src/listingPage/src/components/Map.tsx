import type React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
interface MapProps {
  title?: string;
  lat?: number;
  lng?: number;
}

// @ts-expect-error icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const MapLocation: React.FC<MapProps> = ({ title, lat, lng }) => {
  const openGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    console.log(mapsUrl);
    window.open(mapsUrl, "_blank"); // Opens in a new tab
  };

  return (
    <MapContainer
      center={[lat ?? 25.15, lng ?? 55.3]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-[30vh] md:h-[55vh]"
      attributionControl={false}
      zoomControl={false}
    >
      {/* <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      /> */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker
        position={[lat ?? 25.15, lng ?? 55.3]}
        eventHandlers={{ click: openGoogleMaps }}
      >
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLocation;
