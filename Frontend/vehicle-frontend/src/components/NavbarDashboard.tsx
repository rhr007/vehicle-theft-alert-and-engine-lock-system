import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarDashboard = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    useEffect(() => {
        setEmail(sessionStorage.getItem('email') || "")
    }, [])

    const handleLogoutClick = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("email");
          navigate("/login");
        }
      };
      
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">

      <div className="flex items-center gap-0 text-blue-600 hover:text-blue-800 font-bold text-xl">
        <span>🚨</span>
        <span>Theft Alert System</span>
      </div>

      <div className="space-x-6 text-gray-700 font-medium">
      <p className="text-gray-700 text-sm mt-2">Logged in as: <strong>{email}</strong></p>
      </div>

      {/* Right: Login Button */}
    
        <button 
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 cursor-pointer"
            onClick={handleLogoutClick}
        >
          Logout

        </button>
    </nav>
  );
};

export default NavbarDashboard;