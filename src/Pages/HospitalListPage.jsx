import {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import {URL} from "../Api & Services/Api.js";
import '../Styles/HospitalListPage.css';

const HospitalListPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [radius, setRadius] = useState(10); // default radius 10 km
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
          alert('Geolocation is not supported or enabled.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const degToRad = Math.PI / 180;
    const φ1 = lat1 * degToRad;
    const φ2 = lat2 * degToRad;
    const Δφ = (lat2 - lat1) * degToRad;
    const Δλ = (lon2 - lon1) * degToRad;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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
          params: {
            latitude: userLocation.lat,
            longitude: userLocation.lon,
            radius: radius,
          },
        });

        if (response.data.length === 0) {
          setErrorMessage('No hospitals found in your area within the specified radius.');
        }

        const hospitalsWithDistance = response.data.map((hospital) => {
          const distance = haversineDistance(
            userLocation.lat,
            userLocation.lon,
            hospital.address.latitude,
            hospital.address.longitude
          );
          return {
            ...hospital,
            distance: distance.toFixed(2),
          };
        });

        setHospitals(hospitalsWithDistance);
      } catch (error) {
        setErrorMessage('Error fetching hospitals. Please try again later.');
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Unable to fetch your location.');
    }
  };

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="hospital-list-container" style={{ padding: '20px', backgroundColor: '#f4f6f8' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}>
        Find Nearby Hospitals
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, borderRadius: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search for a hospital"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              placeholder="e.g. XYZ Hospital"
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Radius (in km)"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              variant="outlined"
              min="1"
              step="1"
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={fetchHospitals}
              sx={{
                padding: 1,
                fontWeight: 'bold',
                borderRadius: '5px',
                textTransform: 'none',
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}

      {loading ? (
        <CircularProgress size={40} sx={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Grid container spacing={3}>
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <Grid item xs={12} sm={6} md={4} key={hospital.id}>
                <Card sx={{ borderRadius: '10px', boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {hospital.hospitalName}
                    </Typography>
                    <Typography variant="body2">{hospital.address.street}, {hospital.address.city}, {hospital.address.state}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#555' }}>
                      {hospital.distance} km away
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>{hospital.description}</Typography>
                    <Typography variant="body2">Established: {hospital.establishedYear}</Typography>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: 'space-between', padding: '10px' }}>
                    <Typography variant="body2">
                      Email: <a href={`mailto:${hospital.email}`}>{hospital.email}</a>
                    </Typography>
                    <Typography variant="body2">
                      Website: <a href={`http://${hospital.website}`} target="_blank" rel="noopener noreferrer">{hospital.website}</a>
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center" sx={{ width: '100%' }}>No hospitals found matching your search criteria.</Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default HospitalListPage;
