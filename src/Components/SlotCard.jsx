import React from "react";
import { Card, Typography, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { convertTo12HourFormat } from "../Api & Services/Services";

const { Title } = Typography;

const SlotCard = ({ slot, onSelect, selected }) => {
  return (
    <Card
      hoverable={slot.available}
      onClick={slot.available ? onSelect : null}
      style={{
        width: 300,
        textAlign: "center",
        borderRadius: 10,
        background: slot.available ? slot === selected ? "#D9F7BE" : "#f6ffed" : "#fff1f0",
        cursor: slot.available ? "pointer" : "not-allowed",
        transition: "0.3s",
      }}
    >
      <ClockCircleOutlined style={{ fontSize: 30, color: slot.available ? "#52c41a" : "#ff4d4f" }} />
      <Title level={5} style={{ marginTop: 10 }}>
        {convertTo12HourFormat(slot.startTime)} - {convertTo12HourFormat(slot.endTime)}
      </Title>
      <Tag color={slot.available ? "green" : "red"}>{slot.available ? "Available" : "Not Available"}</Tag>
    </Card>
  );
};

export default SlotCard;
