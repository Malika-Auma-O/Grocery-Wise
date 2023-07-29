import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Home/Homepage";


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
          </Routes>
        </div>        
      </Router>
    </div>
  );
}

export default App;
