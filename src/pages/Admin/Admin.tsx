import React, { useState } from 'react'
import AdminMobilNavbar from '../../components/Admin/AdminNavbar/AdminMobilNavbar'
import AdminSidebar from '../../components/Admin/AdminNavbar/AdminSidebar'
import ShipmentList from '../../components/ShipmentList/ShipmentList';
import data from "./dummy.json";





const Admin = () => {
  const shipments = data.shipments;
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  }
  return (
    <div className='relative min-h-screen bg-color-black text-white md:flex'>
      <AdminMobilNavbar showMenu={showMenu}/>
      <AdminSidebar menu={menu}/>
      <div className='flex-1 p-10 text-2xl font-bold flex items-center justify-center'>
        <div className='w-5/6 h-5/6'>
          <input className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/4 ' type="text" placeholder="Shipment ID"></input>
          <h2 className="text-2xl font-bold mt-5">Shipments</h2>
          <ShipmentList shipments={shipments} />
        </div>
      </div>
    </div>
  )
}

export default Admin