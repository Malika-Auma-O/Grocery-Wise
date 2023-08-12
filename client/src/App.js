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
import Search from "./components/Home/Search";
import ProductsForm from "./components/discover/ProductsForm";
import ProductUpdate from "./components/UserDashboard/ProductUpdate";
import AllProducts from "./components/discover/AllProducts";
<<<<<<< HEAD
import About from "./components/Home/About";
import Contact from "./components/Home/Contact";
import Faq from "./components/Home/Faq";
=======
>>>>>>> 30ab31a486e3c8e228c90eba5e5522040485269e
import LocationMap from "./components/discover/LocationMap";
import LocationDetails from "./components/discover/LocationDetails";
// import Maps from "./components/discover/Map";

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
            <Route path="/products-form" element={<ProductsForm/>} />
            <Route path="/update-product/:id" element={<ProductUpdate/>} />
            <Route path="/products" element={<AllProducts/>} />
            <Route path="/search" element={<Search/>} />
<<<<<<< HEAD
            <Route path="/about" element={<About/>} />
            <Route path="/location" element={<LocationMap/>} />
            <Route path="/location/location/:locationId" element={<LocationDetails/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/faq" element={<Faq/>} />
            
=======
            <Route path="/location" element={<LocationMap/>} />
            <Route path="location/location/:locationId" element={<LocationDetails/>} />
>>>>>>> 30ab31a486e3c8e228c90eba5e5522040485269e
            {/* <Route path="/map" element={<Maps/>} /> */}
         
  
        
          </Routes>
        </div>        
      </Router>
    </div>
  );
}

export default App;
