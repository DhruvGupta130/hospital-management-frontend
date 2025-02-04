import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Box,
  TextField,
  Grid2,
  CircularProgress,
} from "@mui/material";
import {
  CheckCircleOutline,
} from "@mui/icons-material";
import DepartmentCard from "../Components/DepartmentCard";
import HospitalCard from "../Components/HospitalCard";
import DoctorCard from "../Components/DoctorCard";
import SlotCard from "../Components/SlotCard";
import { patientURL } from "../Api & Services/Api";
import { Card, message, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const AppointmentBookingPage = () => {
  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("isAuthenticated") === "false"){
      navigate('/login');
    }
    else if (localStorage.getItem("role") !== "ROLE_PATIENT") {
      navigate("/not-authorized");
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${patientURL}/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data);
    } catch (err) {
      setError("Error fetching departments.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitals = async (department) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${patientURL}/${department}/hospitals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitals(res.data);
    } catch (err) {
      setError("Error fetching hospitals.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async (hospitalId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${patientURL}/${selectedDepartment}/${hospitalId}/doctors`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctors(res.data);
    } catch (err) {
      setError("Error fetching doctors.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async (doctorId, date) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${patientURL}/${doctorId}/slots?date=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlots(res.data);
    } catch (err) {
      setError("Error fetching slots.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    setLoad(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${patientURL}/appointment`,
        {
          doctorId: selectedDoctor.id,
          slot: selectedSlot.slotIndex,
          appointmentDate: selectedDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(response.data.message || "Appointment booked successfully!");
      navigate("/patient/appointments");
    } catch (err) {
      setError("Error booking appointment.");
    } finally {
      setLoad(false);
    }
  };


  return (
    <Box sx={{ margin: 4 }}>
      <Card
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        title={
          <Title
            level={2}
            style={{
              paddingTop: 20,
              textAlign: "center",
              fontWeight: 600,
              color: "#1890ff",
              textWrap: "wrap",
              wordBreak: 'keep-all'
            }}
          >
            📅 Book an Appointment
          </Title>
        }
      >
        {load ? (
          <Box sx={{ textAlign: "center", padding: 4 }}>
            <CircularProgress />
          </Box>)
          : (<div>

          {error && <Alert message={error} severity="error" showIcon closable />}

          {/* Step 1: Select Department */}
          <Divider>
            <Title style={{ textWrap: "wrap", wordBreak: 'keep-all' }} level={3}>1️⃣ Select a Department</Title>
          </Divider>
          
          <Grid2 container spacing={2} justifyContent="center">
            {departments.map((dept) => (
              <DepartmentCard
                key={dept}
                name={dept}
                selected = {selectedDepartment}
                onSelect={() => {
                  setSelectedDepartment(dept);
                  fetchHospitals(dept);
                }}
              />
            ))}
          </Grid2>

          {selectedDepartment && (
            <>
              <Divider>
                <Title style={{ textWrap: "wrap", wordBreak: 'keep-all' }} level={3}>2️⃣ Choose a Hospital</Title>
              </Divider>
              <Grid2 container spacing={2} justifyContent="center">
                {hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.id}
                    hospital={hospital}
                    selected={selectedHospital}
                    onSelect={() => {
                      setSelectedHospital(hospital);
                      fetchDoctors(hospital.id);
                    }}
                  />
                ))}
              </Grid2>
            </>
          )}

          {/* Step 3: Pick a Doctor */}
          {selectedHospital && (
            <>
              <Divider>
                <Title style={{ textWrap: "wrap", wordBreak: 'keep-all' }} level={3}>3️⃣ Pick a Doctor</Title>
              </Divider>
              <Grid2 container spacing={2} justifyContent="center">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} selected={selectedDoctor} onSelect={() => setSelectedDoctor(doctor)} />
                ))}
              </Grid2>
            </>
          )}

          {/* Step 4: Select Date & Time */}
          {selectedDoctor && (
            <>
              <Divider>
                <Title style={{ textWrap: "wrap", wordBreak: 'keep-all' }} level={3}>4️⃣ Select Date & Time</Title>
              </Divider>
              <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                <TextField
                  label="Select Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  slotProps={{
                      inputLabel: { shrink: true },
                  }}
                  sx={{
                    maxWidth: 500,
                    bgcolor: "white",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#1976D2" },
                      "&:hover fieldset": { borderColor: "#1565C0" },
                      "&.Mui-focused fieldset": { borderColor: "#0D47A1" },
                      "& .MuiInputBase-input": {
                          fontSize: "18px",
                          padding: "12px",
                      },
                          "& .MuiInputLabel-root": {
                          fontSize: "18px",
                      },
                    },
                  }}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    fetchSlots(selectedDoctor.id, e.target.value);
                  }}
                />
              </Box>
              <Grid2 container spacing={2} justifyContent="center">
                {slots.length > 0
                  ? slots.map((slot) => <SlotCard key={slot.slotIndex} slot={slot} selected={selectedSlot} onSelect={() => setSelectedSlot(slot)} />)
                  : selectedDate && <Text type="secondary" style={{fontSize: 18}}>No slots available.</Text>}
              </Grid2>
            </>
          )}

          {/* Confirm Appointment */}
          {selectedSlot && (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleBookAppointment}
                startIcon={<CheckCircleOutline />}
              >
                Confirm Appointment
              </Button>
            </Box>
          )}
        </div>)}
      </Card> 
    </Box>
  );
};

export default AppointmentBookingPage;
