import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ApiCall } from '../../../services/middleware';
import { useEffect } from 'react';
import { useState } from 'react';
import PreLoader from '../../PreLoader';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const Category = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [categoryList, setCategoryList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const getCategoryList = async() => {
    try {
      let response = await ApiCall('category_list', {}, 'ADMIN')
      if (response) {
        setIsLoading(false)
        setCategoryList(response.response.data)
      }
    }
    catch (e) {
      console.log(e)
      if (e.data) {
          toast.error(e.data.response.status.message, { hideProgressBar : true })
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
          <h1 className='text-center font-bold text-3xl'>Category</h1>
          <button className='m-2 p-2 float-right bg-green-700 text-white rounded-lg hover:bg-green-900' onClick={setShowModal}>Add Category</button>
          <button className='m-2 p-2 float-right bg-green-700 text-white rounded-lg hover:bg-green-900'>Add CSV</button>

          <TableContainer component={Paper} sx={{ border: '1px solid rgba(0, 0, 0, 1)' }}>
            <Table  aria-label="simple table">
              <TableHead sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableRow>
                  <TableCell sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Category Name</TableCell>
                  <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Parent</TableCell>
                  <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Level</TableCell>
                  <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Status</TableCell>
                  <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList.map((category) => (
                  <TableRow
                    key={category.category_id}
                    sx={{ '&:last-child td, &:last-child th': { borderRight: '1px solid rgba(0, 0, 0, 1)' } }}
                  >
                    <TableCell component="th" scope="category" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>
                      {category.category_name}
                    </TableCell>
                    <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>{category.parent_category_name}</TableCell>
                    <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>{category.level}</TableCell>
                    <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>{category.status}</TableCell>
                    <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}><button className='px-4 mx-4 rounded-sm bg-green-600'>Edit</button><button className='px-4 mx-4 rounded-sm bg-red-600'>Delete</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
        </div>
      </main>
    </div>
    )}
    
    </>
  );
}

export default Category;