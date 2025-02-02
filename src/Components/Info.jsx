import { useNavigate } from "react-router-dom";
import InformationCard from "./InformationCard.jsx";
import {
  faHospital,
  faPrescriptionBottle,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

const services = [
  {
    title: "Find Nearby Hospitals",
    description: "Locate hospitals near you with advanced facilities and expert care.",
    icon: faHospital,
    route: "/nearby-hospitals",
  },
  {
    title: "Find Nearby Pharmacies",
    description: "Discover pharmacies in your area for quick access to medicines.",
    icon: faPrescriptionBottle,
    route: "/nearby-pharmacies",
  },
];

function Info() {
  const navigate = useNavigate();

  return (
    <section className="info-section" id="facilities">
      <header className="info-header">
        <h3 className="info-title">
          <span>Explore Nearby</span>
        </h3>
        <p className="info-description">
          Easily find nearby hospitals and pharmacies tailored to meet your healthcare needs.
          Our system helps you access trusted facilities quickly and efficiently.
        </p>
      </header>

      <div className="info-cards">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.route)}
            className="info-card-wrapper"
            role="button"
            aria-label={`Navigate to ${service.title}`}
          >
            <InformationCard
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Info;
