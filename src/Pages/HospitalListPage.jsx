import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../Api & Services/Api.js';
import { Input, Button, Card, Spin, Alert, Row, Col, Typography, InputNumber } from 'antd';
import { Divider, Paper, Box } from '@mui/material';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { CardContent, CardMedia } from '@mui/material'; // Correct import for CardContent

const { Search } = Input;
const { Title, Text } = Typography;

const HospitalListPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [radius, setRadius] = useState(100);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setErrorMessage('Geolocation is not enabled or supported.');
        }
      );
    }
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
        if (response.data.length === 0) {
          setErrorMessage('No hospitals found within the specified radius.');
        }
      } catch (error) {
        setErrorMessage('Error fetching hospitals. Try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Unable to fetch your location.');
    }
  };

  return (
    <div className="hospital-list-container" style={{ padding: '20px', backgroundColor: '#f4f6f8' }}>
      <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>Find Nearby Hospitals</Title>
      
      <Paper elevation={3} style={{ padding: 20, marginBottom: 20, borderRadius: 10 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Search
              placeholder="Search hospital name"
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              enterButton
            />
          </Col>
          <Col xs={24} sm={6}>
            <InputNumber
              min={10}
              value={radius}
              onChange={(value) => setRadius(value)}
              size="large"
              style={{ width: '100%' }}
              addonAfter="km"
            />
          </Col>
          <Col xs={24} sm={6}>
            <Button type="primary" size="large" onClick={fetchHospitals} block>
              Search <SearchOutlined />
            </Button>
          </Col>
        </Row>
      </Paper>

      {errorMessage && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: 20 }} />}

      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => {
              const linkTo = `/details/hospital/${hospital.hospitalName}`;
              return (
                <Col xs={24} sm={12} md={8} key={hospital.id}>
                  <Card
                    hoverable
                    style={{
                      width: 300,
                      height: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Box style={{ width: '100%', height: 200, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {hospital.image ? (
                          <CardMedia component="img" alt={hospital.hospitalName} image={hospital.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <LocalHospitalIcon style={{ fontSize: '80px', color: '#888' }} />
                        )}
                      </Box>
                      <CardContent style={{ padding: '16px' }}>
                        <Title level={5} style={{ color: '#1890ff', fontWeight: 600 }}>{hospital.hospitalName}</Title>
                        <Text>
                          <EnvironmentOutlined /> {hospital.address.street}, {hospital.address.city}, {hospital.address.state}
                        </Text>
                        <Divider />
                        <Text strong>Established:</Text> {hospital.establishedYear || 'N/A'}
                        <br />
                        <Text strong>Email:</Text> <a href={`mailto:${hospital.email}`}>{hospital.email}</a>
                        <br />
                        <Text strong>Website:</Text> <a href={`http://${hospital.website}`} target="_blank" rel="noopener noreferrer">{hospital.website}</a>
                      </CardContent>
                    </Link>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Text style={{ textAlign: 'center', width: '100%' }}>No hospitals found.</Text>
          )}
        </Row>
      )}
    </div>
  );
};

export default HospitalListPage;
