import { useState} from 'react';
import{Link,useParams } from 'react-router-dom'
import AdminMobilNavbar from '../../components/Admin/AdminNavbar/AdminMobilNavbar'
import AdminSidebar from '../../components/Admin/AdminNavbar/AdminSidebar'
import EditSatus from '../../components/Admin/StatusEdit/EditStatus';
import data from "./Admindummy.json";



const EditShipmentStatus = () => {

  const { shipmentId } = useParams();
  const shipmentObj = data.shipments.find(packageObj => packageObj.id === shipmentId);

  return (

    <div className='w-5/6 h-5/6'>
      <EditSatus shipment={shipmentObj} />
    </div>

  )
}

export default EditShipmentStatus;