import keycloak from "../keycloak";
import NewShipmentGuest from "../models/newShipmentGuest";
import NewShipmentUser from "../models/newShipmentUser";

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
export const fetchCompletedShipmentsUser = async () => {
    const response = await fetch("https://localhost:7085/api/v1/shipment/completed", {
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