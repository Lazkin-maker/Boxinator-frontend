interface ShipmentPutAdmin {
    id: number;
    reciverName: string;
    weight: number;
    boxColor: string;
    destinationID: number;
    email: string | null;  
    price: number;
}

export default ShipmentPutAdmin;