import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"; // Import PropTypes

function DoctorCard(props) {
    return (
        <div className="dt-card">
            <img src={props.img} alt={props.name} className="dt-card-img" />
            <p className="dt-card-name">{props.name}</p>
            <p className="dt-card-title">{props.title}</p>
            <p className="dt-card-stars">
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#F7BB50", paddingRight: "6px" }}
                />
                {props.stars}
                <span className="dt-card-reviews"> ({props.reviews}+ Reviews)</span>
            </p>
        </div>
    );
}

// Define PropTypes for the component
DoctorCard.propTypes = {
    img: PropTypes.string.isRequired, // Image URL is required
    name: PropTypes.string.isRequired, // Doctor's name is required
    title: PropTypes.string.isRequired, // Doctor's title is required
    stars: PropTypes.number.isRequired, // Number of stars is required
    reviews: PropTypes.number.isRequired, // Number of reviews is required
};

export default DoctorCard;