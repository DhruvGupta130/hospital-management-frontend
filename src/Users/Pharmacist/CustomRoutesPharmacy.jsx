import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar';
import Pharmacy from './Pharmacy';
import PharmacistProfile from './PharmacistProfile';
import Medications from './Medications';
import "./Pharmacy.css";


const CustomRoutesPharmacy = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
          <Route path='/profile' element={<Pharmacy/>}/>
          <Route path='/pharmacist/profile' element={<PharmacistProfile/>} />
          <Route path='/medications' element = {<Medications/>} />
      </Routes>
    </div>
  )
}

export default CustomRoutesPharmacy;