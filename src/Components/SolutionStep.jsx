import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

function SolutionStep({ title, description }) {
    return (
        <div className="about-text-step">
            <p className="about-text-sTitle">
        <span>
          <FontAwesomeIcon className="fa-icon" icon={faCircleChevronDown} />{" "}
            {title}
        </span>
            </p>
            <p className="about-text-description">{description}</p>
        </div>
    );
}

// Define PropTypes
SolutionStep.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default SolutionStep;
