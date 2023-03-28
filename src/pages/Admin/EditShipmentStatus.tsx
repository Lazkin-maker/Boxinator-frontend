import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EditSatus from '../../components/Admin/StatusEdit/EditStatus';
import EditSatusMobil from '../../components/Admin/StatusEdit/EditStatusMobil';
import data from "./Admindummy.json";
import EditConfirmationModal from '../../components/Admin/StatusEdit/EditConfirmationModal';
import { fetchShipmentByIdsAdmin } from '../../api/shipments';
import Shipment from '../../models/shipment';



const EditShipmentStatus = () => {

  const { shipmentId } = useParams();
  const [shipment, setShipments] = useState<Shipment>();
  // const shipmentObj = data.shipments.find(packageObj => packageObj.id === shipmentId);

  const headings = ["ID", "Recipient", "Destination", "Price", "Status"];
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

    <div className='w-5/6 h-5/6 md:mt-56'>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          {/* <table className="min-w-full leading-normal hidden md:table">
            <thead>
              <tr>
                {headings.map((heading, index) => (
                    <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {heading}
                    </th>
                ))}    
                <th  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              <EditSatus shipment={shipment} setShowConfirmationModal={setShowConfirmationModal}/>
            </tbody>
          </table> */}
          <form className="min-w-full leading-normal">
            {/* {headings.map((heading, index) => (
              <div key={index} className="flex items-center border-b border-gray-500 py-2">
                <label className="w-1/4 px-4 font-semibold text-white-600">{heading}</label>      
               
              </div>
              
            ))} */}
              {shipment &&
                <EditSatus shipment={shipment} setShowConfirmationModal={setShowConfirmationModal}/>}
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