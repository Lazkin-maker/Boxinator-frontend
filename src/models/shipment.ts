interface Shipment {
    id: number;
    reciverName: string;
    destination: string;
    boxColor: string;
    statusList: string[];
    email: string | null;
    weight: number;
    price: number;
}

export default Shipment;