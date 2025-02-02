import "../Styles/LegalDocs.css";
import { Link } from 'react-router-dom';

const LegalDocs = () => {
  return (
    <div className="legal-section-title">
      <h1 className="legal-siteTitle">
      <Link to="/">
          Ayu<span className="legal-siteSign">Med</span>
        </Link>
      </h1>
      <div className="legal-text-content">
        <p className="legal-title">General Info</p>
        <p className="legal-description">
          Welcome to AyuMed, your trusted online healthcare platform. Our
          mission is to provide accessible and personalized healthcare services
          to individuals seeking expert medical advice and treatment. By using
          our platform, you agree to the terms outlined in our Privacy Policy
          and Terms of Service.
        </p>

        <p className="legal-title">Privacy Policy</p>
        <p className="legal-description">
          Your privacy is paramount to us. Our Privacy Policy outlines how we
          collect, use, and protect your personal and medical information. We
          ensure secure data handling, and you can trust that your information
          is treated with the utmost confidentiality.
        </p>

        <p className="legal-title">Terms of Service</p>
        <p className="legal-description">
          When using AyuMed, you agree to our Terms of Service. This
          includes guidelines for using our platform, interacting with doctors,
          and the responsibilities of both parties. It&#39;s essential to understand
          these terms to ensure a smooth experience for all users.
        </p>

        <p className="legal-title">Consultations</p>
        <p className="legal-description">
          Our platform connects you with expert doctors who provide online
          consultations. These consultations are not a replacement for in-person
          medical visits but serve as a convenient option for medical advice,
          prescriptions, and guidance. It&#39;s crucial to provide accurate and
          complete information to receive the best possible care.
        </p>

        <p className="legal-title">How it Works</p>
        <p className="legal-description">
          AyuMed is designed to simplify healthcare access. You can choose
          a specialist, schedule an appointment, and engage in a virtual
          consultation. Our specialists offer personalized advice and treatment
          plans tailored to your needs. Please remember that emergencies require
          immediate medical attention and should be directed to your local
          medical facility.
        </p>
      </div>
      <div className="legal-footer">
        <p>© 2013-2023 AyuMed. All rights reserved.</p>
      </div>
    </div>
  )
}

export default LegalDocs
