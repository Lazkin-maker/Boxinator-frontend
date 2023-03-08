import React from 'react'
import { NavLink } from 'react-router-dom'


function AdminNavbar() {
  return (
    <div className='bg-color-indigo'>
        <nav>
            <div>
                <h1 className='font-bold uppercase p-4 text-white'>
                    <a href="#">Admin</a>
                </h1>
            </div>
            <ul>
                <li className='text mx-10  text-white'>
                    <a href="#" >
                        <span>Shipping</span>
                    </a>
                </li>
                <li className='text mx-10  text-white'>
                    <a href="#" >
                        <span>LogOut</span>
                    </a>
                </li>
            </ul>          
        </nav>
    </div>
  )
}

export default AdminNavbar