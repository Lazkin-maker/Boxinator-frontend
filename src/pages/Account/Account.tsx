import React from 'react'
import keycloak from '../../keycloak'
import { useEffect, useState } from "react";
import user from '../../user.json'
import Update from '../../components/UpdateUserModal'
import UpdateUserModal from '../../components/UpdateUserModal';
import ConfirmationModal from '../../components/UpdateConfirmation';
// import { getUserData } from "your-api-utils";


type Props = {}

function Account({ }: Props) {
  const [userData, setUserData] = useState(user);
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth);
  const [countryOfResidence, setCountryOfResidence] = useState(userData.countryOfResidence);
  const [zipCode, setZipCode] = useState(userData.zipCode);
  const [contactNumber, setContactNumber] = useState(userData.contactNumber);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);



  return (
    <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-4">Profile page</h1>

      {keycloak.tokenParsed &&
        <div className="grid grid-cols-2 gap-4">
          <h4 className="text-lg font-bold mb-2">User</h4>
          <div className="flex flex-col">
            <p className="font-medium mb-1">Name:</p>
            <p className="mb-2">{keycloak.tokenParsed.name}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium mb-1">Username:</p>
            <p className="mb-2">{keycloak.tokenParsed.preferred_username}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium mb-1">Sub:</p>
            <p className="mb-2">{keycloak.tokenParsed.sub}</p>
          </div>
        </div>
      }
      <hr></hr>
      {userData && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="font-medium mb-1">Date of Birth:</p>
              <p className="mb-2">{userData.dateOfBirth}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium mb-1">Country of Residence:</p>
              <p className="mb-2">{userData.countryOfResidence}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium mb-1">Zip Code/Postal Code:</p>
              <p className="mb-2">{userData.zipCode}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium mb-1">Contact Number:</p>
              <p className="mb-2">{userData.contactNumber}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowUpdateUser(true)}
        className="bg-violet-600 text-white font-bold rounded-lg px-8 py-4">
        Update User
      </button>

      {showUpdateUser && (
        <UpdateUserModal
          setShowConfirmationModal={setShowConfirmationModal}
          closeModal={() => setShowUpdateUser(false)} />
      )}

      {showConfirmationModal && (
        <ConfirmationModal closeModal={() => setShowConfirmationModal(false)} />
      )}

    </div>



  );

}

export default Account