import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
