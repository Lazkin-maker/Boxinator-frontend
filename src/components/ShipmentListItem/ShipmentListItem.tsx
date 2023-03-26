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

            <td className="px-2 md:px-5 py-5 border-b border-gray-200 text-sm hidden md:table-cell">
                <p className="text-gray-900 whitespace-nowrap">{shipment.weight} kg</p>
            </td>

            <td className="px-2 md:px-5 py-5 border-b border-gray-200 text-sm hidden sm:table-cell">
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

            {/* Shipment details modal only visible on mobile devices */}
            {/* <td className="pl-2 pr-4 md:px-5 py-5 border-b border-gray-200  text-sm">
                <button onClick={showDetails} className="text-indigo-600 hover:text-indigo-900 underline">Details</button>
            </td> */}

            {/* Edit shipment status button for admin page */}
            {window.location.pathname.includes('admin') && (
                <td className="px-5 py-5 border-b border-gray-200  text-sm">                
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        <Link to={`/admin/edit/${shipment.id}`}>Edit Status</Link>
                    </button>
                </td>
            )}
        </tr>
    )
}

export default ShipmentListItem