import React from 'react'
import keycloak from '../../keycloak'
import { useEffect, useState } from "react";
import UpdateUserModal from '../../components/UpdateUserModal';
import ConfirmationModal from '../../components/UpdateConfirmation';
import user from '../../user.json'
import { json } from 'react-router-dom';
// import { getUserData } from "your-api-utils";


type Props = {}

interface resultProps {
  id: number;
  sub: string;
  dateOfBirth: string; // add this line
  country: string;
  zipCode: string;
  contactNumber: string;
}


function Account({ }: Props) {
  const [userData, setUserData] = useState<resultProps>();
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [Sub, setSub] = useState("");

  const isAuthenticated = keycloak.authenticated;

  useEffect(() =>{
    if(isAuthenticated){
      
      setSub(keycloak.tokenParsed?.sub || "")
     
    }
  }, [])

  console.log(Sub);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://localhost:7085/api/users/userssub/" + Sub, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
        
      });
      const jsonData = await data.json();
      setUserData(jsonData)
      console.log(JSON.stringify(userData))

    };
    api();
  }, []);


  return (
    <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-4">Profile page</h1>

      {keycloak.tokenParsed &&
        <div className="grid grid-cols-2 gap-4">

          <div className="flex flex-col">
            <p className="font-medium mb-1">Name:</p>
            <p className="mb-2">{keycloak.tokenParsed.name}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium mb-1">Username:</p>
            <p className="mb-2">{keycloak.tokenParsed.preferred_username}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium mb-1">Email:</p>
            <p className="mb-2">{keycloak.tokenParsed.email}</p>
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
              <p className="mb-2">{userData.country}</p>
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