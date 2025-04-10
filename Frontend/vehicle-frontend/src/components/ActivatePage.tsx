
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import ServerIP from '../ServerIP';

const ActivatePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState(0);  

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  
    axios.get(`${ServerIP()}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setUser(res.data.name);
      sessionStorage.setItem('email', res.data.name)
      setUserID(res.data.id);

    })
    .catch(() => {
      sessionStorage.removeItem("token");
      navigate("/login");
    });
  }, []);

  const handleSendOTP = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

      axios.get(`${ServerIP()}/otp/send/${email}`)
      .then((r) => {
        if (r.status == 200){
            alert('OTP sent to your email.');
            setShowOTPSection(true);
        }
      })
      .catch((err) => {
        if(err.status == 400){
            alert('Already Registered Email');
            
        }
        
        else {
            alert('Failed to send OTP. Please try again.');

        }
    });
  };

  const handleRegister = () => {
    axios
      .post(`${ServerIP()}/otp/verify`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        otp,
        previous_email: user
      })
      .then((res) => {
        if (res.status == 200){
            alert('Account activated successfully!');
            navigate('/dashboard');
        }
      })
      .catch(() => {
        alert('Invalid OTP or failed to activate account.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Activate Your Account</h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        {!showOTPSection && (
          <button
            onClick={handleSendOTP}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        )}

        {showOTPSection && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full mt-4 p-2 border rounded-lg"
            />
            <button
              onClick={handleRegister}
              className="w-full mt-3 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivatePage;
