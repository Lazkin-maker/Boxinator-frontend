import { useState, useEffect } from "react";
import { fetchActiveShipmentsUser, fetchPreviousShipmentsUser } from "../../api/shipments";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import NewShipmentModal from "../../components/NewShipmentModal/NewShipmentModal";
import ShipmentList from "../../components/ShipmentList/ShipmentList";
import Shipment from "../../models/shipment";
import keycloak from "../../keycloak";
import { useNavigate } from "react-router-dom";


function Shipping() {
  const [showNewShipmentModal, setShowNewShipmentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Sub, setSub] = useState("");
  const [activeShipments, setActiveShipments] = useState<Shipment[]>([]);
  const [previousShipments, setPreviousShipments] = useState<Shipment[]>([]);



  const isAuthenticated = keycloak.authenticated;
  const token = keycloak.token;

  useEffect(() => {
    if (!isAuthenticated) return;
    createNewUser();
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

  const createNewUser = async () => {
    const response = await fetch("https://localhost:7085/api/users/newuser", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json"
      }
    })
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
        <div className=" rounded-lg p-4 mb-4 text-left">
          Logged as: <span className="font-bold">{keycloak.tokenParsed.preferred_username}</span>
        </div>
      )}

      <div className="container max-w-4xl mx-auto px-4 pt-20">


        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Unbox the Mystery with Boxinator:<br />Shipping Thrill Straight to Your Doorstep!</h1>
          <button
            onClick={() => setShowNewShipmentModal(true)}
            className="bg-violet-600 text-white font-bold rounded-lg px-8 py-4">
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