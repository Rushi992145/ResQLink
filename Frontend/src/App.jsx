import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ReportDisaster from "./components/ReportDisaster";
import RequestAssistance from "./components/RequestAssistance";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import NotificationDetail from "./components/NotificationDetail";
import VolunteerDashboard from "./components/VolunteerDashboard";
import NgoDashboard from "./components/NgoDashboard";
import Navigation from "./components/Navigation";
import Learning from "./components/Learning";
import CourseDetail from "./components/CourseDetail";

function App() {
  
  const token = useSelector((state)=>state.auth.token);
  const role = useSelector((state)=>state.auth.role);
  
  console.log(token,role);
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          {/* Open Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* User - Open Route */}
          <Route path="/report-disaster" element={<ReportDisaster />} />
          <Route path="/request-assistance" element={<RequestAssistance />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          
          <Route path='/navigation' element={<Navigation />} />
          
          <Route
            path="/volunteer/notifications/:id"
            element={<NotificationDetail />}
          />

          {/* Volunteer - Private Route */}
          {role && role === "volunteer" && (
            <>
               <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} /> 
               <Route path="/volunteer/learning/course/:id" element={<CourseDetail />} /> 
            </>
          )}

          {/* Ngo - Private Route */}
          {role && role === "ngo" && (
            <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          )}

          {/* Admin - Private Route */}
          {role && role === "admin" && (
            <Route path="/admin-dashboard" element={<Admin />} />
          )}

          <Route path="*" element={<Login />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
