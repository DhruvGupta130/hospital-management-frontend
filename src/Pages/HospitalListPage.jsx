import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../Api & Services/Api.js';
import { Input, Button, Spin, Alert, Row, Col, Typography, InputNumber, message } from 'antd';
import { Box } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import SearchResultCard from '../Components/SearchResultCard.jsx';

const { Title, Text } = Typography;

const HospitalListPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [radius, setRadius] = useState(100);
  const [locationLoading, setLocationLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setErrorMessage('Geolocation is not enabled or supported. Please enable it to fetch hospitals.');
        setLocationLoading(false); 
      },
      { timeout: 10000 }
    );
  }, []);

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchHospitals = async () => {
    setErrorMessage('');
    setHospitals([]);
    if (radius <= 0 || isNaN(radius)) {
      setErrorMessage('Please enter a valid radius (greater than 0).');
      return;
    }

    if (userLocation.lat && userLocation.lon) {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/nearby/hospital`, {
          params: { latitude: userLocation.lat, longitude: userLocation.lon, radius },
        });
        setHospitals(response.data);
      } catch (error) {
        setErrorMessage('Error fetching hospitals. Try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Unable to fetch your location.');
    }
  };

  useEffect(() => {
    if (userLocation.lat && userLocation.lon && radius > 0) {
      fetchHospitals();
    }
  }, [userLocation, radius]);   

  if (locationLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>Fetching location...</Text>
      </div>
    );
  }

  if (errorMessage) {
    return <Alert message={errorMessage} type="error" showIcon style={{ margin: 20 }} />;
  }

  return (
    <div className="hospital-list-container" style={{ padding: '10px 30px', backgroundColor: '#f4f6f8' }}>
      <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>Find Nearby Hospitals</Title>

      <Box sx={{ marginBottom: 2, borderRadius: 2 }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={14}>
            <Input
              placeholder="Search hospital name"
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suffix={<SearchOutlined />} 
            />
          </Col>
          <Col xs={24} sm={8}>
            <InputNumber
              min={10}
              value={radius}
              onChange={(value) => setRadius(value)}
              size="large"
              style={{ width: '100%' }}
              addonAfter="km"
            />
          </Col>
          <Col xs={24} sm={6} md={2}>
            <Button type="primary" size="large" onClick={fetchHospitals} block>
              Search <SearchOutlined />
            </Button>
          </Col>
        </Row>
      </Box>

      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Row gutter={[24, 24]}>
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <Col xs={24} sm={12} md={10} lg={6} key={hospital.id} style={{ display: 'flex', justifyContent: 'center', margin: 5 }}>
                <SearchResultCard index={hospital.id} result={hospital} type="Hospital" />
              </Col>
            ))
          ) : (
            <Text type='secondary' style={{ textAlign: 'center', width: '100%', fontSize: 16 }}>
              No hospitals found in this area. Try adjusting the search radius.
            </Text>
          )}
        </Row>
      )}
    </div>
  );
};

export default HospitalListPage;
