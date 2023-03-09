import { useEffect, useState } from 'react';
import Shipment from '../../models/shipment';
import ShipmentListItem from '../ShipmentListItem/ShipmentListItem';

type Props = {
    shipments: Shipment[]
}

function ShipmentList({ shipments }: Props) {
    const [paginatedItems, setPaginatedItems] = useState<Shipment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const shipmentsPerPage = 4;
    const totalPageCount = Math.ceil(shipments.length / shipmentsPerPage);
    const headings = ["ID", "Recipient", "Weight", "Box colour", "Destination", "Price", "Status"];

    useEffect(() => {
        if (shipments.length <= 4) {
            setPaginatedItems(shipments);
            return;
        }

        setPaginatedItems(shipments.slice(0, shipmentsPerPage))
    }, [shipments])

    const handlePrev = () => {
        if (currentPage === 1) return;

        // decrement current page
        setCurrentPage(currentPage - 1);

        // get previous items
        const start = (currentPage - 2) * shipmentsPerPage;
        const end = (currentPage - 1) * shipmentsPerPage;
        const prevItems = shipments.slice(start, end);

        // set previous items
        setPaginatedItems(prevItems);
    }

    const handleNext = () => {
        if (currentPage === totalPageCount) return;

        // increment current page
        setCurrentPage(currentPage + 1);

        // get next items
        const start = currentPage * shipmentsPerPage;
        const end = (currentPage + 1) * shipmentsPerPage;
        const nextItems = shipments.slice(start, end);

        // set next items
        setPaginatedItems(nextItems);
    }

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
                            {paginatedItems.map((shipment, index) => (
                                <ShipmentListItem shipment={shipment} key={index} />
                            ))}
                        </tbody>
                    </table>

                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Page {currentPage} of {totalPageCount}
                        </span>
                        {shipments.length > 4 && (
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-violet-500 bg-violet-600 font-semibold py-2 px-4 rounded-l disabled:bg-slate-400">
                                    Prev
                                </button>
                                &nbsp; &nbsp;
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPageCount}
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-violet-500 bg-violet-600 font-semibold py-2 px-4 rounded-r disabled:bg-slate-400">
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShipmentList