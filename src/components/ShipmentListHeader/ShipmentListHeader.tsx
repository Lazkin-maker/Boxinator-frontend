function ShipmentListHeader() {
    return (
        <tr>
            <th className="pl-4 pr-2 md:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
            </th>
            <th className="px-2 md:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Recipient
            </th>
            <th className="px-2 md:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                Weight
            </th>
            <th className="px-2 md:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                Box Color
            </th>
            <th className="px-2 md:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                Destination
            </th>
            <th className="px-2 md:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                Price
            </th>
            <th className="pl-2 pr-4 md:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
            </th>

            {window.location.pathname.includes('admin') && (
                <th className="pl-2 pr-4 md:px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    &nbsp;
                </th>
            )}
        </tr>
    )
}

export default ShipmentListHeader