import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Menu from './pages/Menu'
import Login from './pages/Login'
import Signup from './pages/Signup'
// import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ForgotPassword from './components/ForgetPassword'


function App() {
 return(
  <Router>
    <Navbar/>
    <div className="p-6">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/booking" element={<Booking/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          {/* <Route path="/profile" element={<Profile/>}/> */}
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Routes>
    </div>
  </Router>
 )
}

export default App
