import { Link } from "react-router-dom";
import keycloak from "../../keycloak";
import React, { useState, useEffect } from "react";



function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(keycloak.authenticated);




  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin + "/"});
    localStorage.removeItem('keycloakToken');
    setIsAuthenticated(false);
    
  };

  return (
    <nav>
      <div className="container">
        <div className="navbar">
          <ul>
            <li>
              <Link to="/">Start</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/shipping">Shipping</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
          {!isAuthenticated && (
            <ul>
              <li>
                <button onClick={() => {
                  keycloak.login({ redirectUri: window.location.origin + "/shipping" })                
                }}>Login</button>
              </li>
            </ul>
          )}

          {isAuthenticated && (
            <ul>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
