import { Link } from 'react-router-dom'
import Shipment from '../../models/shipment'
import StatusDisplay from '../StatusDisplay/StatusDisplay'

type Props = {
    shipment: Shipment,
    showDetails: () => void,
}

function ShipmentListItem({ shipment, showDetails }: Props) {
    return (
        <tr onClick={showDetails} className="cursor-pointer bg-white hover:bg-slate-100">
            <td className="pl-4 pr-2 md:px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-nowrap">{shipment.id}</p>
            </td>

            <td className="px-2 md:px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-nowrap">{shipment.reciverName}</p>
            </td>

            <td className="px-2 md:px-5 py-5 border-b border-gray-200 text-sm hidden lg:table-cell">
                <p className="text-gray-900 whitespace-nowrap">{shipment.weight} kg</p>
            </td>

            <td className="px-2 md:px-5 py-5 border-b border-gray-200 text-sm hidden lg:table-cell">
                <span className="px-10 py-1 rounded-full" style={{ backgroundColor: shipment.boxColor }} />
            </td>

            <td className="px-2 md:px-5 py-5 border-b border-gray-200 text-sm hidden sm:table-cell">
                <p className="text-gray-900 whitespace-nowrap">{shipment.destination}</p>
            </td>

            <td className="px-2 md:px-5 py-5 border-b border-gray-200 text-sm hidden sm:table-cell">
                <p className="text-gray-900 whitespace-nowrap">{shipment.price} SEK</p>
            </td>

            <td className="px-2 md:px-5 py-5 border-b border-gray-200 text-xs sm:text-sm">
                <StatusDisplay statusList={shipment.statusList} />
            </td>

            {/* Edit shipment status button for admin page */}
            {window.location.pathname.includes('admin') && (
                <td className="border-b border-gray-200  text-sm">                
                    <Link to={`/admin/edit/${shipment.id}`} className="px-4 py-2 ml-1 mr-3 bg-transparent hover:bg-violet-500 text-violet-700 font-semibold whitespace-nowrap hover:text-white border border-violet-500 hover:border-transparent rounded">Edit</Link>
                </td>
            )}
        </tr>
    )
}

export default ShipmentListItem