import ShipmentListItem from '../ShipmentListItem/ShipmentListItem';

type Props = {
    shipments: {
        id: string;
        recipient: string;
        destination: string;
        boxColor: string;
        status: string;
        email: string | null;
        weight: number;
        price: number;
    }[]
}

function ShipmentList({ shipments }: Props) {
    const headings = ["ID", "Recipient", "Weight", "Box colour", "Destination", "Price", "Status"];

    return (
        <div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((shipment, index) => (
                                <ShipmentListItem shipment={shipment} key={index} />
                            ))}
                        </tbody>
                    </table>
                    <div
                        className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-violet-500 bg-violet-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            &nbsp; &nbsp;
                            <button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-violet-500 bg-violet-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShipmentList