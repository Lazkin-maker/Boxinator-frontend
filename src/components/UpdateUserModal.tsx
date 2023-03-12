import { Dispatch, SetStateAction, useState } from "react"
import user from '../user.json'




type Props = {
  closeModal: () => void,
  setShowConfirmationModal: Dispatch<SetStateAction<boolean>>
}

function UpdateUserModal({ closeModal, setShowConfirmationModal }: Props) {
  const [userData, setUserData] = useState(user);
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth);
  const [countryOfResidence, setCountryOfResidence] = useState(userData.countryOfResidence);
  const [zipCode, setZipCode] = useState(userData.zipCode);
  const [contactNumber, setContactNumber] = useState(userData.contactNumber);

  return (
    <>
      <div className="mt-4">
        <p className="font-medium mb-1">Date of Birth:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          style={{ color: 'black' }}
        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Country of Residence:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          value={countryOfResidence}
          onChange={(e) => setCountryOfResidence(e.target.value)}
          style={{ color: 'black' }}

        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Zip Code/Postal Code:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          style={{ color: 'black' }}

        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Contact Number:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          style={{ color: 'black' }}

        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          const updatedUserData = {
            ...userData,
            dateOfBirth: dateOfBirth,
            countryOfResidence: countryOfResidence,
            zipCode: zipCode,
            contactNumber: contactNumber
          };

          fetch('/api/saveUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserData)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to save user information.');
              }
              console.log('User information saved.');
            })
            .catch(error => {
              console.error(error);
            });
        }}
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