import { Route, Routes } from 'react-router-dom'
import HospitalProfilePage from './HospitalProfilePage';
import PharmacyProfilePage from './PharmacyProfilePage';
import DoctorProfile from './DoctorProfile';
import MedicationProfile from './MedicationProfile';

const CustomRoutesPages = () => {
  return (
    <div>
      <Routes>
        <Route path="/hospital/:id" element={<HospitalProfilePage />} />
        <Route path="/pharmacy/:id" element={<PharmacyProfilePage />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/medication/:id" element={<MedicationProfile />} />
      </Routes>
    </div>
  )
}

export default CustomRoutesPages;