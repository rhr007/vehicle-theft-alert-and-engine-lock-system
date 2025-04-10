
import { useState } from "react";
import ServerIP from "../ServerIP";
import axios from "axios";

const ContactUs = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const reqBody = {
        'name': name,
        'email': email,
        'message': message
    }

    const sendMessage = (e: any) => {
        e.preventDefault();
        axios.post(
            `${ServerIP()}/contact`,
            reqBody
        ).then(
            (r) => {
                if(r.status == 201){
                    alert('Message Sent Successfully.\nAn Admin Will talk you soon :)')
                    window.location.reload();                }
            }
        )
    }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">
        
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">We’d love to hear from you. Fill out the form and we’ll get back to you soon!</p>
          
          <form className="space-y-4" onSubmit={sendMessage}>
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <input 
                required type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Message</label>
              <textarea required rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Message" onChange={(e) => setMessage(e.target.value)} ></textarea>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">📍 Address</h3>
            <p className="text-gray-600">Dhaka, Bangladesh</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">📞 Phone</h3>
            <p className="text-gray-600">+880 1234-567890</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">📧 Email</h3>
            <p className="text-gray-600">support@theftalert.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">🕐 Working Hours</h3>
            <p className="text-gray-600">Sun - Thu: 9 AM – 6 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
