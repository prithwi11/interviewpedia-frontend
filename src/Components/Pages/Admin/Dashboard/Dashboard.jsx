import React from 'react'

const Dashboard = () => {
  return (
    <div className='h-7/8 w-3/4 float-right bg-gray-50 relative overflow-y-auto mt-8 -mx-2'>
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white shadow rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">100</span>
              <h3 class="text-base font-normal text-gray-500">Total Users</h3>
            </div>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">50</span>
              <h3 class="text-base font-normal text-gray-500">Total Categories</h3>
            </div>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">200</span>
              <h3 class="text-base font-normal text-gray-500">Total Questions</h3>
            </div>
          </div>
        </div>
      </div>
    <div class="bg-white shadow rounded-lg p-4 mt-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">Graph Card</span>
          <h3 class="text-base font-normal text-gray-500">This is where the graph will be displayed</h3>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard