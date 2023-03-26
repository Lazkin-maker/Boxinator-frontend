import { useState, useEffect } from "react";
import { fetchActiveShipmentsUser, fetchCompletedShipmentsUser } from "../../api/shipments";
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
  const [RoleID, setRoleID] = useState<number>();
  const [activeShipments, setActiveShipments] = useState<Shipment[]>([]);
  const [completedShipments, setCompletedShipments] = useState<Shipment[]>([]);



  const isAuthenticated = keycloak.authenticated;
  const token = keycloak.token;

  useEffect(() => {
   

    if (!isAuthenticated) return;

    getActiveShipments();
    getCompletedShipments();
  }, []);
  

  useEffect(() => {
    if (isAuthenticated && keycloak && keycloak.tokenParsed && keycloak.tokenParsed.realm_access) {
      const roles = keycloak.tokenParsed.realm_access.roles;
      if (roles.includes('ADMIN')){
        setRoleID(1);
      }  
      else{
        setRoleID(2);
      }  
    }
  }, [isAuthenticated])


const navigate = useNavigate();
useEffect(() =>{
  if(isAuthenticated){
    setIsLoggedIn(true)
    setSub(keycloak.tokenParsed?.sub || "")
    navigate("/shipping")
  }
}, [])
 
  const postData = async () => {
    const url = `https://localhost:7085/api/users/${RoleID}`; // replace with your API endpoint
    const data = { 
      Sub,
      RoleID,      
     };
  
    const options = {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  }
  
  postData();


  // These will be replaced by API calls
  // const activeShipments = data.shipments.filter(shipment => ["CREATED", "RECEIVED", "INTRANSIT"].includes(shipment.status));
  // const completedShipments = data.shipments.filter(shipment => shipment.status === "COMPLETED");

  const getActiveShipments = async () => {
    const shipments = await fetchActiveShipmentsUser();
    setActiveShipments(shipments as Shipment[]);
  }

  const getCompletedShipments = async () => {
    const shipments = await fetchCompletedShipmentsUser();
    setCompletedShipments(shipments as Shipment[]);
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
            <ShipmentList shipments={activeShipments} setShipments={setActiveShipments} />

            <h2 className="text-2xl font-bold">Completed Shipments</h2>
            <ShipmentList shipments={completedShipments} setShipments={setCompletedShipments} />

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