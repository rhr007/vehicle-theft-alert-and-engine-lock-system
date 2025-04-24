import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';

const MapComponent = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation([latitude, longitude]);
      },
      (err) => {
        console.error("Error fetching location:", err);
      }
    );
  }, []);

  return (
    <div className="w-full h-[400px] mt-6 rounded-md overflow-hidden shadow-md">
      {location ? (
        <MapContainer center={location} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location}>
            <Popup>
              You are here 💖
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-center text-blue-500">Fetching your location...</p>
      )}
    </div>
  );
};

export default MapComponent;
