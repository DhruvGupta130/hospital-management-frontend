import Hero from "../Components/Hero.jsx";
import Info from "../Components/Info.jsx";
import Footer from "../Components/Footer.jsx";
import "../Components/AnalyticsDashboard.jsx";

function Home() {
  return (
    <div className="home-section">
      {/* Hero Section */}
      <Hero />

      {/* Main Features Information */}
      <Info />

      

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
