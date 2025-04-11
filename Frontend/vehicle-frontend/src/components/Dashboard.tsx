import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ServerIP from "../ServerIP";


const Dashboard = () => {
    const [motorStatus, setMotorStatus] = useState(false)
    const [user, setUser] = useState("");
    const [userID, setUserID] = useState(0);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

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
      setUserID(res.data.id);

      const id = res.data.id

      axios.get(`${ServerIP()}/motor/status/${id}`)
      .then((r) => {
        setMotorStatus(r.data.motor_status);
      })
    })
    .catch(() => {
      navigate("/login");
    });
  }, []);

  


  const motorON = () => {
    axios.get(`${ServerIP()}/motor/on`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((r) => {
      if(r.status == 201){
        setMotorStatus(true);
        alert("Engine ON");
      }
      else{
        alert("Something Went Wrong, contact to ADMIN")
      }
    })
  }

  const motorOFF = () => {
    axios.get(`${ServerIP()}/motor/off`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((r) => {
      if(r.status == 201){
        setMotorStatus(false);
        alert("Engine OFF");
      }
      else{
        alert("Something Went Wrong, contact to ADMIN")
      }
    })
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">🚗 Theft Alert Dashboard</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <p className="text-xl font-semibold mb-4">
          Motor is currently: 
          <span
            className={`ml-2 px-3 py-1 rounded-full text-white ${
            motorStatus ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {motorStatus ? "ON" : "OFF"}
          </span>
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={motorON}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Turn On
          </button>
          <button
            onClick={motorOFF}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Turn Off
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
