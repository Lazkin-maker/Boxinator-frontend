import{ useParams } from 'react-router-dom'
import EditSatus from '../../components/Admin/StatusEdit/EditStatus';
import data from "./Admindummy.json";



const EditShipmentStatus = () => {

  const { shipmentId } = useParams();
  const shipmentObj = data.shipments.find(packageObj => packageObj.id === shipmentId);
  const headings = ["ID", "Recipient", "Destination", "Price", "Status"];

  return (

    <div className='w-5/6 h-5/6 mt-56'>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
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
                <EditSatus shipment={shipmentObj} />
              </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default EditShipmentStatus;