import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar';
import "./Pharmacy.css";
import Pharmacy from './Pharmacy';
import PharmacistProfile from './PharmacistProfile';
import Medications from './Medications';


const CustomRoutesPharmacy = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
          <Route path='/profile' element={<Pharmacy/>}/>
          <Route path='/pharmacist/profile' element={<PharmacistProfile/>} />
          <Route path='/medications' element = {<Medications/>} />
          <Route path='/history'/>
          <Route path='lab-results'  />
          <Route path='/settings' />
      </Routes>
    </div>
  )
}

export default CustomRoutesPharmacy;