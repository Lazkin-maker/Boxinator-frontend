import { useState, useEffect } from "react";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import NewShipmentModal from "../../components/NewShipmentModal/NewShipmentModal";
import ShipmentList from "../../components/ShipmentList/ShipmentList";
import data from "./dummy.json";

function Shipping() {
  const [showNewShipmentModal, setShowNewShipmentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('keycloakToken'));
  

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('keycloakToken'));
  }, [localStorage.getItem('keycloakToken')]);

  // These will be replaced by API calls
  const activeShipments = data.shipments.filter(shipment => ["CREATED", "RECEIVED", "INTRANSIT"].includes(shipment.status));
  const completedShipments = data.shipments.filter(shipment => shipment.status === "COMPLETED");

  return (
    <>
      <div className="container max-w-4xl mx-auto px-3 sm:px-4 pt-20">

        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam labore aut mollitia!</h1>
          <button
            onClick={() => setShowNewShipmentModal(true)}
            className="bg-violet-600 text-white font-bold rounded-lg px-8 py-4">
            New Shipment
          </button>
        </div>

        {isLoggedIn ? (
          <div>
            <h2 className="text-2xl font-bold">Active Shipments</h2>
            <ShipmentList shipments={activeShipments} />

            <h2 className="text-2xl font-bold">Completed Shipments</h2>
            <ShipmentList shipments={completedShipments} />


          </div>
        ) : (
          <p>please login to view active shipments</p>
        )}

      </div>

      {showNewShipmentModal && (
        <NewShipmentModal
          setShowConfirmationModal={setShowConfirmationModal}
          closeModal={() => setShowNewShipmentModal(false)} />
      )}

      {showConfirmationModal && (
        <ConfirmationModal closeModal={() => setShowConfirmationModal(false)} />
      )}
    </>
  )
}

export default Shipping