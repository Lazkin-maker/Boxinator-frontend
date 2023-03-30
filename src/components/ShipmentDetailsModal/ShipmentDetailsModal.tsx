import { useEffect, useState } from "react"
import { cancelShipment } from "../../api/shipments"
import Status from "../../enums/status"
import keycloak from "../../keycloak"
import Shipment from "../../models/shipment"
import formatCurrency from "../../shared/formatCurrency"
import EditStatusModal from "../EditStatusModal/EditStatusModal"
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop"
import StatusDisplay from "../StatusDisplay/StatusDisplay"

type Props = {
    shipment: Shipment | undefined,
    editShipmentStatus: (shipmentId: number, status: Status) => void,
    closeModal: () => void,
}

function ShipmentDetailsModal({ shipment, editShipmentStatus, closeModal }: Props) {
    const [showEditStatusModal, setShowEditStatusModal] = useState(false);

    const [currentStatus, setCurrentStatus] = useState<Status>(getCurrentStatus());

    useEffect(() => {
        setCurrentStatus(shipment?.statusList[shipment?.statusList.length - 1] as Status)
    }, [shipment])

    const handleCancelShipment = () => {
        if (!shipment || currentStatus === Status.CANCELLED) return;

        // Updates shipment status in state
        editShipmentStatus(shipment.id, Status.CANCELLED);

        // Disables cancel button & updates StatusDisplay
        setCurrentStatus(Status.CANCELLED);

        // Send PUT request to update shipment status
        cancelShipment(shipment.id)
    }

    function getCurrentStatus() {
        return shipment?.statusList[shipment?.statusList.length - 1] as Status;
    }

    return shipment ? (
        !showEditStatusModal ? (
            <>
                <div className="mt-2 w-1/2 max-w-sm min-w-min fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-white text-gray-800 py-8 px-5 md:px-10 border border-gray-400 rounded-lg">

                    <h1 className="w-60 text-xl font-lg font-bold tracking-normal leading-tight mb-4">Shipment details</h1>

                    <div className="my-5">
                        <p className="flex justify-between font-bold mb-1">Shipment id: <span className="font-normal">{shipment.id}</span></p>
                        <p className="flex justify-between font-bold mb-1">Recipient: <span className="font-normal">{shipment.reciverName}</span></p>
                        <p className="flex justify-between font-bold mb-1">Weight: <span className="font-normal">{shipment.weight}kg</span></p>
                        <p className="flex justify-between font-bold mb-1">Box color: <span className="w-12 h-5 rounded-sm" style={{ backgroundColor: shipment.boxColor }} /></p>
                        <p className="flex justify-between font-bold mb-1">Destination: <span className="font-normal">{shipment.destination}</span></p>
                        <p className="flex justify-between font-bold mb-1">Price: <span className="font-normal">{formatCurrency(shipment.price)}</span></p>
                        <p className="flex justify-between font-bold mb-1">Status: <StatusDisplay statusList={shipment.statusList} /></p>
                    </div>

                    {/* If user is admin and on admin page, show edit status button instead of cancel shipment button */}
                    {keycloak.hasRealmRole("ADMIN") && window.location.pathname.includes("admin") ? (
                        <button onClick={() => setShowEditStatusModal(true)} className="w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 transition duration-150 ease-in-out hover:bg-violet-700 bg-violet-600 rounded text-white px-8 py-2 text-sm disabled:bg-gray-500 disabled:hover:bg-gray-600">
                            Edit status
                        </button>
                    ) : (
                        <button onClick={handleCancelShipment} disabled={currentStatus === Status.CANCELLED} className="w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 transition duration-150 ease-in-out hover:bg-violet-700 bg-violet-600 rounded text-white px-8 py-2 text-sm disabled:bg-gray-500 disabled:hover:bg-gray-600">
                            Cancel shipment
                        </button>
                    )}

                    <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <ModalBackdrop closeModal={closeModal} />
            </>
        ) : (
            <>
                <EditStatusModal 
                    shipment={shipment}
                    currentStatus={currentStatus} 
                    editShipmentStatus={editShipmentStatus}
                    closeModal={() => setShowEditStatusModal(false)} />
                <ModalBackdrop closeModal={closeModal} />
            </>
        )
    ) : null
}

export default ShipmentDetailsModal