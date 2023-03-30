import { useState, useEffect } from "react";
import { fetchActiveShipmentsUser, fetchPreviousShipmentsUser } from "../../api/shipments";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import NewShipmentModal from "../../components/NewShipmentModal/NewShipmentModal";
import ShipmentList from "../../components/ShipmentList/ShipmentList";
import Shipment from "../../models/shipment";
import keycloak from "../../keycloak";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../api/users";


function Shipping() {
  const [showNewShipmentModal, setShowNewShipmentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Sub, setSub] = useState("");
  const [activeShipments, setActiveShipments] = useState<Shipment[]>([]);
  const [previousShipments, setPreviousShipments] = useState<Shipment[]>([]);

  const isAuthenticated = keycloak.authenticated;

  useEffect(() => {
    if (!isAuthenticated) return;
    createNewUserHandler();
    getActiveShipments();
    getPreviousShipments();
  }, []);


  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(true)
      setSub(keycloak.tokenParsed?.sub || "")
      navigate("/shipping")
    }
  }, [])

  const createNewUserHandler = async () => {
    const response = await createNewUser();
    return response;
  }

  const getActiveShipments = async () => {
    const shipments = await fetchActiveShipmentsUser();
    const newestShipmentFirst = shipments.reverse();
    setActiveShipments(newestShipmentFirst  as Shipment[]);
  }

  const getPreviousShipments = async () => {
    const shipments = await fetchPreviousShipmentsUser();
    const newestShipmentFirst = shipments.reverse();
    setPreviousShipments(newestShipmentFirst as Shipment[]);
  }

  return (
    <>
      {keycloak.tokenParsed && (
        <div className="rounded-lg p-4 mb-4 text-left">
          Logged as: <span className="font-bold">{keycloak.tokenParsed.preferred_username}</span>
        </div>
      )}

      <div className="container max-w-4xl mx-auto px-4 pt-16">


        <div className="max-w-2xl mx-auto text-center mb-20">
          <h1 className="text-3xl font-bold mb-8">Unbox the Mystery with Boxinator:<br />Shipping Thrill Straight to Your Doorstep!</h1>
          <button
            onClick={() => setShowNewShipmentModal(true)}
            className="bg-violet-600 text-white font-bold text-lg rounded-lg px-10 py-4">
            New Shipment
          </button>
        </div>

        {isLoggedIn ? (
          <div>

            <h2 className="text-2xl font-bold">Active Shipments</h2>
            <ShipmentList shipments={activeShipments} setShipments={setActiveShipments} />

            <h2 className="text-2xl font-bold">Previous Shipments</h2>
            <ShipmentList shipments={previousShipments} setShipments={setPreviousShipments} />

          </div>
        ) : (
          <p className="opacity-75 text-lg text-center">Please login to view your shipments</p>
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