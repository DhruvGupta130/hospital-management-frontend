import { useEffect, useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { Delete, Update } from '@mui/icons-material';
import { patientURL, securedURL } from "../../Api & Services/Api.js";
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // State for delete account dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError('');
      }, 2000);
      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordUpdate = async () => {
    if(passwords.oldPassword.length === 0 || passwords.newPassword.length === 0){
      setError('Password cannot be empty!');
      return;
    }
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('New passwords do not match!');
      return;
    }
    try {
      const response = await axios.put(`${securedURL}/update/password`, passwords, {
        "headers":{
          "Authorization": `Bearer ${token}`
        }
      });
      setSuccess(response.data || 'Password updated successfully!');
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message || "Error updating Password");
        console.error("Error update password: ", error);
      } else {
        setError('Error updating password!');
      }
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${patientURL}/delete`,{
        "headers":{
          "Authorization": `Bearer ${token}`
        }
      }); 
      setOpenDialog(false);
      alert(response.data.message);
      navigate("/logout");
      
    } catch (error) {
      if(error.response?.data?.message){
        setError(error.response.data.message);
      } else{
        setError('An error occurred, please try again');
      }
      console.error("Error in deleting account: ", error);
      setOpenDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
    {error && 
      <div className='error-box'>
        <Alert sx={{ display: "flex", justifyContent: "center", fontSize: "medium" }} severity="error">
          {error}
        </Alert>
      </div>}
    {success && <div className='success-message'>{success}</div>}
    <div className='profile-settings-container'>
      {/* Password Update Section */}
      <div className='update-password'>
        <Typography variant="h5">Change Password</Typography>
        <TextField
          fullWidth
          label="Current Password"
          name="oldPassword"
          type="password"
          value={passwords.oldPassword}
          onChange={handlePasswordChange}
          margin="normal"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="New Password"
          name="newPassword"
          type="password"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          margin="normal"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Confirm New Password"
          name="confirmNewPassword"
          type="password"
          value={passwords.confirmNewPassword}
          onChange={handlePasswordChange}
          margin="normal"
          autoComplete="off"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePasswordUpdate}
          fullWidth
          sx={{ mt: 2 }}
        >
          <Update/>Update Password
        </Button>
      </div>

      {/* Delete Account Section */}
      <div className='delete-account'>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Danger Zone</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
          Deleting your account is a permanent action and cannot be undone. All your data, including personal information and activity history, will be permanently erased from our system. Please ensure that you have backed up any important information before proceeding.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          fullWidth
          sx={{ mt: 2 }}
        >
          <Delete/>Delete Account
        </Button>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone, and all your data will be permanently lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error" disabled={loading}>
            {loading ? "Deleting..." : "Yes, Delete Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
};

export default ProfileSettings;
