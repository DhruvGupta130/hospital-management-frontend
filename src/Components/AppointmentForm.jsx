import { useState, useEffect } from "react";
import "../Styles/AppointmentForm.css";
import { patientURL, URL } from "../Api & Services/Api.js";
import axios from "axios";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [hospital, setHospital] = useState("default");
  const [department, setDepartment] = useState("default");
  const [doctor, setDoctor] = useState("default");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("default");
  const [formErrors, setFormErrors] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${URL}/hospitals`);
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setMessage({ type: "error", text: "Failed to fetch hospitals. Please try again later." });
      }
    };

    fetchHospitals();
  }, []);

  const handleHospitalChange = async (e) => {
    const selectedHospital = e.target.value;
    setHospital(selectedHospital);
    setDepartment("default");
    setDoctor("default");
    setAppointmentDate("");
    setPreferredTimeSlot("default");
    setDepartments([]);
    setDoctors([]);
    setTimeSlots([]);

    if (selectedHospital !== "default") {
      try {
        const response = await axios.get(`${URL}/${selectedHospital}/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setMessage({ type: "error", text: "Failed to fetch departments. Please try again later." });
      }
    }
  };

  const handleDepartmentChange = async (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    setDoctor("default");
    setAppointmentDate("");
    setPreferredTimeSlot("default");
    setDoctors([]);
    setTimeSlots([]);

    if (selectedDepartment !== "default" && hospital !== "default") {
      try {
        const response = await axios.get(`${URL}/${hospital}/doctors?department=${selectedDepartment}`);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setMessage({ type: "error", text: "Failed to fetch doctors. Please try again later." });
      }
    }
  };

  const handleAppointmentDateChange = async (e) => {
    const selectedDate = e.target.value;
    setAppointmentDate(selectedDate);
    setPreferredTimeSlot("default");
    setTimeSlots([]);

    if (selectedDate && doctor !== "default") {
      try {
        const response = await axios.get(`${URL}/${doctor}/slot?date=${selectedDate}`);
        setTimeSlots(response.data);
      } catch (error) {
        console.error("Error fetching time slots:", error);
        setMessage({ type: "error", text: "Failed to fetch time slots. Please try again later." });
      }
    }
  };

  const formatTime = (time) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toLocaleTimeString([], options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const errors = {};

    if (hospital === "default") errors.hospital = "Please select a hospital";
    if (department === "default") errors.department = "Please select a department";
    if (doctor === "default") errors.doctor = "Please select a doctor";
    if (!appointmentDate) {
      errors.appointmentDate = "Appointment date is required";
    } else if (new Date(appointmentDate) < new Date().setHours(0, 0, 0, 0)) {
      errors.appointmentDate = "Appointment date must be today or in the future";
    }
    if (preferredTimeSlot === "default") errors.preferredTimeSlot = "Please select a time slot";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    const appointmentData = {
      doctorId: doctor,
      appointmentDate: appointmentDate,
      slot: preferredTimeSlot,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${patientURL}/appointment`,
        appointmentData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage({ type: "success", text: "Appointment booked successfully!" });
        setHospital("default");
        setDepartment("default");
        setDoctor("default");
        setAppointmentDate("");
        setPreferredTimeSlot("default");
      } else {
        setMessage({ type: "error", text: response.data.message || "Failed to book appointment. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      setMessage({ type: "error", text: "Failed to book appointment. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="appointment-form-section">
        <div className="form-container">
          <h2 className="form-title">Book Appointment Online</h2>
          {message && <p className={`message ${message.type}`}>{message.text}</p>}
          <form className="form-content" onSubmit={handleSubmit}>
            <label>
              Select Hospital:
              <select value={hospital} onChange={handleHospitalChange}>
                <option value="default">Select a Hospital</option>
                {hospitals.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.hospitalName}
                  </option>
                ))}
              </select>
              {formErrors.hospital && <p className="error-message">{formErrors.hospital}</p>}
            </label>

            <label>
              Select Department:
              <select
                value={department}
                onChange={handleDepartmentChange}
                disabled={hospital === "default"}
              >
                <option value="default">Select a Department</option>
                {departments.map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {formErrors.department && <p className="error-message">{formErrors.department}</p>}
            </label>

            <label>
              Select Doctor:
              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                disabled={department === "default"}
              >
                <option value="default">Select a Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
              {formErrors.doctor && <p className="error-message">{formErrors.doctor}</p>}
            </label>

            <label>
              Appointment Date:
              <input
                type="date"
                value={appointmentDate}
                onChange={handleAppointmentDateChange}
                disabled={doctor === "default"}
              />
              {formErrors.appointmentDate && <p className="error-message">{formErrors.appointmentDate}</p>}
            </label>

            <label>
              Preferred Time Slot:
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                disabled={!appointmentDate}
              >
                <option value="default">Select a Time Slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot.slotIndex}>
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </option>
                ))}
              </select>
              {formErrors.preferredTimeSlot && <p className="error-message">{formErrors.preferredTimeSlot}</p>}
            </label>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Confirm Appointment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
