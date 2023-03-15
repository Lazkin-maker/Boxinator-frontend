import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import AdminNav from "./components/Admin/AdminNavbar/AdminNav";
import Account from "./pages/Account/Account";
import Admin from "./pages/Admin/Admin";
import EditShipmentStatus from "./pages/Admin/EditShipmentStatus";
import Shipping from "./pages/Shipping/Shipping";
import keycloak from "./keycloak";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from './const/roles'
import CountryMultiplier from "./pages/Admin/CountryMultiplier";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(keycloak.authenticated);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'check-sso',
          checkLoginIframe: false,
          enableLogging: true,
          flow: 'standard',
        });
        setIsAuthenticated(authenticated);
        if (authenticated) {
          localStorage.setItem('keycloakToken', keycloak.token!);
        } else {
          localStorage.removeItem('keycloakToken');
        }
      } catch (error) {
        console.error('Error initializing Keycloak: ', error);
      }
    };
    initKeycloak();
  }, []);


  return (
    <main className="min-h-screen bg-slate-900 text-white">

      <Routes>
        <Route path="/" element={<Shipping />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/account"
          element={
            <KeycloakRoute role={ROLES.User} redirectTo="/">
              <Account />
            </KeycloakRoute>
          }
        />
        <Route path="/admin" element={
          <KeycloakRoute role={ROLES.Admin} redirectTo="/shipping">
            <AdminNav component={Admin} />
          </KeycloakRoute>
        }
        />
        <Route path="/admin/edit/:shipmentId" element={
          <KeycloakRoute role={ROLES.Admin} redirectTo="/shipping">
            <AdminNav component={EditShipmentStatus} />
          </KeycloakRoute>
        }
        />
        <Route path="/admin/country" element={
          <KeycloakRoute role={ROLES.Admin} redirectTo="/shipping">
            <AdminNav component={CountryMultiplier} />
          </KeycloakRoute>
        }
        />
      </Routes>
    </main>
  );
}

export default App;
