import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import Footer from "../components/Footer";
import "./Home.css";

import heroImage from "../assets/image.png";

function Home() {
  return (
    <div className="home-container">
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero-section">
        {/* LEFT */}
        <div className="left-section">
          <Hero />
        </div>

        {/* RIGHT */}
        <div className="right-section">
          <img
            src={heroImage}
            alt="Quiz Illustration"
            className="hero-image"
          />
        </div>
      </div>

      {/* FEATURE CARDS BELOW IMAGE */}
      <div className="bottom-cards">
        <FeatureCards />
      </div>

      <Footer />
    </div>
  );
}

export default Home;