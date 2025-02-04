import React, { useState } from "react";
import axios from "axios";
import { message, Input, Button, Form, Spin, Alert } from "antd";
import { pharmacyURL } from "../../Api & Services/Api"; // Make sure this URL is correct.

const BuyMedications = () => {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async (medicationId) => {
    if (quantity <= 0) {
      message.error("Quantity must be greater than 0");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${pharmacyURL}/${medicationId}/medications`,{},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { quantity },
        }
      );
        setSuccess(true);
        message.success(response.data.message || "Medication successfully added to your list!");
    } catch (err) {
        setError(err?.response?.data?.message || "Error while purchasing medication");
        console.error("Error while purchasing medication: ", err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="buy-medication-container" style={{ padding: "20px" }}>
      <h2>Buy Medication</h2>
      
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "20px" }} />}
      {success && <Alert message="Medication successfully added to your list!" type="success" showIcon style={{ marginBottom: "20px" }} />}

      <Form layout="vertical" onFinish={() => handleSubmit(123)}>
        <Form.Item label="Quantity" required>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
          {loading ? "Processing..." : "Buy Medication"}
        </Button>
      </Form>
    </div>
  );
};

export default BuyMedications;
