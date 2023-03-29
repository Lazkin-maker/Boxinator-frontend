import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EditSatus from '../../components/Admin/StatusEdit/EditStatus';
import EditSatusMobil from '../../components/Admin/StatusEdit/EditStatusMobil';
import EditConfirmationModal from '../../components/Admin/StatusEdit/EditConfirmationModal';
import { fetchShipmentByIdsAdmin } from '../../api/shipments';
import Shipment from '../../models/shipment';



const EditShipmentStatus = () => {
  const { shipmentId } = useParams();
  const [shipment, setShipments] = useState<Shipment>();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const getShipment = async () => {
    const shipmentObj = await fetchShipmentByIdsAdmin(Number(shipmentId));
    setShipments(shipmentObj)
  }
  useEffect(() => {
    if (shipmentId !== undefined) {
      getShipment()
    }
  }, [])

  return (
    <div className='w-5/6 h-5/6 md:mt-8'>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <h1 className="text-4xl font-bold mb-4">Edit shipment</h1>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <form className="min-w-full leading-normal">
              {shipment && <EditSatus shipment={shipment} setShowConfirmationModal={setShowConfirmationModal}/>}
          </form>
          <EditSatusMobil shipment={shipment} setShowConfirmationModal={setShowConfirmationModal} />
          {showConfirmationModal && (
            <EditConfirmationModal closeModal={() => setShowConfirmationModal(false)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditShipmentStatus;