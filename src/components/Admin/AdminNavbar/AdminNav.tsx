import { ComponentType, useState } from "react";
import AdminMobilNavbar from "./AdminMobilNavbar";
import AdminSidebar from "./AdminSidebar";

interface MyProps {
    component: ComponentType<any>;
  }

const AdminNav = ({ component:  Component }:MyProps) => {
    const [menu, setMenu] = useState(false);
    const showMenu = () => {    
    menu ? setMenu(false) : setMenu(true);
  }
    return (
      <div className='relative min-h-screen bg-color-black text-white md:flex'>
            <AdminMobilNavbar showMenu={showMenu}/>
            <AdminSidebar menu={menu}/>
            <div className='flex-1 p-10 text-2xl font-bold flex items-center justify-center'>
                <Component />
            </div>
      </div>
    )
  }
  
  export default AdminNav