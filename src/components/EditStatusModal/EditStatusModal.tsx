import { useState } from "react"
import { changeShipmentStatus } from "../../api/shipments"
import Status from "../../enums/status"
import Shipment from "../../models/shipment"
import StatusDisplay from "../StatusDisplay/StatusDisplay"

type Props = {
    shipment: Shipment,
    currentStatus: Status,
    editShipmentStatus: (shipmentId: number, status: Status) => void,
    closeModal: () => void,
}

function EditStatusModal({ shipment, currentStatus, editShipmentStatus, closeModal }: Props) {
    const [value, setValue] = useState<Status>(currentStatus)

    const handleOnChange = (e: any) => {
        setValue(e.target.value as Status)
    }

    const handleChangeStatus = () => {
        // Updates shipment status in state
        editShipmentStatus(shipment.id, value);


        console.log("Changed status to " + value)
        changeShipmentStatus(shipment.id, value);

        // Close modal
        closeModal();
    }

    return (
        <div className="mt-2 w-1/2 max-w-sm min-w-min fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-white text-gray-800 py-8 px-5 md:px-10 border border-gray-400 rounded-lg">

            <h1 className="w-60 text-xl font-lg font-bold tracking-normal leading-tight mb-4">Shipment details</h1>

            <div className="my-5">
                {(Object.keys(Status) as Array<keyof typeof Status>).map((status) => (
                    <div className="flex items-center mb-4">
                        <input type="radio" id={status} name="status" value={status} className="w-4 h-4" checked={value === status} onChange={handleOnChange} />
                        <label className="ml-2" htmlFor={status}>
                            <StatusDisplay statusList={[status]} />
                        </label>
                    </div>
                ))}
            </div>

            <button onClick={handleChangeStatus} className="w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 transition duration-150 ease-in-out hover:bg-violet-700 bg-violet-600 rounded text-white px-8 py-2 text-sm mr-2">
                Confirm
            </button>

            <button onClick={closeModal} className="w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 transition duration-150 ease-in-out hover:bg-violet-600 bg-white rounded text border-2 border-violet-600 px-8 py-2 text-sm text-violet-600 hover:text-white">
                Cancel
            </button>

            <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    )
}

export default EditStatusModal