import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ApiCall } from '../../../services/middleware';
import { useEffect } from 'react';
import { useState } from 'react';
import PreLoader from '../../PreLoader';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from 'primereact/dialog';
import DynamicButton from '../UI/Button';
        
import './Category.css'


const Category = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [categoryList, setCategoryList] = useState(null)
  const [totalCategoryCount, setTotalCategoryCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [editCategoryModal, setEditCategoryModal] = useState(false)
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

  const handleEditCategory = () => {
    setEditCategoryModal(true)
    console.log('editCategoryModal', editCategoryModal)
  }
  const handleDeleteCategory = () => {
    setDeleteCategoryModal(true)
  }

  const getCategoryList = async() => {
    try {
      let first = 0
      let rows = 100
      let payload = {first : first, rows : rows}
      let response = await ApiCall('category_list', payload, 'ADMIN')
      if (response) {
        setIsLoading(false)
        setCategoryList(response.response.data.response)
        setTotalCategoryCount(response.response.data.total_count)
      }
    }
    catch (e) {
      console.log(e)
      if (e.data) {
        if (e.status === 400) {
          toast.error(e.data.response.message, { hideProgressBar : true })
        }
        else if (e.status === 500) {
          toast.error(e.data.response.status.message, { hideProgressBar : true })
        }
      }
      else {
        toast.error(e.message, { hideProgressBar : true })
      }
    }
  }
  useEffect(() => {
    setTimeout(() => 2000)
    getCategoryList()
  }, [])


  return (
    <>
    {isLoading ?  <><PreLoader />  <ToastContainer hideProgressBar theme="colored"/></> : (
      <div id="main-content" className="h-screen w-5/6 dark:bg-gray-100 relative lg:ml-52 pt-20">
      <main>
        <div className="container  px-4 py-6 ">
          {/* Upper Part */}
          <h1 className='text-center font-bold text-3xl'>Category</h1>
          <div>
            <button className='m-2 p-2 float-right bg-green-700 text-white rounded-lg hover:bg-green-900' onClick={setShowModal}>Add Category</button>
            <button className='m-2 p-2 float-right bg-green-700 text-white rounded-lg hover:bg-green-900'>Add CSV</button>
          </div>

        {/* Table */}
          <div className='my-16'>
            <DataTable value={categoryList} paginator rows={5} showGridlines sortMode="multiple" removableSort  stripedRows size='large' tableStyle={{ minWidth: '50rem' }}>
                <Column field="category_name" header="Category Name" style={{ color: 'black' }} sortable></Column>
                <Column field="parent_category_name" header="Parent" style={{ color: 'black' }} sortable></Column>
                <Column field="status" header="Status" style={{ color: 'black' }}></Column>
                <Column field="added_timestamp" header="Added on" style={{ color: 'black' }} sortable></Column>
                <Column header="Edit" style={{ color: 'black', textAlign:"left" }} body={<><DynamicButton label="Edit" onClick={handleEditCategory} color="var(--green-700)" /><DynamicButton label="Delete" color="var(--gray-200)" textColor='black' /></>}></Column>
            </DataTable>
          </div>
          {/* Table Ends */}

          {/* Modal add start */}
          {showModal ? (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Add Category
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="mb-5">
                          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category Name</label>
                          <input type="text" className="bg-gray-100 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" placeholder="Add Category"/>
                        </div>
                        <div className="mb-5">
                          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Parent Category</label>
                          <select id="countries" className="bg-gray-100 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600">

                            <option value='' selected>Select an option</option>
                          </select>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </>
          ) : null}
          {/* Modal Add Ends */}
          {/* Modal Edit Starts */}
          <Dialog header="Update Category" visible={editCategoryModal} style={{ width: '30vw' }} onHide={() => setEditCategoryModal(false)}>
              <div className="relative w-auto mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  {/*header*/}
                  {/*body*/}
                  <div className="relative p-2 px-3 flex-auto">
                    <div className="mb-2">
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category Name</label>
                      <input type="text" className="bg-white border border-gray-300  text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" placeholder="Add Category"/>
                    </div>
                    <div className="mb-5">
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Parent Category</label>
                      <select id="countries" className="bg-white border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600">

                        <option value='' selected>Select an option</option>
                      </select>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end py-2 px-3 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
        </Dialog>
        </div>
      </main>
    </div>
    )}
    
    </>
  );
}

export default Category;