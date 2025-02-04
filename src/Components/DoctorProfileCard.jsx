import { Avatar, Button, Card, Row, Space, Tag, Typography } from "antd";
import { displayImage } from "../Api & Services/Api";
import { GlobalOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

const {Title, Text} = Typography;

const DoctorProfileCard = ({ doctors, setOpenModal, setSelectedDoctor }) => {
    return (
        <Row style={{gap: 20}}>
        {doctors && doctors.map((doctor) => (
            <Card
            hoverable
            style={{
            width: 329,
            borderRadius: 10,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
            }}
        >
            <div style={{textAlign: 'center'}}>
            <Avatar size={100} icon={<UserOutlined />} src={displayImage(doctor.image)} />
            <Title level={4} style={{ marginTop: 10 }}>{doctor.fullName}</Title>
            <Tag color="purple">{doctor.speciality}</Tag>
            <Tag color="purple">{doctor.department}</Tag>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Space direction="vertical" size="small" style={{ marginTop: 10 }}>
                <Text style={{fontSize: 16}}><PhoneOutlined /> {doctor.mobile}</Text>
                <Text style={{fontSize: 16}}><MailOutlined /> {doctor.email}</Text>
                <Text style={{fontSize: 16}}><GlobalOutlined /> License: {doctor.licenseNumber}</Text>
                <Button type="primary" style={{width: '100%'}} 
                onClick={() => {
                    setOpenModal(true);
                    setSelectedDoctor(doctor);
                }}
                >Book Appointment</Button>
            </Space>
            </div>
        </Card>
        ))}
        </Row>
    );
}

export default DoctorProfileCard;