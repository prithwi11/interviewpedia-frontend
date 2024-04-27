import React from 'react'
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='flex h-7/8 overflow-hidden  dark:bg-gray-900 pt-16 w-1/4'>
      <aside id="sidebar" class="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-1/4 transition-width duration-75" aria-label="Sidebar">
         <div class="relative flex-1 flex flex-col min-h-0 border-r   dark:bg-gray-900 pt-0">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
               <div class="flex-1 px-3  dark:bg-gray-900 divide-y space-y-1">
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
                  </ul>
               </div>
            </div>
         </div>
      </aside>
      <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
    </div>
  )
}

export default Sidebar