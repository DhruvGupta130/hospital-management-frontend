import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { URL } from '../Api & Services/Api.js';
import { Input, Button, Spin, Alert, Row, Col, Typography, InputNumber } from 'antd';
import { Box } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import SearchResultCard from '../Components/SearchResultCard.jsx';
import {useLocation} from "react-router-dom";

const { Title, Text } = Typography;

const PharmacyListPage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [radius, setRadius] = useState(100);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const locationState = useLocation(); // Detects route changes

  // Check if the user is on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const fetchUserLocation = useCallback(() => {
    setLocationLoading(true);
    setErrorMessage('');

    navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
      if (permission.state === 'denied') {
        setErrorMessage('Location permission denied. Please enable it in your settings.');
        setLocationLoading(false);
        return;
      }

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
            setErrorMessage('Geolocation is not enabled or supported. Please enable it to fetch pharmacies.');
            setLocationLoading(false);
          },
          { timeout: 10000, enableHighAccuracy: true }
      );
    });
  }, []);

  // Force location re-fetch on mobile when navigating back
  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        fetchUserLocation();
      }, 500); // Small delay to allow page re-render on mobile
    } else {
      fetchUserLocation();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUserLocation(); // Force re-fetch when the user returns to the tab
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [locationState, fetchUserLocation, isMobile]);

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchPharmacies = useCallback(async () => {
    setErrorMessage('');
    setPharmacies([]);
    if (radius <= 0 || isNaN(radius)) {
      setErrorMessage('Please enter a valid radius (greater than 0).');
      return;
    }

    if (userLocation.lat && userLocation.lon) {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/nearby/pharmacy`, {
          params: { latitude: userLocation.lat, longitude: userLocation.lon, radius },
        });
        setPharmacies(response.data);
      } catch (error) {
        setErrorMessage('Error fetching pharmacies. Try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Unable to fetch your location.');
    }
  },[radius, userLocation.lat, userLocation.lon]);

  useEffect(() => {
    if (userLocation.lat && userLocation.lon && radius > 0) {
      fetchPharmacies();
    }
  }, [userLocation, radius, fetchPharmacies]);

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
      <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>Find Nearby Pharmacies</Title>

      <Box sx={{ marginBottom: 2, borderRadius: 2 }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={14}>
            <Input
              placeholder="Search pharmacy name"
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
            <Button type="primary" size="large" onClick={fetchPharmacies} block>
              Search <SearchOutlined />
            </Button>
          </Col>
        </Row>
      </Box>

      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Row gutter={[24, 24]}>
          {filteredPharmacies.length > 0 ? (
            filteredPharmacies.map((pharmacy) => (
              <Col xs={24} sm={12} md={10} lg={6} key={pharmacy.id} style={{ display: 'flex', justifyContent: 'center', margin: 5 }}>
                <SearchResultCard index={pharmacy.id} result={pharmacy} type="Pharmacy" />
              </Col>
            ))
          ) : (
            <Text type='secondary' style={{ textAlign: 'center', width: '100%', fontSize: 16 }}>
              No pharmacies found in this area. Try adjusting the search radius.
            </Text>
          )}
        </Row>
      )}
    </div>
  );
};

export default PharmacyListPage;
