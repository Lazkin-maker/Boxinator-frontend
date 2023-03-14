import { useState } from "react";
import Shipment from "../../../models/shipment";
import { useForm } from "react-hook-form";

type PropsType = {
  shipment:Shipment|undefined;
}

function EditSatus({shipment}:PropsType) {
  
  const statusOption = ["CREATED", "RECEIVED", "INTRANSIT","COMPLETED"];

  const [selectedOption, setSelectedOption] = useState("");

  return (
              
    <tr>
      <td className="p-8  border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{shipment?.id}</p>
      </td>

      <td className="p-8  border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{shipment?.recipient}</p>
      </td>

      <td className="p-8  border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{shipment?.destination}</p>
      </td>

      <td className="p-8  border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{shipment?.price} SEK</p>
      </td>
      <td className=" p-8 border-b border-gray-200 bg-white text-sm">
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 w-4/6">
        {statusOption.map((status) => (
          <option value={status}>{status}</option>
          ))}
        </select>
      </td> 
      <td className="p-8 border-b border-gray-200 bg-white text-sm">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full h-5/6 ">
          Change
        </button>
      </td>
    </tr> 
    
         
  )
  }
  
  export default EditSatus


