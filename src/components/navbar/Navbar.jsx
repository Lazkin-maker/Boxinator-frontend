import { Link } from "react-router-dom";
import keycloak from "../../keycloak";
import { useState, useEffect } from "react";

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
    <nav className="sticky top-0 w-full bg-violet-800 py-2 z-10 h-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/icon.svg" alt="Logo" className="h-12 w-12 rounded-full inline" />
              <h1 className="text-white font-bold text-xl ml-2 mt-1 hidden sm:inline">Boxinator</h1>
            </Link>
          </div>
          <div className="flex">
            <ul className="flex items-center font-bold">
              {isAuthenticated && (
                <li className="ml-2 sm:ml-8">
                  <Link to="/account" className="text-white hover:text-gray-300">Account</Link>
                </li>
              )}
              {isAuthenticated && (
                <li className="ml-2 sm:ml-8">
                  <Link to="/shipping" className="text-white hover:text-gray-300">Shipping</Link>
                </li>
              )}
              {isAuthenticated && userRole && (
                <li className="ml-2 sm:ml-8">
                  <Link to="/admin" className="text-white hover:text-gray-300">Admin</Link>
                </li>
              )}
            </ul>
            {!isAuthenticated ? (
              <ul className="flex items-center ml-2 sm:ml-8">
                <li>
                  <button
                    onClick={() => keycloak.login({ redirectUri: window.location.origin + "/shipping" })}
                    className="bg-white text-violet-900 rounded-full py-2 px-4 hover:bg-gray-200 hover:text-violet-700 mr-3 transition-all whitespace-nowrap">
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => keycloak.register({ redirectUri: window.location.origin + "/shipping" })}
                    className="border border-white text-white rounded-full py-2 px-4 hover:bg-white hover:text-violet-800 transition-all whitespace-nowrap">
                    Sign up
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="flex items-center ml-3 sm:ml-8">
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







