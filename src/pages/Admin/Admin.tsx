import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import PackageList from '../../components/Packages/PackageList'



function Admin() {
  return (
    <div className='grid grid-cols-3'>
      <AdminNavbar />
      <div className='flex justify-center mt-11'>
        <input className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-2/4 ' type="text" placeholder="Username"></input>
      </div>
        <PackageList />
    </div>
  )
}

export default Admin