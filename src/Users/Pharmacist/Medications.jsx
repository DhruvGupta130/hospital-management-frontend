import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Input, message, Card, Spin, Alert } from 'antd';
import { PaperClipOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons';
import { pharmacyURL } from '../../Api & Services/Api';
import Dragger from 'antd/es/upload/Dragger';
import Title from 'antd/es/typography/Title';

const Medications = () => {
  const [Medications, setMedications] = useState([]);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isBulkUploadModalVisible, setIsBulkUploadModalVisible] = useState(false);
  const [newMedications, setNewMedications] = useState({
    medicationName: '',
    compositionName: '',
    dosageForm: '',
    strength: '',
    quantity: '',
    expiry: '',
    manufacturer: '',
    price: '',
    batchNumber: '',
  });
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const fetchMedications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${pharmacyURL}/medications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMedications(response.data);
    } catch (error) {
      if(error.response.status !=500){
        setError(error?.response?.data?.message);
      } else{
        setError("Error while fetching Medications. Please try again!");
      }
      console.error("Error in fetching Medications: ", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedications((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterModalOpen = () => {
    setIsRegisterModalVisible(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalVisible(false);
    setNewMedications({
        medicationName: '',
        compositionName: '',
        dosageForm: '',
        strength: '',
        quantity: '',
        expiry: '',
        manufacturer: '',
        price: '',
        batchNumber: '',
    });
  };

  const handleBulkUploadModalOpen = () => {
    setIsBulkUploadModalVisible(true);
  };

  const handleBulkUploadModalClose = () => {
    setIsBulkUploadModalVisible(false);
    setFileList([]);
  };

  const handleRegisterMedications = async () => {
    if (
      !newMedications.medicationName ||
      !newMedications.compositionName ||
      !newMedications.dosageForm ||
      !newMedications.strength ||
      !newMedications.quantity ||
      !newMedications.expiry ||
      !newMedications.manufacturer ||
      !newMedications.price ||
      !newMedications.batchNumber
    ) {
      message.error('Please fill in all the required fields.');
      return;
    }
    try {
      const response = await axios.post(`${pharmacyURL}/medications/add`, newMedications, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success(response.data?.message);
      setIsRegisterModalVisible(false);
      await fetchMedications();
    } catch (error) {
      message.error(error?.response?.data?.message || 'An error occurred, please try again');
      console.error("Error in adding Medications: ", error);
    }
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const handleBulkRegister = async () => {
    if (fileList.length === 0) {
      message.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileList[0]?.originFileObj);

    try {
      const response = await axios.post(`${pharmacyURL}/medications/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success(response.data?.message);
      setFileList([]);
      await fetchMedications();
      handleBulkUploadModalClose();
    } catch (error) {
      message.error(error?.response?.data?.message || 'An error occurred, please try again');
      console.error("Error in fetching Medications: ", error);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div className="Medications-details" style={{ padding: '24px' }}>
          <Card title={<Title level={3}>Medications List</Title>} className="Medications-list-card">
            {loading ? (
              <Spin
                tip="Loading Medications..."
                size="large"
                style={{ display: "block", margin: "auto" }}
              >
                <div style={{height: '200px'}}/>
              </Spin>
            ) : error ? (
              <Alert message={error} type="error" showIcon/>
            ) : (
                <Table
                dataSource={Medications}
                rowKey="id"
                columns={[
                    {
                        title: "",
                        dataIndex: "isExpired",
                        key: "status",
                        render: (isExpired) => {
                          return isExpired ? (
                            <div
                              style={{
                                height: "10px",
                                width: "10px",
                                backgroundColor: "red",
                                borderRadius: "50%",
                                margin: "auto",
                              }}
                            />
                          ) : null;
                        },
                    },
                    { title: "Medication Name", dataIndex: "medicationName", key: "medicationName" },
                    { title: "Composition Name", dataIndex: "compositionName", key: "compositionName" },
                    { title: "Strength", dataIndex: "strength", key: "strength" },
                    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                    { title: "Expiry", dataIndex: "expiry", key: "expiry" },
                    { title: "Manufacturer", dataIndex: "manufacturer", key: "manufacturer" },
                    { title: "Batch Number", dataIndex: "batchNumber", key: "batchNumber" },
                ]}
                bordered
                className="Medications-table"
                scroll={{ x: "max-content" }}
                style={{ marginBottom: "16px" }}
              />
              
            )}
            {!loading && !error && (
              <div className='button-box'>
                <Button type="primary" icon={<UserAddOutlined />} onClick={handleRegisterModalOpen} className="register-button" style={{ width: '100%' }}>
                  Add New Medication
                </Button>
                <Button type="primary" icon={<UploadOutlined />} onClick={handleBulkUploadModalOpen} className="register-button" style={{ width: '100%' }}>
                  Add Multiple Medications
                </Button>
              </div>
            )}
          </Card>

      <Modal
        title={<Title level={3}>Add Bulk Medications</Title>}
        open={isBulkUploadModalVisible}
        onOk={handleBulkRegister} 
        confirmLoading={load}
        onCancel={handleBulkUploadModalClose}
        footer={null}
        className="upload-modal"
        style={{ borderRadius: '8px' }}
      >
        <Card>
          <Dragger
            {...uploadProps}
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            accept=".xlsx, .xls"
            style={{
              padding: '16px',
              border: '1px dashed #d9d9d9',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p className="ant-upload-drag-icon">
              <PaperClipOutlined style={{ fontSize: '32px' }} />
            </p>
            <p className="ant-upload-text">Drag or click to select Excel files (.xls, .xlsx)</p>
            <p className="ant-upload-hint">Ensure the file matches the required format.</p>
          </Dragger>

          <Button
            icon={<UploadOutlined />}
            type="primary"
            onClick={handleBulkRegister}
            className="upload-button"
            disabled={fileList.length === 0 || load}
            style={{ marginTop: '16px', width: '100%' }}
          >
            Upload Medications via Excel
          </Button>
        </Card>
      </Modal>

      <Modal
        title={<Title level={3}>Add Medication</Title>}
        open={isRegisterModalVisible}
        onOk={handleRegisterMedications}
        onCancel={handleRegisterModalClose}
        footer={null}
        confirmLoading={load}
        className="register-modal"
        style={{ borderRadius: '8px' }}
      >
        <Card>
        <Form layout="vertical" style={{ gap: '16px' }}>
            {[
                "medicationName",
                "compositionName",
                "dosageForm",
                "strength",
                "quantity",
                "expiry",
                "manufacturer",
                "price",
                "batchNumber",
            ].map((field) => (
                <Form.Item
                label={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                key={field}
                style={{ marginBottom: "16px" }}
                >
                <Input
                    name={field}
                    value={newMedications[field]}
                    onChange={handleInputChange}
                    type={
                    field === "expiry"
                        ? "date"
                        : field === "quantity" || field === "price"
                        ? "number"
                        : "text"
                    }
                />
                </Form.Item>
            ))}
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={handleRegisterMedications}
              className="register-button"
              style={{ width: "100%" }}
              disabled={load}
            >
              Register New Medications
            </Button>
            </Form>

        </Card>
      </Modal>
    </div>
  );
};

export default Medications;
