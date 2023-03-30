import keycloak from '../../keycloak'
import { useEffect, useState } from "react";
import UpdateUserModal from '../../components/UpdateUserModal';
import ConfirmationModal from '../../components/UpdateConfirmation';
import { fetchUserSub } from '../../api/users';

interface resultProps {
  id: number;
  sub: string;
  dateOfBirth: string; // add this line
  country: string;
  zipCode: string;
  contactNumber: string;
}

function Account() {
  const [Data, setData] = useState<resultProps>();
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [Sub, setSub] = useState("");

  useEffect(() => {
    if (keycloak.authenticated) {
      setSub(keycloak.tokenParsed?.sub || "")
    }
  }, [])

  useEffect(() => {
    const api = async () => {
      const userSub = await fetchUserSub();
      setData(userSub)
    };
    api();
  }, [Sub]);

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
      {Data && (

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="font-medium mb-1">Date of Birth:</p>
              <p className="mb-2">{Data.dateOfBirth}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium mb-1">Country of Residence:</p>
              <p className="mb-2">{Data.country}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium mb-1">Zip Code/Postal Code:</p>
              <p className="mb-2">{Data.zipCode}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium mb-1">Contact Number:</p>
              <p className="mb-2">{Data.contactNumber}</p>

            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowUpdateUser(true)}
        className="bg-violet-600 text-white font-bold rounded-lg px-8 py-4">
        Update User
      </button>

      {showUpdateUser && Data && (
        <UpdateUserModal
          Data={Data}
          setShowConfirmationModal={setShowConfirmationModal}
          closeModal={() => setShowUpdateUser(false)}
          />
      )}

      {showConfirmationModal && (
        <ConfirmationModal closeModal={() => setShowConfirmationModal(false)} />
      )}

    </div>
  );
}

export default Account