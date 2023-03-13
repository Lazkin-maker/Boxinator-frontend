import Status from '../../enums/status'
import { Link } from 'react-router-dom'
import Shipment from '../../models/shipment'
import StatusDisplay from '../StatusDisplay/StatusDisplay'

type Props = {
    shipment: Shipment,
}

function ShipmentListItem({ shipment }: Props) {
    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{shipment.id}</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{shipment.recipient}</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{shipment.weight} kg</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{shipment.boxColor}</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{shipment.destination}</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{shipment.price} SEK</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    <StatusDisplay status={shipment.status} />
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">                
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <Link to={`/admin/edit/${shipment.id}`}>Edit Status</Link>
                </button>
            </td>
        </tr>
    )
}

export default ShipmentListItem