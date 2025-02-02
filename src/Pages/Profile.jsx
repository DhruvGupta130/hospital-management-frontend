import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Profile.css";
import { patientURL, securedURL } from "../Api & Services/Api.js";
import { useNavigate } from "react-router-dom";  // Import useNavigate

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    image: "",
  });

  const navigate = useNavigate();  // Initialize navigate

  // Fetch the profile information from the backend
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming the token is stored in localStorage
      const response = await axios.get(`${patientURL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching profile data", error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setUserInfo((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    // Save the updated profile info (e.g., make API call to update)
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      await axios.put(
        `${securedURL}/updateProfile`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile", error);
      // Handle save error (e.g., show error message)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem('isAuthenticated', false);
    localStorage.removeItem('role');
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={
                userInfo.image ||
                "https://media.licdn.com/dms/image/v2/D5603AQHUfvz52EF2BQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729278055151?e=1738195200&v=beta&t=WVDfcQgwUyPGchgdCdo2T_fEt9ACYVSkJZC_udUK4Yw"
              }
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <div className="profile-info">
            <label>First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.firstName}</p>
            )}

            <label>Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.lastName}</p>
            )}

            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.email}</p>
            )}

            <label>Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="mobile"
                value={userInfo.mobile}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.mobile}</p>
            )}

            <label>Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={userInfo.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{userInfo.gender}</p>
            )}

            <label>Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={userInfo.dateOfBirth}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.dateOfBirth}</p>
            )}

            <label>Street</label>
            {isEditing ? (
              <input
                type="text"
                name="address.street"
                value={userInfo.address.street}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.address.street}</p>
            )}

            <label>City</label>
            {isEditing ? (
              <input
                type="text"
                name="address.city"
                value={userInfo.address.city}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.address.city}</p>
            )}

            <label>State</label>
            {isEditing ? (
              <input
                type="text"
                name="address.state"
                value={userInfo.address.state}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.address.state}</p>
            )}

            <label>Zip</label>
            {isEditing ? (
              <input
                type="text"
                name="address.zip"
                value={userInfo.address.zip}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.address.zip}</p>
            )}

            <label>Country</label>
            {isEditing ? (
              <input
                type="text"
                name="address.country"
                value={userInfo.address.country}
                onChange={handleChange}
              />
            ) : (
              <p>{userInfo.address.country}</p>
            )}
          </div>
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
          ) : (
            <button onClick={handleEditToggle} className="edit-btn">
              Edit Profile
            </button>
          )}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
