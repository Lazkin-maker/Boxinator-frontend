interface ShipmentPutAdmin {
    id: number;
    reciverName: string;
    weight: number;
    boxColor: string;
    destinationID: number;
    email: string | null;  
    price: number;
    statusList: string[];
}

export default ShipmentPutAdmin;