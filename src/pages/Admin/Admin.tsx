import React, { useState } from 'react'
import AdminMobilNavbar from '../../components/Admin/AdminNavbar/AdminMobilNavbar'
import AdminSidebar from '../../components/Admin/AdminNavbar/AdminSidebar'
import ShipmentList from '../../components/ShipmentList/ShipmentList';
import data from "./Admindummy.json";





const Admin = () => {
  const shipments = data.shipments;

  return (

    <div className='w-5/6 h-5/6'>
      <input className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/4 ' type="text" placeholder="Shipment ID"></input>
      <h2 className="text-2xl font-bold mt-5">Shipments</h2>
      <ShipmentList shipments={shipments} />
    </div>
  )
}

export default Admin