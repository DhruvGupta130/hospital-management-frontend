import { Route, Routes, Navigate } from 'react-router-dom';
import HospitalProfilePage from './HospitalProfilePage';
import PharmacyProfilePage from './PharmacyProfilePage';
import DoctorProfile from './DoctorProfile';
import MedicationProfile from './MedicationProfile';
import {useEffect} from "react";

const CustomRoutesPages = () => {
    return (
        <Routes>
            <Route path="/hospital/:id" element={<HospitalProfilePage />} />
            <Route path="/pharmacy/:id" element={<PharmacyProfilePage />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/medication/:id" element={<MedicationProfile />} />
        </Routes>
    );
};

export default CustomRoutesPages;