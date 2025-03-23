import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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


import { generateToken } from './Notification/firebase'
import { messaging } from './Notification/firebase'
import { onMessage } from 'firebase/messaging'

import { setFcmToken } from "./Redux/authslice";

function App() {
  
  const token = useSelector((state)=>state.auth.token);
  const role = useSelector((state)=>state.auth.role);
  const fcm_token = useSelector((state)=>state.auth.fcm_token);

  useEffect(() => {
    async function getToken() {
      
      const fcmToken = await generateToken();
      console.log("fcm_token is:", fcmToken);
      localStorage.setItem('fcm_token',fcmToken)
      dispatch(setFcmToken(fcmToken));

      try 
      {
          if(fcm_token)
          {
            const response = await fetch('http://localhost:3000/api/notification/saveUser',{
              method : 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body : JSON.stringify({fcm_token})
            })

            const value = await response.json();
            console.log(value);
          }
          else
          {
            console.log("no fcm_token received",fcm_token );
          } 
      }
      catch(error)
      {
        console.log(error.message)
      }

      onMessage(messaging, (payload) => {
        console.log("payload is:", payload);
        toast(payload.notification.body);
      });
    }

    getToken();
  }, []);
  
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

          <Route
            path="/volunteer/notifications/:id"
            element={<NotificationDetail />}
          />

          {/* Volunteer - Private Route */}
          {role && role === "volunteer" && (
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          )}

          {/* Ngo - Private Route */}
          {role && role === "ngo" && (
            <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          )}

          {/* Admin - Private Route */}
          {role && role === "admin" && (
            <>
              <Route path="/admin-dashboard" element={<Admin />} />
              <Route
                path="/admin-dashboard/disaster/:id"
                element={<DisasterDetailsPage />}
              />
            </>
          )}

          <Route path="*" element={<Login />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
