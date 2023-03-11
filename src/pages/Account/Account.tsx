import React from 'react'
import keycloak from '../../keycloak'
import { useEffect, useState } from "react";
import user from '../../user.json'
// import { getUserData } from "your-api-utils";


type Props = {}

function Account({ }: Props) {
  const [userData, setUserData] = useState(user);
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth);
  const [countryOfResidence, setCountryOfResidence] = useState(userData.countryOfResidence);
  const [zipCode, setZipCode] = useState(userData.zipCode);
  const [contactNumber, setContactNumber] = useState(userData.contactNumber);



  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

      <div className="mt-4">
        <p className="font-medium mb-1">Date of Birth:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Country of Residence:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          value={countryOfResidence}
          onChange={(e) => setCountryOfResidence(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Zip Code/Postal Code:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">Contact Number:</p>
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
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


    </div>

  );

}

export default Account