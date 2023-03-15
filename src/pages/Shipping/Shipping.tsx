import { useState, useEffect } from "react";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import NewShipmentModal from "../../components/NewShipmentModal/NewShipmentModal";
import ShipmentList from "../../components/ShipmentList/ShipmentList";
import data from "./dummy.json";
import keycloak from "../../keycloak";
import { useNavigate } from "react-router-dom";


function Shipping() {
  const [showNewShipmentModal, setShowNewShipmentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Sub, setSub] = useState("");



const isAuthenticated = keycloak.authenticated;

const navigate = useNavigate();
useEffect(() =>{
  if(isAuthenticated){
    setIsLoggedIn(true)
    setSub(keycloak.tokenParsed?.sub || "")
    navigate("/shipping")
  }
}, [])
   console.log(Sub);
 
  const postData = async (Sub : string) => {
    const url = "http://localhost:4000/api/users"; // replace with your API endpoint
    const data = { sub: Sub };
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  
    try {
      const response = await fetch(url, options);
      const jsonData = await response.json();
      console.log(jsonData); // do something with the response data
    } catch (error) {
      console.error(error);
    }
  }
  
  postData(keycloak.tokenParsed?.sub || "");


  // These will be replaced by API calls
  const activeShipments = data.shipments.filter(shipment => ["CREATED", "RECEIVED", "INTRANSIT"].includes(shipment.status));
  const completedShipments = data.shipments.filter(shipment => shipment.status === "COMPLETED");

  return (
    <>
      {keycloak.tokenParsed && (
        <div className=" rounded-lg p-4 mb-4 text-left">
          Logged as: <span className="font-bold">{keycloak.tokenParsed.preferred_username}</span>
        </div>
      )}

      <div className="container max-w-4xl mx-auto px-4 pt-20">


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