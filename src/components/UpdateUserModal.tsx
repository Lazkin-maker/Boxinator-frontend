import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import { updateUserInformation } from "../api/users";

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

  const {register, handleSubmit} = useForm({
    defaultValues: {
      dateOfBirth: Data.dateOfBirth,
      country: Data.country,
      zipCode: Data.zipCode,
      contactNumber: Data.contactNumber
    }
  });

  const onSubmitHandler = async (data: resultProps) => {
    const response = await updateUserInformation({
       dateOfBirth: data.dateOfBirth, 
       countryOfResidence: data.country, 
       zipCode: data.zipCode, 
       contactNumber: data.contactNumber });

    if (response) {
      closeModal();
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
        onClick={handleSubmit(onSubmitHandler)}
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