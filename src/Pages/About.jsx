import '../Styles/About.css';

function About() {
  return (
    <div className="about-section">
      <div className="about-title-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to our hospital, where we are dedicated to providing the highest standard of healthcare
          services. Our team of professionals works tirelessly to ensure that you receive the best care
          possible in a welcoming and compassionate environment.
        </p>
      </div>

      <div className="about-mission-vision">
        <div className="about-box">
          <h4 className="about-box-title">Mission</h4>
          <p className="about-box-description">
            Our mission is to provide accessible, high-quality healthcare services to all. We are committed
            to ensuring patient satisfaction and creating a positive impact on the health and wellbeing of
            our community.
          </p>
        </div>

        <div className="about-box">
          <h4 className="about-box-title">Vision</h4>
          <p className="about-box-description">
            Our vision is to become the leading healthcare provider by offering exceptional patient care,
            leveraging the latest medical technologies, and fostering an environment that promotes healing,
            trust, and compassion.
          </p>
        </div>
      </div>

      <div className="about-values">
        <h4 className="about-values-title">Our Core Values</h4>
        <ul className="values-list">
          <li>Integrity</li>
          <li>Compassion</li>
          <li>Excellence</li>
          <li>Teamwork</li>
          <li>Innovation</li>
        </ul>
      </div>

      <div className="about-team">
        <h4 className="about-team-title">Meet Our Team</h4>
        <div className="team-members">
          {/* You can replace this with dynamic data for team members */}
          <div className="team-member">
            <img src="https://via.placeholder.com/100" alt="Doctor" className="team-member-img" />
            <h5 className="team-member-name">Dr. John Doe</h5>
            <p className="team-member-role">Chief Medical Officer</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/100" alt="Nurse" className="team-member-img" />
            <h5 className="team-member-name">Jane Smith</h5>
            <p className="team-member-role">Head Nurse</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/100" alt="Admin" className="team-member-img" />
            <h5 className="team-member-name">Mike Johnson</h5>
            <p className="team-member-role">Hospital Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
