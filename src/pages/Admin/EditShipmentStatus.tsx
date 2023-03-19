import{ useParams } from 'react-router-dom'
import{useState} from 'react'
import EditSatus from '../../components/Admin/StatusEdit/EditStatus';
import EditSatusMobil from '../../components/Admin/StatusEdit/EditStatusMobil';
import data from "./Admindummy.json";
import EditConfirmationModal from '../../components/Admin/StatusEdit/EditConfirmationModal';



const EditShipmentStatus = () => {

  const { shipmentId } = useParams();
  const shipmentObj = data.shipments.find(packageObj => packageObj.id === shipmentId);
  const headings = ["ID", "Recipient", "Destination", "Price", "Status"];
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (

    <div className='w-5/6 h-5/6 md:mt-56'>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal hidden md:table">
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
              <EditSatus shipment={shipmentObj} setShowConfirmationModal={setShowConfirmationModal}/>
            </tbody>
          </table>
          <EditSatusMobil  shipment={shipmentObj} setShowConfirmationModal={setShowConfirmationModal}/>
          {showConfirmationModal && (
              <EditConfirmationModal closeModal={() => setShowConfirmationModal(false)} />
            )}
        </div>
      </div>
    </div>

  )
}

export default EditShipmentStatus;