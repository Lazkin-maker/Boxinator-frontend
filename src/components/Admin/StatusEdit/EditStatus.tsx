import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';
import { updateShipment } from "../../../api/shipments";
import countryIds from "../../../const/countyIds";
import Shipment from "../../../models/shipment";
import { Country } from "../../../types/Country";

import Countries from "../../../enums/countries";

type Props = {
  shipment: Shipment,
  setShowConfirmationModal: Dispatch<SetStateAction<boolean>>

}

type FormData = {
  reciverName: string,
  weight: number,
  boxColor: string;
  destination: string;
  email: string | null;
  price: number;
  selectedStatus: string

}

function EditSatus({ shipment, setShowConfirmationModal }: Props) {

  const statusOption = ["CREATED", "RECEIVED", "INTRANSIT", "COMPLETED"];

  const [selectedOption, setSelectedOption] = useState({
    id: shipment.id,
    status: shipment.statusList[shipment.statusList.length - 1]
  });
  const { register, handleSubmit, setValue , formState: { errors }} = useForm({
    defaultValues: {
      reciverName: shipment.reciverName,
      weight: shipment.weight,
      boxColor: shipment.boxColor,
      destination: shipment.destination,
      email: shipment.email,
      price: shipment.price,
      selectedStatus: shipment.statusList[shipment.statusList.length - 1]
    }
  });

  const handleSelectChange = (event: any) => {
    setValue('selectedStatus', event.target.value);
  };

  const onSubmit = (data: FormData) => {
    //const updatedStatus = { ...selectedOption, status: data.selectedStatus };
    // setSelectedOption(updatedStatus);
    const destinationName = data.destination;
    const destinationId = countryIds.get(destinationName as Countries);
    if (!destinationId) return;
    const updatedShipment = {
      "id": shipment.id,
      "reciverName": data.reciverName,
      "weight": data.weight,
      "boxColor": data.boxColor,
      "destinationID": destinationId,
      "email": data.email,
      "price": data.price,
      statusList: [...shipment.statusList, data.selectedStatus]
    };
    updateShipment(shipment.id, updatedShipment)

  };

  // useEffect(() => {
  //     if (shipment.status !== selectedOption.status) {
  //       setShowConfirmationModal(true);
  //     }


  // }, [selectedOption]);
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="reciverName" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Receiver Name:
        </label>
        <input
          id="reciverName"
          type="text"
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

          {...register('reciverName')}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="weight" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          weight:
        </label>
        <input
          id="weight"
          type="text"
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

          {...register('weight')}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="boxColor" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          boxColor:
        </label>
        <input
          id="boxColor"
          type="text"
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

          {...register('boxColor')}
        />
      </div>



      <div className="mb-4">
        <label htmlFor="destination" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Destination:
        </label>
        <input
          id="destination"
          type="text"
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

          {...register('destination')}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Email:
        </label>
        <input
          id="email"
          type="text"
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

          {...register('email')}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Price:
        </label>
        <input
          id="price"
          type="number"
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register('price', {
            required: true,
            min: 0,
            max: 1000
          })}
        />

        {errors.price && errors.price.type === 'required' && (
          <p className="text-red-500 dark:text-red-400">Price is required</p>
        )}
        {errors.price && errors.price.type === 'min' && (
          <p className="text-red-500 dark:text-red-400">Price must be at least 0</p>
        )}
        {errors.price && errors.price.type === 'max' && (
          <p className="text-red-500 dark:text-red-400">Price must be less than or equal to 1000</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="selectedStatus" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Status:
        </label>
        <select
          id="selectedStatus"
          {...register('selectedStatus')}
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {statusOption.map((status, index) => (
            <option value={status} key={index}>{status}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full"
        >
          Change
        </button>
      </div>
    </div>

  )
}

export default EditSatus


