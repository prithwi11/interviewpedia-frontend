import React from 'react';

const Dashboard = () => {

  return (
    <div id="main-content" class="h-full w-5/6 bg-gray-500 relative lg:ml-64 pt-20">
      <main>
          <div class="container  px-4 py-6">
              <div class="flex justify-between mb-6">
                  <div class="w-full sm:w-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mb-4 sm:mb-0">
                      <div class="flex items-center justify-between">
                          <div class="flex-shrink-0">
                              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">$45,385</span>
                              <h3 class="text-base font-normal text-gray-500">Total Users</h3>
                          </div>
                      </div>
                  </div>
                  <div class="w-full sm:w-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mb-4 sm:mb-0">
                      <div class="flex items-center justify-between">
                          <div class="flex-shrink-0">
                              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">20</span>
                              <h3 class="text-base font-normal text-gray-500">Total Categories</h3>
                          </div>
                      </div>
                  </div>
                  <div class="w-full sm:w-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                      <div class="flex items-center justify-between">
                          <div class="flex-shrink-0">
                              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">300</span>
                              <h3 class="text-base font-normal text-gray-500">Total Questions</h3>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="bg-white shadow rounded-lg p-4 sm:p-6">
                  <h2 class="text-2xl font-bold text-gray-900 mb-4">Main Content Area</h2>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
              </div>
          </div>
      </main>
  </div>


  );
}

export default Dashboard;
