import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/userAuth.js/Signup";
import Login from "./components/userAuth.js/Login";
import AdminLogin from "./components/userAuth.js/AdminLogin";
import PasswordResetRequest from "./components/userAuth.js/PasswordResetRequest";
import PasswordRequestSubmit from "./components/userAuth.js/PasswordRequestSubmit";
import PasswordReset from "./components/userAuth.js/PasswordReset";
import Homepage from "./components/Home/Homepage";
import Discover from "./components/discover/Discover";
import Compare from "./components/discover/Compare";
import Dashboard from "./components/UserDashboard/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import Profile from "./components/UserDashboard/Profile";
import Search from "./components/Home/Search";
import ProductsForm from "./components/discover/ProductsForm";
import ProductUpdate from "./components/UserDashboard/ProductUpdate";
import AllProducts from "./components/discover/AllProducts";
import GroceryProducts from "./components/discover/GroceryProducts";
import About from "./components/Home/About";
import Contact from "./components/Home/Contact";
import Faq from "./components/Home/Faq";
import TermsOfUse from "./components/siteInfo/TermsOfUse";
import PrivacyPolicy from "./components/siteInfo/PrivacyPolicy";
import SiteMap from "./components/siteInfo/SiteMap";
import NotFound from "./components/discover/NotFound";
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
            <Route path="/admin-login" element={<AdminLogin  />} />      
            <Route path="/request-password" element={<PasswordResetRequest />} />
            <Route path="/request-submit" element={<PasswordRequestSubmit />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/" element={<Homepage />} />   
            <Route path="/discover" element={<Discover/>} />   
            <Route path="/compare" element={<Compare/>} />  
            <Route path="/dashboard" element={<Dashboard/>} /> 
            <Route path="/admin-dashboard/" element={<AdminDashboard/>} /> 
            <Route path="/profile" element={<Profile/>} />
            <Route path="/products-form" element={<ProductsForm/>} />
            <Route path="/update-product/:id" element={<ProductUpdate/>} />
            <Route path="/products" element={<AllProducts/>} />
            <Route path="/grocery" element={<GroceryProducts/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/location" element={<LocationMap/>} />
            <Route path="/location/location/:locationId" element={<LocationDetails/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/faq" element={<Faq/>} />
            <Route path="/terms" element={<TermsOfUse/>} />
            <Route path="/privacy" element={<PrivacyPolicy/>} />
            <Route path="/site-map" element={<SiteMap/>} />
            <Route path="*" element={<NotFound />} />
            
            {/* <Route path="/map" element={<Maps/>} /> */}
         
  
        
          </Routes>
        </div>        
      </Router>
    </div>
  );
}

export default App;
