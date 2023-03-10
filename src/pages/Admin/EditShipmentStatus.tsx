import { useState} from 'react';
import{Link,useParams } from 'react-router-dom'
import AdminMobilNavbar from '../../components/Admin/AdminNavbar/AdminMobilNavbar'
import AdminSidebar from '../../components/Admin/AdminNavbar/AdminSidebar'
import EditSatus from '../../components/Admin/StatusEdit/EditStatus';
import data from "./Admindummy.json";



const EditShipmentStatus = () => {
  
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  }

  const { shipmentId } = useParams();
  const shipmentObj = data.shipments.find(packageObj => packageObj.id === shipmentId);

  return (
    <div className='relative min-h-screen bg-color-black text-white md:flex'>
      <AdminMobilNavbar showMenu={showMenu}/>
      <AdminSidebar menu={menu}/>
      <div className='flex-1 p-10 text-2xl font-bold flex items-center justify-center'>
        <EditSatus shipment={shipmentObj} />
      </div>
    </div>
  )
}

export default EditShipmentStatus;