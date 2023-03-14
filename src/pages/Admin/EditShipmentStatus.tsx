import{ useParams } from 'react-router-dom'
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