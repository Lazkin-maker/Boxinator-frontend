import { useForm } from "react-hook-form";
import { useState as useReactState, useEffect } from 'react';
import ShipmentList from '../../components/ShipmentList/ShipmentList';
import keycloak from "../../keycloak";
import Shipment from '../../models/shipment';
import { fetchCurrentShipmentsAdmin } from "../../api/shipments";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





const Admin = () => {
  const [currentShipments, setCurrentShipment] = useReactState<Shipment[]>([]);
  const [baseShipments, setBaseShipment] = useReactState<Shipment[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    // if (keycloak.authenticated && keycloak && keycloak.tokenParsed && keycloak.tokenParsed.realm_access) {
    //   const roles = keycloak.tokenParsed.realm_access.roles;
    // if (!roles.includes('ADMIN')) return;

    if (keycloak.hasRealmRole('ADMIN')) {
      getCurrentShipments();
    }
    // }

  }, []);


  const getCurrentShipments = async () => {
    const shipments = await fetchCurrentShipmentsAdmin();
    const newestShipmentFirst = shipments.reverse();
    setCurrentShipment(newestShipmentFirst as Shipment[]);
    setBaseShipment(newestShipmentFirst as Shipment[]);
  }


  const onSubmit = (id?: any) => {
    if (id.id.length !== 0) {
      setCurrentShipment(baseShipments.filter(shipment => {
        return shipment.id == id.id
      }))
    }
    else { setCurrentShipment(currentShipments); }
  };

  const resetShipments = () => {
    setCurrentShipment(baseShipments);
  }

  return (

    <div className='w-5/6 h-5/6'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-10">
          <input 
            {...register("id", { pattern: /^[0-9]*$/i })} 
            min="0" 
            type="number" 
            placeholder="Shipment ID" 
            className="shadow appearance-none border-none rounded-l-full pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/4" />
          <button type="button" onClick={resetShipments} className="bg-white text-white font-bold pl-2 pr-4 rounded-r-full mr-2">
            <FontAwesomeIcon icon={faXmark} color="gray" size="xl" />
          </button>
          <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 rounded-full">
            Search
          </button>
        </div>
      </form>
      <h2 className="text-2xl font-bold mt-5">Shipments</h2>
      <ShipmentList shipments={currentShipments} setShipments={setCurrentShipment} />
    </div>
  )

}

export default Admin