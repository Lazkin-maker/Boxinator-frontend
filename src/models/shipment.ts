interface Shipment {
    id: string;
    recipient: string;
    destination: string;
    boxColor: string;
    status: string;
    email: string | null;
    weight: number;
    price: number;
}

export default Shipment;