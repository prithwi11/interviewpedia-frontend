import React from 'react'
import { Link, redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
   const navigate = useNavigate()
   const handleLogOut = () => {
      window.localStorage.removeItem('loginDetails')
      window.location.reload()
   }
  return (
    <aside id="sidebar" className="fixed  z-20 h-full top-0 left-0 pt-12 flex lg:flex flex-shrink-0 flex-col w-1/6 transition-width duration-75 " aria-label="Sidebar">
      <div className="relative flex-1 flex flex-col min-h-0 border-r dark:bg-gray-900 pt-0 h-screen">
        {/* Sidebar content */}
        {/* You can copy the content inside the aside tag from the provided Tailwind code */}
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto h-screen">
            <div class="flex-1 px-3 dark:bg-gray-900 divide-y space-y-1 h-screen">
            <ul class="space-y-2 pb-2 text-white">
                     <li>
                        <Link to="/admin"  class="text-base  font-normal rounded-lg flex items-center p-2 hover:text-green-500 group">
                           <span class="ml-3">Dashboard</span>
                        </Link>
                     </li>
                     <li>
                        <Link to="/admin-register"  class="text-base text-white font-normal rounded-lg flex items-center p-2 hover:text-green-500 group">
                           <span class="ml-3">Add User</span>
                        </Link>
                     </li>
                     <li>
                        <Link to="/admin/category"  class="text-base text-white font-normal rounded-lg flex items-center p-2 hover:text-green-500 group">
                           <span class="ml-3">Category</span>
                        </Link>
                     </li>
                     <li>
                        <Link to="/admin/question"  class="text-base text-white font-normal rounded-lg flex items-center p-2 hover:text-green-500 group">
                           <span class="ml-3">Questions</span>
                        </Link>
                     </li>
                     <li>
                        <p onClick={() => handleLogOut()} class="text-base text-white font-normal rounded-lg flex items-center p-2 hover:text-green-500 group">
                           <span class="ml-3">Logout</span>
                        </p>
                     </li>
                  </ul>
            </div>
        </div>
        </div>
    </aside>
  );
}

export default Sidebar;
