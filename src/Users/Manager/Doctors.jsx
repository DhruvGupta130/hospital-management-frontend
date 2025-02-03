import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Input, message, Card, Spin, Alert, Select } from 'antd';
import { PaperClipOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons';
import { hospitalURL } from '../../Api & Services/Api';
import Dragger from 'antd/es/upload/Dragger';
import Title from 'antd/es/typography/Title';
import { formatGender, generateLabel } from '../../Api & Services/Services';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isBulkUploadModalVisible, setIsBulkUploadModalVisible] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: '',
    department: '',
    speciality: '',
    licenseNumber: '',
  });
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${hospitalURL}/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data);
    } catch (error) {
      if(error.response.status !=500){
        setError(error?.response?.data?.message);
      } else{
        setError("Error while fetching doctors. Please try again!");
      }
      console.error("Error in fetching doctors: ", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterModalOpen = () => {
    setIsRegisterModalVisible(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalVisible(false);
    setNewDoctor({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      mobile: '',
      department: '',
      speciality: '',
      licenseNumber: '',
    });
  };

  const handleBulkUploadModalOpen = () => {
    setIsBulkUploadModalVisible(true);
  };

  const handleBulkUploadModalClose = () => {
    setIsBulkUploadModalVisible(false);
    setFileList([]);
  };

  const handleRegisterDoctor = async () => {
    setLoad(true);
    if (
      !newDoctor.firstName ||
      !newDoctor.lastName ||
      !newDoctor.department ||
      !newDoctor.speciality ||
      !newDoctor.licenseNumber ||
      !newDoctor.email ||
      !newDoctor.mobile
    ) {
      message.error('Please fill in all the required fields.');
      return;
    }
    try {
      const response = await axios.post(`${hospitalURL}/doctors/register`, newDoctor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success(response.data?.message);
      setIsRegisterModalVisible(false);
      await fetchDoctors();
    } catch (error) {
      message.error(error?.response?.data?.message || 'An error occurred, please try again');
      console.error("Error in adding doctor: ", error);
    } finally {
      setLoad(false);
    }
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const handleBulkRegister = async () => {
    setLoad(true);
    if (fileList.length === 0) {
      message.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileList[0]?.originFileObj);

    try {
      const response = await axios.post(`${hospitalURL}/doctors/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success(response.data?.message);
      setFileList([]);
      await fetchDoctors();
      handleBulkUploadModalClose();
    } catch (error) {
      message.error(error?.response?.data?.message || 'An error occurred, please try again');
      console.error("Error in fetching doctors: ", error);
    } finally {
      setLoad(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
  };

  return (
    <div className="doctors-details" style={{ padding: '24px' }}>
          <Card title={<Title level={3}>Doctor List</Title>} className="doctor-list-card">
            {loading ? (
              <Spin
              tip="Loading Doctors..."
              size="large"
              style={{ display: "block", margin: "auto" }}
              >
                <div style={{ height: "200px" }} />
              </Spin>
            ) : error ? (
              <Alert message={error} type="error" showIcon/>
            ) : (
              <Table
                dataSource={doctors}
                rowKey='id'
                columns={[
                  { title: 'Name', dataIndex: 'fullName', key: 'fullName'},
                  { title: 'Gender', dataIndex: 'gender', key: 'gender', render: (_text, record) => record.gender.charAt(0)+record.gender.substring(1).toLowerCase()},
                  { title: 'Email', dataIndex: 'email', key: 'email' },
                  { title: 'Mobile', dataIndex: 'mobile', key: 'mobile'},
                  { title: 'Speciality', dataIndex: 'speciality', key: 'speciality' },
                  { title: 'Department', dataIndex: 'department', key: 'department' },
                ]}
                bordered
                className="doctor-table"
                scroll={{ x: 'max-content' }}
                style={{ marginBottom: '16px' }}
              />
            )}
            {!loading && !error && (
              <div className='button-box'>
                <Button type="primary" icon={<UserAddOutlined />} onClick={handleRegisterModalOpen} className="register-button" style={{ width: '100%' }}>
                  Add New Doctor
                </Button>
                <Button type="primary" icon={<UploadOutlined />} onClick={handleBulkUploadModalOpen} className="register-button" style={{ width: '100%' }}>
                  Add Multiple Doctors
                </Button>
              </div>
            )}
          </Card>

      <Modal
        title={<h3>Upload Bulk Doctor Details</h3>}
        open={isBulkUploadModalVisible}
        onOk={handleBulkRegister} 
        onCancel={handleBulkUploadModalClose}
        footer={null}
        confirmLoading={load}
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
            {load? `Processing...` :`Upload Doctors via Excel`}
          </Button>
        </Card>
      </Modal>

      <Modal
        title={<h3>Register Doctor</h3>}
        open={isRegisterModalVisible}
        onOk={handleRegisterDoctor}
        onCancel={handleRegisterModalClose}
        footer={null}
        confirmLoading={load}
        className="register-modal"
        style={{ borderRadius: '8px' }}
      >
        <Card>
          <Form layout="vertical" style={{ gap: '16px' }}>
            {['username', 'password', 'firstName', 'lastName', 'gender', 'email', 'mobile', 'department', 'speciality', 'licenseNumber'].map((field) => (
              <Form.Item
                label={generateLabel(field)}
                key={field}
                style={{ marginBottom: '16px' }}
              >
                {field === "gender" ? 
                  <Select 
                    name={field} 
                    value={newDoctor[field]} 
                    onChange={(value) => handleInputChange({ target: { name: field, value } })}
                  >
                    <Select.Option value="" disabled>Select Gender</Select.Option>
                    <Select.Option value="MALE">Male</Select.Option>
                    <Select.Option value="FEMALE">Female</Select.Option>
                    <Select.Option value="OTHER">Other</Select.Option>
                  </Select>
                  : <Input
                  name={field}
                  value={newDoctor[field]}
                  onChange={handleInputChange}
                  type={field === 'password' ? 'password' : 'text'}
                />
                }
              </Form.Item>
            ))}
            <Button 
              type="primary" 
              icon={<UserAddOutlined />} 
              onClick={handleRegisterDoctor} 
              loading={load} className="register-button" 
              style={{ width: '100%' }}
            >
              Register New Doctor
            </Button>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default Doctors;
