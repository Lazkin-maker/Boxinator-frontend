import statusIds from "../const/statusIds";
import Status from "../enums/status";
import keycloak from "../keycloak";
import NewShipmentGuest from "../models/newShipmentGuest";
import NewShipmentUser from "../models/newShipmentUser";
import ShipmentPutAdmin from "../models/ShipmentPutAdmin"
import Shipment from "../models/shipment";

/**
 * Fetch all active shipments for the user
 */
export const fetchActiveShipmentsUser = async () => {
    const response = await fetch("https://localhost:7085/api/v1/shipment/current", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        }
    })

    const data = await response.json();

    return data;
}

/**
 * Fetch all completed shipments for the user
 */
export const fetchPreviousShipmentsUser = async () => {
    const response = await fetch("https://localhost:7085/api/v1/shipment/previous", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        }
    })

    const data = await response.json();

    return data;
}

/**
 * Create a new shipment for a logged in user
 * @param body Shipment details from form
 */
export const createNewShipmentsUser = async (body: NewShipmentUser) => {
    const response = await fetch("https://localhost:7085/api/v1/shipment/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    return data;
}

/**
 * Create a new shipment for a guest user
 * @param body Shipment details from form
 */
export const createNewShipmentsGuest = async (body: NewShipmentGuest) => {
    const response = await fetch("https://localhost:7085/api/v1/shipment/guest/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    return data;
}

/**
 * Fetch all current shipments for the admin
 */
export const fetchCurrentShipmentsAdmin = async () => {
    const response = await fetch("https://localhost:7085/api/v1/admin/shipment/current", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        }
    })

    const data = await response.json();

    return data;
}

/**
 * Cancel a shipment, changing its status to cancelled
 * @param shipmentId Id of the shipment to cancel
 */
export const cancelShipment = async (shipmentId: number) => {
    const response = await fetch(`https://localhost:7085/api/v1/shipment/${shipmentId}/cancel`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        },
    })

    const data = await response.json();

    return data;
}

/**
 * Change the status of a shipment as admin
 */
export const changeShipmentStatus = async (shipmentId: number, status: Status) => {
    const response = await fetch(`https://localhost:7085/api/v1/admin/shipment/${shipmentId}/addstatus`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        },
        body: JSON.stringify({ id: statusIds.get(status), statusName: status })
    })
}


    /** 
   * Fetch shipment by Id for the admin change status
  */
export const fetchShipmentByIdsAdmin = async (shipmentId: number) => {
    const response = await fetch(`https://localhost:7085/api/v1/admin/shipment/${shipmentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        }
    })

    const data = await response.json();

    return data;
}



/**
 * Cancel a shipment, changing its status to cancelled
 * @param shipmentId Id of the shipment to cancel
 */
export const updateShipment = async (shipmentId: number, body : ShipmentPutAdmin) => {
    const response = await fetch(`https://localhost:7085/api/v1/admin/shipment/${shipmentId}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    return data;
}
