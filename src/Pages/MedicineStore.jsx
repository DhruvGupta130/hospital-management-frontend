import React, { useState, useEffect } from "react";
import axios from "axios";
import { patientURL } from "../Api & Services/Api.js";
import { Card, Button, Input, message, Typography, Row, Col } from "antd";
import { ShoppingCartOutlined, CheckCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ Import useSearchParams
import MedicationCard from "../Components/MedicationCard.jsx";
import CartSummary from "../Components/CartSummary.jsx";
import { Box, CircularProgress } from "@mui/material";

const { Title } = Typography;

const BuyMedicationsPage = () => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "false") {
      navigate("/login");
    } else if (localStorage.getItem("role") !== "ROLE_PATIENT") {
      navigate("/not-authorized");
    }
  }, []);

  useEffect(() => {
    fetchMedications();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, medications]);

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${patientURL}/medications/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedications(res.data);
      setFilteredMedications(res.data);
    } catch (err) {
      message.error("Error fetching medications.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchParams(value ? { search: value } : {});
    const filtered = medications.filter((med) =>
      med.medicationName.toLowerCase().includes(value.toLowerCase()) || 
      med.compositionName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMedications(filtered);
  };

  const handleQuantityChange = (medicationId, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [medicationId]: quantity > 0 ? quantity : 0,
    }));
  };

  const handlePurchase = async () => {
    if (Object.keys(cart).length === 0 || Object.values(cart).every((qty) => qty === 0)) {
      message.warning("Please add at least one medication.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${patientURL}/medications/buy`, cart, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success(res.data.message || "Medications purchased successfully!");
      setCart({});
      navigate("/patient/medications");
    } catch (err) {
      message.error(err.response?.data?.message || "Error purchasing medications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card
        style={{
          borderRadius: 12,
          background: "#f9f9f9",
          padding: 15,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
          💊 Buy Medications
        </Title>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <div>
            <Col xs={24} style={{ display: "flex", justifyContent: "center", margin: 20 }}>
              <Input
                placeholder="Search medication..."
                size="large"
                allowClear
                value={searchQuery} // ✅ Sync with URL
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  width: 500,
                  borderRadius: 6,
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
                prefix={<SearchOutlined />}
              />
            </Col>

            <Row gutter={[16, 16]} justify="start">
              {filteredMedications.length > 0 ? (
                filteredMedications.map((med) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={med.id}>
                    <MedicationCard med={med} cart={cart} handleQuantityChange={handleQuantityChange} />
                  </Col>
                ))
              ) : (
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                  <Title level={4} style={{ color: "#ff4d4f" }}>
                    No medications found.
                  </Title>
                </div>
              )}
            </Row>

            {/* Show Cart If Items Selected */}
            {Object.values(cart).some((qty) => qty > 0) && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Col xs={24} md={10}>
                  <CartSummary cart={cart} medications={medications} handleQuantityChange={handleQuantityChange} />
                </Col>
              </div>
            )}

            {filteredMedications.length > 0 && <div style={{ textAlign: "center", marginTop: 20 }}>
              <Col xs={24} style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<CheckCircleOutlined />}
                  onClick={handlePurchase}
                  disabled={Object.values(cart).every((qty) => qty === 0)}
                  style={{
                    backgroundColor: "#52c41a",
                    borderColor: "#52c41a",
                    color: "#fff",
                    width: 500,
                    borderRadius: 6,
                    padding: "10px 20px",
                    fontSize: "16px",
                  }}
                >
                  Purchase Medications
                </Button>
              </Col>
            </div>}
          </div>
        )}
      </Card>
    </div>
  );
};

export default BuyMedicationsPage;
