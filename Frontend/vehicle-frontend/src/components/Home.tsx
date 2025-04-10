
import { Link } from 'react-router-dom';
import Esp32 from '../images/Esp32Image.jpg'
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Theft Alert System</h1>
          <p className="text-lg text-gray-600 mb-6">
            Secure your vehicle with real-time tracking and remote engine control.
            Easy to use, reliable, and designed for modern safety needs.
          </p>
          <Link to="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <img
            src={Esp32}
            alt="Vehicle Security"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Real-time Location",
                desc: "Track your car anytime, anywhere with GPS updates.",
              },
              {
                title: "Remote Motor Control",
                desc: "Turn engine ON/OFF via the dashboard securely.",
              },
              {
                title: "OTP Secured Login",
                desc: "Verify identity using OTP on first login.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">About Theft Alert System</h2>
        <p className="text-gray-700 text-center">
          Our project is designed to protect your car using the power of IoT.
          With an ESP32, GPS sensor, and motor driver, you can remotely control
          and monitor your car from anywhere in the world.
        </p>
      </section>
    </div>
  );
};

export default Home;
