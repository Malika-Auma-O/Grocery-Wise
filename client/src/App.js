import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Home/Homepage";
import Discover from "./components/discover/Discover";
import Compare from "./components/discover/Compare";
import Dashboard from "./components/UserDashboard/Dashboard";
import Profile from "./components/UserDashboard/Profile";


function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar/>
        <div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />      
            <Route path="/" element={<Homepage />} />   
            <Route path="/discover" element={<Discover/>} />   
            <Route path="/compare" element={<Compare/>} />  
            <Route path="/dashboard" element={<Dashboard/>} /> 
            <Route path="/profile" element={<Profile/>} /> 
          </Routes>
        </div>        
      </Router>
    </div>
  );
}

export default App;
