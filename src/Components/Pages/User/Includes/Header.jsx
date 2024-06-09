import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_NAME } from '../../../enums';

const Header = () => {
    const userDetails = window.localStorage.getItem('userLoginDetails')
  return (
    <nav className="  fixed z-30 -mt-24 w-full dark:bg-gray-900">
      <div className="px-3 py-3 lg:px-5 lg:pl-3 dark:bg-gray-900">
        <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
            <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                <svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
                <svg id="toggleSidebarMobileClose" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            </button>
            <Link to="/" class="text-xl font-bold flex items-center lg:ml-2.5">
                <img src={IMAGE_NAME.IMAGE_NAME.LOGO_ICON} class="h-6 mr-2" alt="Windster Logo" />
                <span class="self-center whitespace-nowrap text-green-500 mx-2">INTERVIEW</span><span  className='text-white'>PEDIA</span>
            </Link>
            </div>
            <div class="flex items-center">
                <div className='hidden lg:flex items-center'>
                    <input className='rounded-lg p-2 m-2' placeholder='Search' />
                    <button className=' text-white py-2 px-4  rounded-3xl'>
                        <img className='w-8 h-8' src={IMAGE_NAME.IMAGE_NAME.SEARCH_ICON} alt='search' />
                    </button>
                </div>
                {userDetails  ? (
                    <div class="hidden lg:flex items-center">
                        <img className='w-8 h-8' src={IMAGE_NAME.IMAGE_NAME.ADMIN_PROFILE_IMG} alt='profile-img'/>
                        <span className='text-white'>{userDetails.full_name}</span>
                    </div>
                ) : (
                    <div className='hidden lg:flex items-center'>
                        <button className='bg-green-800 text-white py-2 px-4 m-2 rounded-lg'>Sign in</button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
