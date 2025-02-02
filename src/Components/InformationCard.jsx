import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/InformationCard.css";
import PropTypes from "prop-types";

function InformationCard({ title, description, icon }) {
  return (
    <div className="information-card">
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

InformationCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired
};

export default InformationCard;
