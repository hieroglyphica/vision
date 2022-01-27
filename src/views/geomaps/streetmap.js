import "./geomap.css";
import "leaflet/dist/leaflet.css";
import image1 from "../../images/space5.jpg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const GeoMap = () => {
  const position = [51.505, -0.09];
  return (
    <MapContainer className="map" center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default GeoMap;
