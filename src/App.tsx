import { Routes, Route } from "react-router-dom";
import './App.css';
import Account from "./pages/Account/Account";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shipping from "./pages/Shipping/Shipping";


function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>
  );
}

export default App;
