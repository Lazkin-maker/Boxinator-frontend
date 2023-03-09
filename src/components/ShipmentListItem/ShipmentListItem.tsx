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
        </tr>
    )
}

export default ShipmentListItem