import { useForm } from "react-hook-form";
import React, { useState as useReactState, useEffect} from 'react';
import ShipmentList from '../../components/ShipmentList/ShipmentList';
import keycloak from "../../keycloak";
import Shipment from '../../models/shipment';
import { fetchCurrentShipmentsAdmin } from "../../api/shipments";





const Admin = () => {
  const [currentShipments, setCurrentShipment] = useReactState<Shipment[]>([]);
  const [baseShipments, setBaseShipment] = useReactState<Shipment[]>([]);
  const isAuthenticated = keycloak.authenticated;

  useEffect(() => {
    if (isAuthenticated && keycloak && keycloak.tokenParsed && keycloak.tokenParsed.realm_access) {
        const roles = keycloak.tokenParsed.realm_access.roles;
        if(!roles.includes('ADMIN')) return;

        getCurrentShipments();
    }
    
  }, []);


  const getCurrentShipments = async () => {
    const shipments = await fetchCurrentShipmentsAdmin();
    console.log(shipments);
    setCurrentShipment(shipments as Shipment[]);
    setBaseShipment(shipments as Shipment[]);
  }
  const {register,handleSubmit, formState: {errors}} = useForm();
  const onSubmit = (id?: any) => {
    if(id.id.length !== 0){
      setCurrentShipment(baseShipments.filter(shipment => {
        return shipment.id == id.id
      }))}
    else
    {setCurrentShipment(currentShipments);}};

    return (

      <div className='w-5/6 h-5/6'>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <fieldset>
            <input {...register("id",{pattern:/^[0-9]*$/i})} className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/4 ' type="number" placeholder="Shipment ID" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 py-3 rounded-full ml-5">
              Search
            </button>
          </fieldset>      
        </form>
        <h2 className="text-2xl font-bold mt-5">Shipments</h2>
        <ShipmentList shipments={currentShipments} setShipments={setCurrentShipment} />
      </div>
    )
  
  }

export default Admin