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
import NgoList from "./components/Ngolist";
import NgoDetail from "./components/Ngodetail";
import DisasterDetailsPage from "./components/DisasterDetailsPage";
import DisasterList from "./components/DisasterList";
import DisasterDetailList from "./components/DisasterDetailList";
import FundInfo from "./components/FundInfo";
import DonationForm from './components/DonationForm';

import { generateToken } from "./Notification/firebase";
import { messaging } from "./Notification/firebase";
import { onMessage } from "firebase/messaging";

import { setFcmToken } from "./Redux/authslice";
import { setLongitude } from "./Redux/authslice";
import { setLattitude } from "./Redux/authslice";



function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const fcm_token = useSelector((state) => state.auth.fcm_token);
  const longitude = useSelector((state) => state.auth.longitude);
  const lattitude = useSelector((state) => state.auth.lattitude);

  //   console.log("here",longitude,lattitude);
  //   const getCurrentLocation = async () => {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const location = {
  //             lati: position.coords.latitude,
  //             long: position.coords.longitude,
  //           };

  //           localStorage.setItem('longitude',location.long);
  //           localStorage.setItem('lattitude',location.lati);

  //           dispatch(setLongitude(location.long));
  //           dispatch(setLattitude(location.lati));
  //           console.log("Retrieved location:", location);
  //         },
  //         (error) => reject(error)
  //       );
  //   };

  //   async function getToken() {
  //     const fcmToken = await generateToken();
  //     console.log("fcm_token is:", fcmToken);
  //     localStorage.setItem("fcm_token", fcmToken);
  //     dispatch(setFcmToken(fcmToken));

  //     try
  //     {
  //         if(fcm_token)
  //         {
  //           const response = await fetch('http://localhost:3000/api/notification/updateuserlocation',{
  //             method : 'POST',
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body : JSON.stringify({fcm_token,longitude,lattitude})
  //           })

  //           const value = await response.json();
  //           console.log(value);

  //           getCurrentLocation();
  //         }
  //         else
  //         {
  //           console.log("no fcm_token received",fcm_token );
  //         }
  //     }
  //     catch(error)
  //     {
  //       console.log(error.message)
  //     }

  //     onMessage(messaging, (payload) => {
  //       console.log("payload is:", payload);
  //       toast(payload.notification.body);
  //     });
  //   }

  //   async function updateToken()
  //   {
  //     try
  //     {
  //         if(fcm_token)
  //         {
  //           const response = await fetch('http://localhost:3000/api/notification/saveUser',{
  //             method : 'POST',
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body : JSON.stringify({fcm_token})
  //           })

  //           const value = await response.json();
  //           console.log(value);
  //         }
  //         else
  //         {
  //           console.log("no fcm_token received",fcm_token );
  //         }
  //     }
  //     catch(error)
  //     {
  //       console.log(error.message);
  //     }
  //   }

  //   async function updateToken()
  //   {
  //     try
  //     {
  //         if(fcm_token)
  //         {
  //           const response = await fetch('http://localhost:3000/api/notification/saveUser',{
  //             method : 'POST',
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ fcm_token }),
  //           }
  //         );

  //           const value = await response.json();
  //           console.log(value);
  //         }
  //         else
  //         {
  //           console.log("no fcm_token received",fcm_token );
  //         }
  //     }
  //     catch(error)
  //     {
  //       console.log(error.message);
  //     }
  //   }

  //   getToken();
  //   updateToken();
  // }, []);

  useEffect(() => {
    console.log("State values:", {
      longitude,
      lattitude,
      fcm_token,
      role,
      token,
    });

    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lati: position.coords.latitude,
            long: position.coords.longitude,
          };

          localStorage.setItem("longitude", location.long);
          localStorage.setItem("lattitude", location.lati);

          // Update longitude and latitude in Redux store
          dispatch(setLongitude(location.long));
          dispatch(setLattitude(location.lati));

          // console.log("Retrieved location:", location);

          // Call updateUserLocation after longitude and latitude are set
          updateUserLocation(location.long, location.lati);
        },
        (error) => console.log("Error retrieving location:", error.message)
      );
    };

    const updateUserLocation = async (longitude, lattitude) => {
      // Generate FCM token if not already set
      const fcmToken = fcm_token || (await generateToken());

      if (!fcm_token) {
        console.log("Generated fcm_token:", fcmToken);
        localStorage.setItem("fcm_token", fcmToken);
        dispatch(setFcmToken(fcmToken));
      }

      try {
        if (fcmToken && longitude && lattitude) {
          const response = await fetch(
            "http://localhost:3000/api/notification/updateuserlocation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fcm_token: fcmToken,
                longitude,
                lattitude,
              }),
            }
          );

          const value = await response.json();
          console.log("Update User Location Response:", value);
        } else {
          console.log("Missing required data for API call:", {
            fcm_token,
            longitude,
            lattitude,
          });
        }
      } catch (error) {
        console.log("Error updating user location:", error.message);
      }
    };

    const updateToken = async () => {
      try {
        if (fcm_token) {
          const response = await fetch(
            "http://localhost:3000/api/notification/saveUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ fcm_token }),
            }
          );

          const value = await response.json();
          console.log("Save User Response:", value);
        } else {
          console.log("No fcm_token found for saving:", fcm_token);
        }
      } catch (error) {
        console.log("Error saving user token:", error.message);
      }
    };

    // Get current location and update the token
    generateToken();
    getCurrentLocation();
    updateToken();

    onMessage(messaging, (payload) => {
      console.log("Received payload:", payload);
      toast(payload.notification.body);
    });
  }, [dispatch, fcm_token, longitude, lattitude]);

  // console.log(token, role);
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Open Route */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/donate" element={<DonationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/disasters" element={<DisasterList />} />
            <Route path="/disaster/:id" element={<DisasterDetailList />} />
            <Route path="/fund-info" element={<FundInfo />} />

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
              <Route
                path="/volunteer-dashboard"
                element={<VolunteerDashboard />}
              />
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

            <Route path="/ngolist" element={<NgoList />} />
            <Route path="/ngo/:id" element={<NgoDetail />} />

            <Route path="*" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
