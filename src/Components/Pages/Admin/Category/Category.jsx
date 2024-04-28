import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Category = () => {
  const [showModal, setShowModal] = React.useState(false);
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <div id="main-content" class="h-screen w-5/6 dark:bg-gray-100 relative lg:ml-52 pt-20">
      <main>
        <div class="container  px-4 py-6 ">
          <h1 className='text-center font-bold text-3xl'>Category</h1>
          <button className='m-2 p-2 float-right bg-green-700 text-white rounded-lg hover:bg-green-900' onClick={setShowModal}>Add Category</button>
          <button className='m-2 p-2 float-right bg-green-700 text-white rounded-lg hover:bg-green-900'>Add CSV</button>

          <TableContainer component={Paper} sx={{ border: '1px solid rgba(0, 0, 0, 1)' }}>
            <Table  aria-label="simple table">
              <TableHead sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableRow>
                  <TableCell sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Dessert (100g serving)</TableCell>
                  <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Calories</TableCell>
                  <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Fat&nbsp;(g)</TableCell>
                  <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { borderRight: '1px solid rgba(0, 0, 0, 1)' } }}
                  >
                    <TableCell component="th" scope="row" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>{row.calories}</TableCell>
                    <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>{row.fat}</TableCell>
                    <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>{row.carbs}</TableCell>
                    <TableCell align="right" sx={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>{row.protein}</TableCell>
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
                        <div class="mb-5">
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category Name</label>
                          <input type="text" class="bg-gray-100 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" placeholder="Add Category"/>
                        </div>
                        <div class="mb-5">
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Parent Category</label>
                          <select id="countries" class="bg-gray-100 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600">

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
  );
}

export default Category;