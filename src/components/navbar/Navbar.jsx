import { Link } from "react-router-dom";
import keycloak from "../../keycloak";
import KeycloakRoute from "../../routes/KeycloakRoute";
import React, { useState, useEffect } from "react";
import { ROLES } from "../../const/roles";



function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(keycloak.authenticated);
  const [userRole, setUserRole] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const roles = keycloak.tokenParsed.realm_access.roles;
      if (roles.includes('ADMIN'))
        setUserRole(true);
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin + "/" });
    localStorage.removeItem('keycloakToken');
    setIsAuthenticated(false);

  };


  return (
    <nav className="bg-violet-800 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src="/deliveryPic.jpg" alt="Logo" className="h-12 w-12 rounded-full" />
            </Link>
            <div className="ml-3">
              <h1 className="text-white font-bold text-xl">Boxinator</h1>
            </div>
          </div>
          <div className="flex">
            <ul className="flex items-center">
              {/* <li className="ml-8">
                <Link to="/" className="text-white hover:text-gray-300">Start</Link>
              </li> */}
              {isAuthenticated && (
                <li className="ml-8">
                  <Link to="/account" className="text-white hover:text-gray-300">Account</Link>
                </li>
              )}
              {isAuthenticated && (
                <li className="ml-8">
                  <Link to="/shipping" className="text-white hover:text-gray-300">Shipping</Link>
                </li>
              )}
              {isAuthenticated && userRole && (
                <li className="ml-8">
                  <Link to="/admin" className="text-white hover:text-gray-300">Admin</Link>
                </li>
              )}
            </ul>
            {!isAuthenticated && (
              <ul className="flex items-center ml-8">
                <li>
                  <button onClick={() => {
                    keycloak.login({ redirectUri: window.location.origin + "/shipping" })
                  }} className="bg-white text-gray-900 rounded-full py-2 px-4 hover:text-gray-300 ">Login</button>
                </li>
              </ul>
            )}

            {isAuthenticated && (
              <ul className="flex items-center ml-8">
                <li>
                  <button onClick={handleLogout} className="bg-white text-gray-900 rounded-full py-2 px-4 hover:text-gray-300">Logout</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>

  );
}
export default Navbar;







