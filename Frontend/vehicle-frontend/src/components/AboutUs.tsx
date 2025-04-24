import aboutusImage from '../images/aboutusImage.jpg'
import { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const AboutUs = () => {

  const [location, setLocation] = useState({ city: '', region: '', country: '', lat: '', lon: '' });

  useEffect(() => {
    axios.get("https://ipinfo.io/json")
      .then(res => {
        const [lat, lon] = res.data.loc.split(","); // 'loc' gives 'latitude,longitude'
  
        setLocation({
          city: res.data.city,
          region: res.data.region,
          country: res.data.country,
          lat: lat,
          lon: lon
        });
      })
      .catch(err => console.log(err));
  }, []);
  
  
   return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Theft Alert System</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Theft Alert System is a smart car security solution developed to help vehicle owners monitor and protect their cars in real-time. By using an ESP32 with motor control and GPS tracking, we provide powerful on/off control and live location tracking straight from your dashboard.
          </p>
          <p className="text-gray-600">
            Built with love by passionate engineers, this system ensures peace of mind and security for your vehicle. Whether you’re at home or away, your car is just a click away.
          </p>
        </div>

        {/* Image */}
        <div>
          <img 
            src={aboutusImage}
            alt="Car Security"
            className="rounded-2xl shadow-lg w-full h-auto"
          />
        </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-2">Your Location</h2>
              <p>City: {location.city}</p>
              <p>Region: {location.region}</p>
              <p>Country: {location.country}</p>
              <p>Latitude & Longitude: {location.lat}</p>
            </div>


              <MapComponent 
              />

      </div>
    </div>
  );
};

export default AboutUs;
