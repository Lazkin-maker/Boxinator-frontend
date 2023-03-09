import React, { useState } from 'react'
import AdminMobilNavbar from '../../components/Admin/AdminNavbar/AdminMobilNavbar'
import AdminSidebar from '../../components/Admin/AdminNavbar/AdminSidebar'





const Admin = () => {
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  }
  return (
    <div className='relative min-h-screen bg-color-black text-white md:flex'>
      <AdminMobilNavbar showMenu={showMenu}/>
      <AdminSidebar menu={menu}/>
      <div className='flex-1 p-10 text-2xl font-bold'>
        <input className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/4 ' type="text" placeholder="Username"></input>
      </div>
    </div>
  )
}

export default Admin