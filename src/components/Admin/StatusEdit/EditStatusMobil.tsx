import { useState } from "react";
import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';



function EditSatusMobil({shipment, setShowConfirmationModal}:any) {
  
  const statusOption = ["CREATED", "RECEIVED", "INTRANSIT","COMPLETED"];

  const [selectedOption, setSelectedOption] = useState({id: shipment?.id,
  status: shipment?.status});
  const {register, handleSubmit, setValue} = useForm();

  const handleSelectChange = (event:any) => {
    setValue('selectedStatus', event.target.value);
  };

  const onSubmit = (data:any) => {
    const updatedStatus = { ...selectedOption, status: data.selectedStatus};
    setSelectedOption(updatedStatus);
  };

  useEffect(() => {
    if(shipment.status !== selectedOption.status)
    {
        console.log(JSON.stringify(selectedOption))
        setShowConfirmationModal(true);
    }
      
  }, [selectedOption]);
  return (

    <div className="md:hidden">
        <div className="p-8  border-gray-200 bg-white text-sm flex justify-between">
            <p className="text-gray-900 whitespace-no-wrap text-lg font-semibold">Package ID:</p>
            <p className="text-gray-900 whitespace-no-wrap text-lg">{shipment?.id}</p>
        </div>

        <div className="p-8  bg-white text-sm flex justify-between">
            <p className="text-gray-900 whitespace-no-wrap text-lg font-semibold">Recipient:</p>
            <p className="text-gray-900 whitespace-no-wrap ">{shipment?.recipient}</p>
        </div>

        <div className="p-8  bg-white text-sm flex justify-between">
            <p className="text-gray-900 whitespace-no-wrap text-lg font-semibold">Destination:</p>
            <p className="text-gray-900 whitespace-no-wrap">{shipment?.destination}</p>
        </div>

        <div className="p-8  bg-white text-sm flex justify-between">
            <p className="text-gray-900 whitespace-no-wrap text-lg font-semibold">Price:</p>
            <p className="text-gray-900 whitespace-no-wrap">{shipment?.price} SEK</p>
        </div>
        <div className="p-8   bg-white text-sm">
            <select {...register('selectedStatus')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {statusOption.map((status, index) => (
            <option value={status} key={index}>{status}</option>
            ))}
            </select>
        </div> 
        <div className="p-8  bg-white text-sm flex justify-center">
            <button type="submit" onClick={handleSubmit(onSubmit)} className="bg-blue-500 focus:bg-blue-700 text-white font-bold px-4 py-3 rounded-full h-5/6 flex items-center">
            Change
            </button>
        </div>
    </div>
    
   
  )
}
  
export default EditSatusMobil