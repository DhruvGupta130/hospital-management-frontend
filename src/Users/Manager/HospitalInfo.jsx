import { Card, Row, Col, Typography, Button, Carousel, Layout } from 'antd';
import { displayImage } from "../../Api & Services/Api.js";
import { PhoneOutlined, MailOutlined, GlobalOutlined, HomeOutlined, FieldTimeOutlined, ShopOutlined, SafetyCertificateOutlined, HeartOutlined, HddOutlined, EnvironmentOutlined, BankOutlined, CompassOutlined } from '@ant-design/icons'; 
import PropTypes, { string } from 'prop-types';
import { stringToList } from '../../Api & Services/Services.js';

const { Title, Text } = Typography;
const { Content } = Layout;

const HospitalInfo = ({ hospital }) => {
  const redirectToMap = () => {
    const { latitude, longitude } = hospital.address;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const TextDetails = ({ icon, label, value }) => (
    <p style={{ fontSize: "18px", margin: "10px 0" }}>
      {icon}{" "}
      <Text strong style={{ fontSize: "18px", color: "#333" }}>
        {label}:
      </Text>{" "}
      <span style={{ fontSize: "20px", color: "#555" }}>{value}</span>
    </p>
  );

  return (
    <Layout>
      <Content>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              title={
                <Title
                  className="hospital-title"
                  style={{
                    fontSize: 33,
                    color: '#1d300f',
                    textAlign: 'center',
                    textWrap: 'wrap'
                  }}
                >
                  {hospital.hospitalName.toUpperCase()}
                </Title>
              }
            >
              <Row gutter={[24, 24]}>
                {/* Image Carousel */}
                {hospital.images && hospital.images.length > 0 && (
                  <Col xs={24} md={12} style={{ display: "flex", flexDirection: "column" }}>
                    <Card
                      bordered={false}
                      style={{
                        flex: 1, // Makes both columns equal height
                        backgroundColor: "#f8fafc",
                        borderRadius: "16px",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Carousel autoplay effect="fade" style={{ borderRadius: "16px", flexGrow: 1 }}>
                        {hospital.images.map((image, index) => (
                          <div key={index} style={{ height: "100%" }}>
                            <img
                              src={displayImage(image)}
                              alt={`Hospital Image ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "16px",
                                minHeight: "300px",
                                maxHeight: "500px",
                              }}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Card>
                  </Col>
                )}

                  {/* Hospital Details */}
                  <Col xs={24} md={12} style={{ display: "flex" }}>
                    <Card
                      bordered={false}
                      style={{
                        flex: 1, // Ensures equal height with the carousel
                        backgroundColor: "#f8fafc",
                        borderRadius: "16px",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center", // Centers content in the card
                      }}
                    >
                      <Title level={3} style={{ color: "#457b9d", marginTop: 0 }}>
                        <ShopOutlined style={{ marginRight: "8px" }} />
                        Hospital Information
                      </Title>

                      <TextDetails icon={<HomeOutlined />} label="Name" value={hospital.hospitalName} />
                      <TextDetails icon={<PhoneOutlined />} label="Mobile" value={hospital.mobile} />
                      <TextDetails icon={<MailOutlined />} label="Email" value={hospital.email} />
                      <TextDetails icon={<GlobalOutlined />} label="Website" value={<a href={hospital.website} target="_blank" rel="noopener noreferrer" style={{ color: "#1d3557" }}>{hospital.website}</a>} />
                      <TextDetails icon={<SafetyCertificateOutlined />} label="Emergency Services" value={hospital.emergencyServices ? "Available" : "Not Available"} />
                      <TextDetails icon={<HeartOutlined />} label="ICU Capacity" value={hospital.icuCapacity} />
                      <TextDetails icon={<HddOutlined />} label="Bed Capacity" value={hospital.bedCapacity} />
                      <TextDetails icon={<ShopOutlined />} label="Operation Theaters" value={hospital.operationTheaters} />
                      <TextDetails icon={<FieldTimeOutlined />} label="Established Year" value={hospital.establishedYear} />
                    </Card>
                  </Col>
                <Col xs={24}>
                  {/* Additional Fields */}
                  <Card style={{ marginBottom: 20 }}>
                    <Title level={2} style={{ color: '#457b9d', marginBottom: 0, marginTop: 10 }}>
                      <HomeOutlined style={{ marginRight: '8px' }} />
                      Address
                    </Title>

                    <div style={{ padding: 10 }}>
                      <p style={{ fontSize: '20px' }}>
                        <EnvironmentOutlined style={{ marginRight: '8px', color: '#1d3557' }} />
                        <Text style={{ fontSize: '18px' }} strong>Street: </Text>
                        {hospital.address.street}
                      </p>

                      <p style={{ fontSize: '20px' }}>
                        <BankOutlined style={{ marginRight: '8px', color: '#1d3557' }} />
                        <Text style={{ fontSize: '18px' }} strong>City: </Text>
                        {hospital.address.city}
                      </p>

                      <p style={{ fontSize: '20px' }}>
                        <CompassOutlined style={{ marginRight: '8px', color: '#1d3557' }} />
                        <Text style={{ fontSize: '18px' }} strong>State: </Text>
                        {hospital.address.state}
                      </p>

                      <p style={{ fontSize: '20px' }}>
                        <MailOutlined style={{ marginRight: '8px', color: '#1d3557' }} />
                        <Text style={{ fontSize: '18px' }} strong>Zip: </Text>
                        {hospital.address.zip}
                      </p>
                    </div>

                    <Button
                      type="primary"
                      onClick={redirectToMap}
                      style={{
                        background: 'linear-gradient(90deg, #457b9d, #1d3557)',
                        border: 'none',
                        fontSize: '20px',
                      }}
                    >
                      View on Map
                    </Button>
                  </Card>

                  <Card>
                  <div>
                    <Title level={2} style={{ color: '#457b9d', marginBottom: 5, marginTop: 10 }}>
                      <ShopOutlined style={{ marginRight: '8px' }} />
                      Overview
                    </Title>
                    <Text style={{ fontSize: '18px' }}>{hospital.overview}</Text>
                  </div>
                  <div>
                    <Title level={2} style={{ color: '#457b9d', marginBottom: 5, marginTop: 10 }}>
                      <ShopOutlined style={{ marginRight: '8px' }} />
                      Specialities
                    </Title>
                    <Text style={{ fontSize: '18px' }}>
                      <ul>
                        {hospital.specialities.map((partner, index) => (
                          <li key={index}><strong>{partner}</strong></li>
                        ))}
                      </ul>
                    </Text>
                  </div>
                  <div>
                    <Title level={2} style={{ color: '#457b9d', marginBottom: 5, marginTop: 10 }}>
                      <ShopOutlined style={{ marginRight: '8px' }} />
                      Hospital Technology
                    </Title>
                    <Text style={{ fontSize: '18px' }}>
                          <ul>
                            {stringToList(hospital.technology).map((statement, index) => (
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
                        {stringToList(hospital.accreditations).map((statement, index) => (
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
                        {hospital.insurancePartners.map((partner, index) => (
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

HospitalInfo.propTypes = {
  hospital: PropTypes.shape({
    hospitalName: PropTypes.string.isRequired,
    mobile: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    establishedYear: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    specialities: PropTypes.string.isRequired,
    emergencyServices: PropTypes.string.isRequired,
    bedCapacity: PropTypes.number.isRequired,
    icuCapacity: PropTypes.number.isRequired,
    operationTheaters: PropTypes.number.isRequired,
    technology: PropTypes.string.isRequired,
    accreditations: PropTypes.string.isRequired,
    insurancePartners: PropTypes.arrayOf(string).isRequired,
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
};

export default HospitalInfo;
