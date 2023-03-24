import keycloak from "../keycloak";
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

export const createNewShipmentsUser = async (body: NewShipmentUser) => {
    const response = await fetch("https://localhost:7085/api/v1/shipment/new", {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keycloak.token
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    return data;
}