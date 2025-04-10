import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">

      <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-xl">
        <span>🚨</span>
        <span>Theft Alert System</span>
      </Link>

      {/* Middle: Links */}
      <div className="space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-500 transition duration-200">Home</Link>
        <Link to="/contact" className="hover:text-blue-500 transition duration-200">Contact Us</Link>
        <Link to="/about" className="hover:text-blue-500 transition duration-200">About Us</Link>
      </div>

      {/* Right: Login Button */}
      <div>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
