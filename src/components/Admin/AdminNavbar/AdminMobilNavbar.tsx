type PropsType = {
    showMenu: () => void
}

const AdminMobilNavbar = ({showMenu}:PropsType) => {
    
    return (
      <div className='flex justify-between md:hidden bg-gray-700'>
            <a href='#' className='block p-4 font-extrabold text-2xl'>
                Admin
            </a>
            <button className="mobile-menu-button p-4 focus:outline-none focus:bg-violet-900 rounded m-1" onClick={() => showMenu()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
      </div>
    )
  }
  
  export default AdminMobilNavbar