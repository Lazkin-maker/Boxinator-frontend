import { Dispatch, SetStateAction, useState, useEffect } from "react"
import user from '../user.json'
import keycloak from "../keycloak";






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
  const [Sub, setSub] = useState("");


  const isAuthenticated = keycloak.authenticated;
  const token = keycloak.token;

  useEffect(() =>{
    if(isAuthenticated){
      setSub(keycloak.tokenParsed?.sub || "")
    }
  }, [])


  const updateUserInformation = async () => {
    const response = await fetch('https://localhost:7085/api/users/', {
      method: 'PUT', // or 'POST' if you're creating a new user
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateOfBirth: dateOfBirth,
        country: countryOfResidence,
        zipCode: zipCode,
        contactNumber: contactNumber,
      })
    });

    if (response.ok) {
      closeModal();
    } else {
      // The server returned an error
      // You can handle this event here, for example by showing an error message to the user
    }
  };

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
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
        onClick={updateUserInformation}
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