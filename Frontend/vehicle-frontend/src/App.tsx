
import Login from './components/Login'

import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ContactUs from './components/ContactUs'
import AboutUs from './components/AboutUs'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'


import { Routes, Route, useLocation } from 'react-router-dom'
import NavbarDashboard from './components/NavbarDashboard'
import ActivatePage from './components/ActivatePage'


const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard ? <Navbar /> : <NavbarDashboard />}
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/contact' element={<ContactUs />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/dashboard/activate' element={<ActivatePage />}/>
        <Route path='/dashboard/admin' element={<AdminPanel />}/>

      </Routes>

    </>
  )
}

export default App