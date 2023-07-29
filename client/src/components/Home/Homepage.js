
import Hero from "./Hero";
import HomeIntroduction from "./HomeIntroduction"
import HomeFeatures from "./HomeFeatures";
import HomeAbout from "./HomeAbout";
import Footer from "../Footer"


function Homepage() {
  return ( 
    <div className="home">
      <Hero/>
      <HomeIntroduction />
      <HomeFeatures/>
      <HomeAbout/>
      <Footer/>
    </div>
   );
}

export default Homepage;