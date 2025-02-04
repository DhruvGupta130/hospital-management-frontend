import React from "react";
import { Card, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { displayImage } from "../Api & Services/Api";

const { Title, Text } = Typography;

const DoctorCard = ({ doctor, onSelect, selected }) => {
  return (
    <Card
      hoverable
      onClick={onSelect}
      style={{
        width: 320,
        textAlign: "center",
        borderRadius: 10,
        backgroundColor: selected === doctor ? "#89CFF0" : "#f0f2f5",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      <Avatar
        size={100}
        src={displayImage(doctor.image) || null} 
        icon={!doctor.image && <UserOutlined />}
        style={{ backgroundColor: "#d9d9d9" }}
      />
      <Title level={5} style={{ marginTop: 10 }}>
        Dr. {doctor.fullName}
      </Title>
      <Text type="secondary">{doctor.speciality}</Text>
    </Card>
  );
};

export default DoctorCard;