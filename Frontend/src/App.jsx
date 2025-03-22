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

function App() {
  
  const token = useSelector((state)=>state.auth.token);
  const role = useSelector((state)=>state.auth.role);
  
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

          <Route
            path="/volunteer/notifications/:id"
            element={<NotificationDetail />}
          />

          <Route path="/ngo" element={<NgoDashboard />} />

          {/* Volunteer - Private Route */}
          {role && role === "volunteer" && (
            <Route path="/volunteer-dashboard" element={<Register />} />
          )}

          {/* Ngo - Private Route */}
          {role && role === "ngo" && (
            <Route path="/ngo-dashboard" element={<Register />} />
          )}

          {/* Admin - Private Route */}
          {role && role === "admin" && (
            <Route path="/admin-dashboard" element={<Register />} />
          )}

          <Route path="*" element={<Login />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
