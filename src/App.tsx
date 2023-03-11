import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Account from "./pages/Account/Account";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shipping from "./pages/Shipping/Shipping";
import keycloak from "./keycloak";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from './const/roles'
import Navbar from './components/navbar/Navbar';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(()=>{
  //   const token = localStorage.getItem("keycloakToken");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

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
    <main className="App">
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/account"
          element={
            <KeycloakRoute role={ROLES.User} redirectTo="/">
              <Account />
            </KeycloakRoute>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>
  );
}

export default App;
