import { useEffect, useState } from "react";
import axios from "axios";
import ServerIP from "../ServerIP";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("create");
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
    fetchMessage();
  }, []);

  const fetchUsers = () => {
    axios.get(`${ServerIP()}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Fetch Users Error:", err);
        navigate('/login')
      
      });
  };

  const fetchMessage = () => {
    axios.get(`${ServerIP()}/contact/messages`)
    .then((r) => {
      setMessages(r.data)
    });
  }

  // Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${ServerIP()}/admin/user`, {
        email,
        password,
      });
      setUsername("");
      setPassword("");
      fetchUsers(); // refresh list
      alert("User created successfully!");
    } catch (error) {
      console.error("Create User Error:", error);
      alert("Failed to create user.");
    }
  };


  const handleDeleteUser = async (id: any) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`${ServerIP()}/admin/user/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Delete User Error:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleDeleteMsg = (id: any) => {
    const confirmDelete = confirm("Are you sure you want to delete this message?");
    if (confirmDelete) {

        axios.delete(`${ServerIP()}/contact/message/${id}`)
        .then(() => {
          alert("message deleted successfully");
          setMessages((prev) => prev.filter((msg) => msg.id !== id));
        })
    
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded font-semibold cursor-pointer ${
            activeTab === "create" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Create User
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 rounded font-semibold cursor-pointer ${
            activeTab === "manage" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Manage Users
        </button>

        <button
          onClick={() => setActiveTab("message")}
          className={`px-4 py-2 rounded font-semibold cursor-pointer ${activeTab === "message" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Messages
        </button>
      </div>

      {activeTab === "create" && (
        <form onSubmit={handleCreateUser} className="space-y-4">
          <input
            type="text"
            placeholder="Email, Ex: user1@theftalert.com"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border px-4 py-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Create User
          </button>
        </form>
      )}

      {activeTab === "manage" && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3">ID</th>
                <th className="px-3">Username</th>
                <th className="px-3">Email</th>
                <th className="px-3">Active</th>
                <th className="px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-2">{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.is_active ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "message" && (
                <div className="overflow-x-auto">
                <table className="min-w-full border text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-3">ID</th>
                      <th className="px-3">Name</th>
                      <th className="px-3">Email</th>
                      <th className="px-3">Message</th>
                      <th className="px-3">Time</th>
                      <th className="px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg.id} className="border-t">
                        <td className="py-2">{msg.id}</td>
                        <td>{msg.name}</td>
                        <td>{msg.email}</td>
                        <td>{msg.message}</td>
                        <td>{new Date(msg.date_time).toLocaleString()}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteMsg(msg.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {messages.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4 text-gray-500">No Message found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
      )}
    </div>
  );
}
