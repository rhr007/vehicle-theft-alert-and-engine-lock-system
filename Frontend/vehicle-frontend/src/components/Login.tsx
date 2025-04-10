import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import icons
import axios from "axios";

import ServerIP from "../ServerIP";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    const userData = {
      'username': email,
      'password': password
    }
    
    try{

    
      axios.post(
        `${ServerIP()}/users/login`,

        userData,

        {headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }}

      ).then((response) => {

        if(response.status == 200) {
          sessionStorage.setItem('token', response.data.access_token);
          sessionStorage.setItem('email', email);

          alert("Login Successful");
          if(!response.data.is_active){
            navigate('/dashboard/activate')
          }
          else{
            navigate('/dashboard')

          }
        }
        
        else{
          alert("something went worng try again later.")
        }
      })
      .catch(() => {
        alert('Wrong Email or Password')
      })
    } catch(error) {
        alert(`Server crashed ${error}`)
      
    }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Login</h2>
        
        <label className="block mb-2 text-gray-600">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block mb-2 text-gray-600">Password:</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
