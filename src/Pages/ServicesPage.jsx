import InformationCard from "../Components/InformationCard.jsx";
import {
  faStethoscope,
  faPrescriptionBottle,
  faAmbulance,
  faXRay,
  faSyringe,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/ServicesPage.css";

function ServicesPage() {
  return (
    <div className="services-page">
      {/* Header Section */}
      <header className="services-header">
        <h1>Our Services</h1>
        <p>
          At our hospital, we strive to provide top-notch healthcare services
          with a patient-centric approach. Explore our range of medical
          facilities designed to cater to your needs.
        </p>
      </header>

      {/* Services Section */}
      <div className="services-grid">
        <InformationCard
          title="OPD Services"
          description="Our Outpatient Department offers expert consultations with
            specialists across various fields, ensuring comprehensive and
            personalized care."
          icon={faStethoscope}
        />
        <InformationCard
          title="Pharmacy"
          description="Our pharmacy provides access to a wide variety of medicines,
            health supplements, and prescription refills for your convenience."
          icon={faPrescriptionBottle}
        />
        <InformationCard
          title="Emergency Care"
          description="Available 24/7, our emergency care unit ensures immediate
            attention to critical medical situations with advanced facilities."
          icon={faAmbulance}
        />
        <InformationCard
          title="Diagnostic Services"
          description="Get accurate and timely diagnosis with our modern diagnostic
            services, including X-rays, MRIs, blood tests, and more."
          icon={faXRay}
        />
        <InformationCard
          title="Vaccination Services"
          description="We offer a range of vaccinations for all age groups, helping
            you stay protected against preventable diseases."
          icon={faSyringe}
        />
        <InformationCard
          title="Inpatient Services"
          description="Our inpatient department provides comfortable rooms, dedicated
            nursing staff, and personalized care for admitted patients."
          icon={faBed}
        />
      </div>
    </div>
  );
}

export default ServicesPage;
