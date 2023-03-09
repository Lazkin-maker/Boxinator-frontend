import ShipmentList from "../../components/ShipmentList/ShipmentList";
import data from "./dummy.json";

function Shipping() {
  const activeShipments = data.shipments.filter(shipment => ["CREATED", "RECEIVED", "INTRANSIT"].includes(shipment.status));
  const completedShipments = data.shipments.filter(shipment => shipment.status === "COMPLETED");
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">

      <h2 className="text-2xl font-bold">Active Shipments</h2>
      <ShipmentList shipments={activeShipments} />

      <h2 className="text-2xl font-bold">Completed Shipments</h2>
      <ShipmentList shipments={completedShipments} />

    </div>
  )
}

export default Shipping