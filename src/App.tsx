import { Routes, Route } from "react-router-dom";
import './App.css';
import Account from "./pages/Account/Account";
import Admin from "./pages/Admin/Admin";
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
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
