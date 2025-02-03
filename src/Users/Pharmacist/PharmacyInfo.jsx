import { Card, Row, Col, Typography, Button, Carousel, Layout, message } from 'antd';
import { displayImage, pharmacyURL } from '../../Api & Services/Api';
import { PhoneOutlined, MailOutlined, GlobalOutlined, HomeOutlined, FieldTimeOutlined, ShopOutlined } from '@ant-design/icons'; 
import PropTypes, { string } from 'prop-types';
import axios from 'axios';
import { stringToList } from '../../Api & Services/Services';

const { Title, Text } = Typography;
const { Content } = Layout;

const PharmacyInfo = ({ Pharmacy, refreshPharmacyData }) => {
  const redirectToMap = () => {
    const { latitude, longitude } = Pharmacy.address;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const isBefore = ((openingTime, closingTime) => {
    let [hours, minutes, seconds] = closingTime.split(':').map(Number);
    const closingTimeDate = new Date();
    closingTimeDate.setHours(hours, minutes, seconds, 0);
    [hours, minutes, seconds] = openingTime.split(':').map(Number);
    const openingTimeDate = new Date();
    openingTimeDate.setHours(hours, minutes, seconds, 0);
    return closingTimeDate > new Date() && openingTime < new Date();
  })

  const handleToggleStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${pharmacyURL}/setStatus`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(response.data.message);
      if (refreshPharmacyData) {
        refreshPharmacyData();
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Unable to update status");
    }
  };

  return (
    <Layout>
      <Content>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              title={
                <Title
                  className="Pharmacy-title"
                  style={{
                    fontSize: 33,
                    color: '#1d300f',
                    textAlign: 'center',
                    textWrap: 'wrap'
                  }}
                >
                  {Pharmacy.pharmacyName.toUpperCase()}
                </Title>
              }
            >
              <Row gutter={[16, 16]} style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Image Carousel */}
                {Pharmacy.images && Pharmacy.images.length > 0 && (
                  <Col xs={24} md={12} style={{ display: "flex", flexDirection: "column" }}>
                    <Card
                      bordered={false}
                      style={{
                        flex: 1,
                        backgroundColor: "#f8fafc",
                        borderRadius: "16px",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Carousel autoplay effect="fade" style={{ borderRadius: '16px' }}>
                        {Pharmacy.images.map((image, index) => (
                          <div key={index}>
                            <img
                              src={displayImage(image)}
                              alt={`Pharmacy Image ${index + 1}`}
                              style={{
                                width: '100%',
                                minHeight: '300px',
                                maxHeight: '400px',
                                objectFit: 'cover',
                                display: 'block',
                                borderRadius: '16px',
                              }}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Card>
                  </Col>
                )}

                {/* Pharmacy Details */}
                <Col xs={24} md={12} style={{ display: "flex" }}>
                  <Card
                    bordered={false}
                    style={{
                      flex: 1,
                      backgroundColor: "#f8fafc",
                      borderRadius: "16px",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center", 
                    }}
                  >
                    <Title level={2} style={{ color: '#457b9d', marginTop: 0 }}>
                      <FieldTimeOutlined style={{ marginRight: '8px' }} />
                      Pharmacy Information
                      <Button
                        type="primary"
                        style={{
                          background: Pharmacy.open ? 'green' : 'red',
                          border: 'none',
                          marginLeft: 5,
                          marginTop: '16px',
                          fontSize: '18px',
                          opacity: isBefore(Pharmacy.openingTime, Pharmacy.closingTime) ? 0.5 : 1,
                          cursor: isBefore(Pharmacy.openingTime, Pharmacy.closingTime) ? 'not-allowed' : 'pointer',
                          color: 'white'
                        }}
                        disabled={isBefore(Pharmacy.openingTime, Pharmacy.closingTime)}
                        onClick={handleToggleStatus}
                      >
                        {Pharmacy.open ? 'Opened' : 'Closed'}
                      </Button>
                    </Title>
                    <p style={{ fontSize: '18px' }}>
                      <ShopOutlined style={{ marginRight: '8px' }} />
                      <Text style={{ fontSize: '18px' }} strong>Name:</Text> {Pharmacy.pharmacyName}
                    </p>
                    <p style={{ fontSize: '18px' }}>
                      <PhoneOutlined style={{ marginRight: '8px' }} />
                      <Text style={{ fontSize: '18px' }} strong>Mobile:</Text> {Pharmacy.mobile}
                    </p>
                    <p style={{ fontSize: '18px' }}>
                      <MailOutlined style={{ marginRight: '8px' }} />
                      <Text style={{ fontSize: '18px' }} strong>Email:</Text> {Pharmacy.email}
                    </p>
                    <p style={{ fontSize: '18px' }}>
                      <GlobalOutlined style={{ marginRight: '8px' }} />
                      <Text style={{ fontSize: '18px' }} strong>Website:</Text>{' '}
                      <a
                        href={Pharmacy.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1d3557', fontSize: '18px' }}
                      >
                        {Pharmacy.website}
                      </a>
                    </p>
                    <p style={{ fontSize: '18px' }}>
                      <FieldTimeOutlined style={{ marginRight: '8px' }} />
                      <Text style={{ fontSize: '18px' }} strong>Opening Time:</Text> {Pharmacy.openingTime}
                    </p>
                    <p style={{ fontSize: '18px' }}>
                      <FieldTimeOutlined style={{ marginRight: '8px' }} />
                      <Text style={{ fontSize: '18px' }} strong>Closing Time:</Text> {Pharmacy.closingTime}
                    </p>

                    <div>
                      <Title level={4} style={{ color: '#457b9d', marginBottom: 0, marginTop: 10 }}>
                        <HomeOutlined style={{ marginRight: '8px' }} />
                        Address
                      </Title>
                      <Text style={{ fontSize: '18px' }}>
                        {`${Pharmacy.address.street}, ${Pharmacy.address.city}, ${Pharmacy.address.state} - ${Pharmacy.address.zip}, ${Pharmacy.address.country}`}
                      </Text>
                    </div>

                    <Button
                      type="primary"
                      onClick={redirectToMap}
                      style={{
                        background: 'linear-gradient(90deg, #457b9d, #1d3557)',
                        border: 'none',
                        marginTop: '16px',
                        fontSize: '18px',
                      }}
                    >
                      View on Map
                    </Button>
                  </Card>
                </Col>
                <Col xs={24}>
                  {/* Additional Fields */}
                  <Card>
                    <div>
                      <Title level={2} style={{ color: '#457b9d', marginBottom: 5, marginTop: 10 }}>
                        <ShopOutlined style={{ marginRight: '8px' }} />
                        Overview
                      </Title>
                      <Text style={{ fontSize: '18px' }}>{Pharmacy.overview}</Text>
                    </div>

                    <div>
                      <Title level={2} style={{ color: '#457b9d', marginBottom: 5, marginTop: 10 }}>
                        <ShopOutlined style={{ marginRight: '8px' }} />
                        Services
                      </Title>
                      <Text style={{ fontSize: '18px' }}>
                        <ul>
                          {stringToList(Pharmacy.services).map((statement, index) => (
                            <li key={index}>
                              <strong>{statement.heading}: </strong>{statement.descriptionText}
                            </li>
                          ))}
                        </ul>
                      </Text>
                    </div>

                    <div>
                      <Title level={2} style={{ color: '#457b9d', marginBottom: 5, marginTop: 10 }}>
                        <ShopOutlined style={{ marginRight: '8px' }} />
                        Pharmacy Technology
                      </Title>
                      <Text style={{ fontSize: '18px' }}>
                      <ul>
                          {stringToList(Pharmacy.pharmacyTechnology).map((statement, index) => (
                            <li key={index}>
                              <strong>{statement.heading}: </strong>{statement.descriptionText}
                            </li>
                          ))}
                        </ul>
                      </Text>
                    </div>

                    <div>
                      <Title level={2} style={{ color: '#457b9d', marginBottom: 5, marginTop: 10 }}>
                        <ShopOutlined style={{ marginRight: '8px' }} />
                        Accreditations
                      </Title>
                      <Text style={{ fontSize: '18px' }}>
                        <ul>
                          {stringToList(Pharmacy.accreditations).map((statement, index) => (
                            <li key={index}>
                              <strong>{statement.heading}: </strong>{statement.descriptionText}
                            </li>
                          ))}
                        </ul>
                      </Text>
                    </div>

                    <div>
                      <Title level={2} style={{ color: '#457b9d', marginBottom: 5, marginTop: 10 }}>
                        <ShopOutlined style={{ marginRight: '8px' }} />
                        Insurance Partners
                      </Title>
                      <Text style={{ fontSize: '18px' }}>
                        <ul>
                          {Pharmacy.insurancePartners.map((partner, index) => (
                            <li key={index}><strong>{partner}</strong></li>
                          ))}
                        </ul>
                      </Text>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

PharmacyInfo.propTypes = {
  Pharmacy: PropTypes.shape({
    pharmacyName: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    services: PropTypes.string.isRequired,
    pharmacyTechnology: PropTypes.string.isRequired,
    accreditations: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    insurancePartners: PropTypes.arrayOf(string).isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    openingTime: PropTypes.string.isRequired,
    closingTime: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  refreshPharmacyData: PropTypes.func.isRequired,
};

export default PharmacyInfo;
