import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar';
import "./Doctor.css";
import DoctorProfile from './DoctorProfile.jsx';
import Schedules from './Schedules.jsx';
import AppointmentContainer from './AppointmentContainer.jsx';
import Patients from './Patients.jsx';

const CustomRoutesDoctor = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
          <Route path='/profile' element={<DoctorProfile/>}/>
          <Route path='/appointments' element={<AppointmentContainer/>} />
          <Route path='/schedule' element={<Schedules/> } />
          <Route path='/patients' element={<Patients/>} />
          <Route path='lab-results'  />
          <Route path='/settings' />
      </Routes>
    </div>
  )
}

export default CustomRoutesDoctor;