import { ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import AdminNav from "./components/Admin/AdminNavbar/AdminNav";
import Account from "./pages/Account/Account";
import Admin from "./pages/Admin/Admin";
import EditShipmentStatus from "./pages/Admin/EditShipmentStatus";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shipping from "./pages/Shipping/Shipping";



function App() {
  return (
    <div className="bg-slate-900 text-white">
      <Routes>
        <Route path="/" element={<Shipping />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminNav component={Admin}/>} />
        <Route path="/admin/edit/:shipmentId" element={<AdminNav component={EditShipmentStatus}/>} />
      </Routes>
    </div>
  );
}

export default App;
