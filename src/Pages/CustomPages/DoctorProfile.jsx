import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientURL } from "../../Api & Services/Api";
import { Spin, Typography, Card } from "antd";

const { Title, Text } = Typography;

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctor();
    }, []);

    useEffect(() => {
        if (doctor) {
            navigate(`/consult-doctor?search=${encodeURIComponent(doctor.fullName)}`);
        }
    }, [doctor]);

    const fetchDoctor = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${patientURL}/${id}/doctor`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDoctor(response.data);
        } catch (err) {
            setError(err?.response?.data?.message || "Error fetching doctor profile");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            {loading ? (
                <Spin size="large" style={{ marginTop: 50 }} />
            ) : error ? (
                <Text type="danger" style={{ fontSize: 18 }}>{error}</Text>
            ) : !doctor && (
                <Text type="secondary">No doctor profile found.</Text>
            )}
        </div>
    );
};

export default DoctorProfile;
