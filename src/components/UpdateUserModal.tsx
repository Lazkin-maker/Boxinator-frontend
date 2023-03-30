import { Dispatch, SetStateAction, useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import user from '../user.json'
import keycloak from "../keycloak";






type Props = {
  Data: resultProps
  closeModal: () => void,
  setShowConfirmationModal: Dispatch<SetStateAction<boolean>>
}
interface resultProps {
  dateOfBirth: string; // add this line
  country: string;
  zipCode: string;
  contactNumber: string;
}


function UpdateUserModal({ closeModal, setShowConfirmationModal, Data }: Props) {
  const [Sub, setSub] = useState("");
  const isAuthenticated = keycloak.authenticated;
  const token = keycloak.token;

  const {register, handleSubmit} = useForm({
    defaultValues: {
      dateOfBirth: Data.dateOfBirth,
      country: Data.country,
      zipCode: Data.zipCode,
      contactNumber: Data.contactNumber
    }
    
  });

  useEffect(() =>{
    if(isAuthenticated){
      setSub(keycloak.tokenParsed?.sub || "")
    }
  }, [])


  const updateUserInformation = async (data: resultProps) => {
    const response = await fetch('https://localhost:7085/api/users/', {
      method: 'PUT', // or 'POST' if you're creating a new user
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "dateOfBirth": data.dateOfBirth,
        "country": data.country,
        "zipCode": data.zipCode,
        "contactNumber": data.contactNumber
      })
    });

    if (response.ok) {
      closeModal();
    } else {
     
    }
  };

  return (
    <>
      <div className="mt-4">
        <p className="font-medium mb-1">Date of Birth:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full text-black"
          type="date"
          {...register('dateOfBirth')}
        
        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Country of Residence:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full text-black"
          type="text"
          {...register('country')}
         

        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Zip Code/Postal Code:</p>
        <input
         className="border border-gray-300 p-2 rounded-md w-full text-black"
          type="text"
          {...register('zipCode')}
          

        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Contact Number:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full text-black"
          type="text"
          {...register('contactNumber')}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit(updateUserInformation)}
      >
        Save
      </button>
      <button onClick={closeModal} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
        Cancel
      </button>

    </>
  )
}

export default UpdateUserModal