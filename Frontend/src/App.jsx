import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
       <Route path="/" element={<><Navbar /><Footer /></>} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
