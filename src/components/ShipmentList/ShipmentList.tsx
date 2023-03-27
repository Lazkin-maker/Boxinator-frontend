import { useEffect, useState } from 'react';
import Shipment from '../../models/shipment';
import ShipmentListHeader from '../ShipmentListHeader/ShipmentListHeader';
import ShipmentListItem from '../ShipmentListItem/ShipmentListItem';
import ShipmentDetailsModal from "../../components/ShipmentDetailsModal/ShipmentDetailsModal";
import Status from '../../enums/status';

type Props = {
    shipments: Shipment[],
    setShipments: (shipments: Shipment[]) => void,
}

function ShipmentList({ shipments, setShipments }: Props) {
    const [paginatedItems, setPaginatedItems] = useState<Shipment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const shipmentsPerPage = 4;
    const totalPageCount = Math.ceil(shipments.length / shipmentsPerPage);

    // For details modal
    const [currentShipment, setCurrentShipment] = useState<Shipment>();

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

    const editShipmentStatus = (shipmentId: number, status: Status) => {
        const updatedShipments = shipments.map(s => {
            if (s.id === shipmentId) { 
                const updatedShipment = { ...s, statusList: [...s.statusList, status] }
                setCurrentShipment(updatedShipment) // update current shipment state
                return updatedShipment
            } else {
                return s;
            }
        });

        setShipments(updatedShipments);
    };

    return shipments.length ? (
        <>
            <div>
                <div className="py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <ShipmentListHeader />
                            </thead>
                            <tbody>
                                {paginatedItems.map((shipment, index) => (
                                    <ShipmentListItem shipment={shipment} key={index} showDetails={() => setCurrentShipment(shipment)} />
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

            {currentShipment && (
                <ShipmentDetailsModal 
                    shipment={currentShipment} 
                    editShipmentStatus={editShipmentStatus}
                    closeModal={() => setCurrentShipment(undefined)} />
            )}
        </>
    ) : null
}

export default ShipmentList