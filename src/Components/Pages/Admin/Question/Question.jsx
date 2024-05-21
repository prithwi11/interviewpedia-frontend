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
import { InputTextarea } from 'primereact/inputtextarea';
import { Sidebar } from 'primereact/sidebar';
        
        
import '../../../assets/css/main.css'


const Question = () => {
  const [addQuestionModal, setAddQuestionModal] = useState(false)
  const [questionList, setQuestionList] = useState({})
  const [categoryList, setCategoryList] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [addQuestionName, setAddQuestionName] = useState(null)
  const [addAnswerName, setAddAnswerName] = useState(null)
  const [addCategoryName, setAddCategoryName] = useState(null)
  const [questionNameErrorText, setQuestionNameErrorText] = useState('')
  const [answerNameErrorText, setAnswerNameErrorText] = useState('')
  const [categoryNameErrorText, setCategoryNameErrorText] = useState('')
  const [visibleRight, setVisibleRight] = useState(false);

  const [editQuestionModal, setEditQuestionModal] = useState(false)
  const [deleteQuestionModal, setDeleteQuestionModal] = useState(false)
  const [addParentCategoryName, setAddParentCategoryName] = useState(0) 
  const [addLevel, setAddLevel] = useState(0)
  const [categoryDetails, setCategoryDetails] = useState({})
  const [selectedFile, setSelectedFile] = useState(null);


  const addQuestionTextHandler = (e) => {
    setAddQuestionName(e.target.value)
  }
  const addAnswerTextHandler = (e) => {
    setAddAnswerName(e.target.value)
  }
  const addCategoryHandler = (e) => {
    setAddCategoryName(e.target.value)
  }

  // const handleEditCategory = async(param) => {
  //   setEditQuestionModal(true)
  //   const category_id = param 
  //   const data = {category_id : category_id}
  //   try {
  //     const categoryDetails = await ApiCall('getCategoryById', data, 'ADMIN')
  //     setCategoryDetails(categoryDetails.response.data)
  //   }
  //   catch (e) {
  //     toast.error(e.data.response.message, { hideProgressBar : true })
  //   }
  // }

  // const editCategoryNameHandler = (e) => {
  //   setCategoryDetails({...categoryDetails, category_name : e.target.value})
  // }
  // const editParentCategoryHandler = (e) => {
  //   setCategoryDetails({...categoryDetails, parent_id : e.target.value})
  // }

  // const editCategoryStatusHandler = (e) => {
  //   setCategoryDetails({...categoryDetails, status : e.target.value})
  // }

  // const updateCategoryHandler = async() => {
  //   const data = {
  //     category_id : categoryDetails.category_id,
  //     category_name : categoryDetails.category_name,
  //     parent_id : categoryDetails.parent_id,
  //     status : categoryDetails.status
  //   }
  //   try {
  //     const updateCategory = await ApiCall('category_update', data, 'ADMIN')
  //     toast.success(updateCategory.response.data, { hideProgressBar : true })
  //     setEditCategoryModal(false)
  //     getCategoryList()
  //   }
  //   catch (e) {
  //     toast.error(e.data.response.message, { hideProgressBar : true })
  //   }
          
  // }

  // const handleDeleteCategory = async(param) => {
  //   setDeleteCategoryModal(true)
  //   try {
  //     const deleteCategory = await ApiCall('category_delete', {category_id : param}, 'ADMIN')
  //     toast.success(deleteCategory.response.status.message, { hideProgressBar : true })
  //     getCategoryList()
  //   }
  //   catch (e) {
  //     toast.error(e.data.response.message, { hideProgressBar : true })
  //   }
  // }

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0]; // Get the first selected file
  //   if (file && file.type === 'text/csv') { // Validate for CSV file
  //     setSelectedFile(file);
  //   } else {
  //     alert('Please select a valid CSV file.');
  //   }
  // };

  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     alert('Please select a CSV file to upload.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('csvFile', selectedFile); // Append file to FormData

  //   try {
  //     const response = await fetch('/your-upload-api', { // Replace with your API endpoint
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log('CSV file uploaded successfully!');
  //       setSelectedFile(null); // Clear selected file after successful upload
  //       // Handle successful upload actions (e.g., display success message)
  //     } else {
  //       console.error('Error uploading CSV file:', response.statusText);
  //       alert('An error occurred while uploading the CSV file.');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading CSV file:', error);
  //     alert('An error occurred while uploading the CSV file.');
  //   }
  // };

  // const handleParentCategoryChange = (e) => {
  //   const parent_id = e.target.value
  //   const selectedCategory = categoryList.find(category => category.category_id == e.target.value)
  //   setAddParentCategoryName(parent_id)
  //   const old_level = selectedCategory.level
  //   const new_level = parseInt(old_level) + 1
  //   setAddLevel(new_level)
  // }

  const addQuestionSetHandler = async() => {
    if (addQuestionName === '' || addQuestionName === null) {
      setQuestionNameErrorText('Question is required')
      return false
    }
    else if (addAnswerName == '' || addAnswerName == null) {
      setAnswerNameErrorText("Answer field is required")
      return false
    }
    else if (addCategoryName === ''|| addCategoryName === null) {
      setCategoryNameErrorText("Category field is required!")
      return false
    }
    else {
      setQuestionNameErrorText('')
      setAnswerNameErrorText('')
      setCategoryNameErrorText('')
      const data = {
        question_text : addQuestionName,
        answer_text : addAnswerName,
        category_id : addCategoryName,
        user_id : '0'
      }
      try {
        const addQUestion = await ApiCall('question_add', data,  'ADMIN')
        setAddQuestionModal(false)
        toast.success(addQUestion.response.status.message, { hideProgressBar : true })
        setAddCategoryName(null)
        setAddQuestionName('')
        setAddAnswerName('')
        getQuestionList()
      }
      catch (e) {
        console.log(e)
        toast.error(e.data.response.message, { hideProgressBar : true })
      }
      
    }
  }

  const getQuestionList = async() => {
    try {
      let first = 0
      let rows = 100
      let payload = {first : first, rows : rows}
      let response = await ApiCall('question_list', payload, 'ADMIN')
      if (response) {
        setIsLoading(false)
        setQuestionList(response.response.data)
        // setTotalCategoryCount(response.response.data.total_count)
      }
    }
    catch (e) {
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

  const getCategoryList = async() => {
    try {
      let first = 0
      let rows = 100
      let payload = {first : first, rows : rows}
      let response = await ApiCall('category_list', payload, 'ADMIN')
      if (response) {
        setIsLoading(false)
        setCategoryList(response.response.data.response)
      }
    }
    catch (e) {
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
    getQuestionList()
  }, [])

  const actionTemplate = (rowData) => {
    return (
        <>
           <DynamicButton label="Edit" color="var(--green-700)" onClick={() => setVisibleRight(true)} />
           <DynamicButton label="Delete" color="var(--gray-200)" textColor='black' />
        </>
    );
};


  return (
    <>
    {isLoading ?  <><PreLoader />  <ToastContainer hideProgressBar theme="colored"/></> : (
      <>
        <ToastContainer hideProgressBar theme="colored"/>
        <div id="main-content" className="h-screen w-5/6 dark:bg-gray-100 relative lg:ml-52 pt-20">
        <main>
          <div className="container  px-4 py-6 ">
            {/* Upper Part */}
            <h1 className='text-center font-bold text-3xl'>Question</h1>
            <div>
              <button className='m-2 p-2 float-right bg-green-700 text-white rounded-lg hover:bg-green-900' onClick={setAddQuestionModal}>Add Question</button>
              <button className='m-2 p-2 float-right bg-green-700 text-white rounded-lg hover:bg-green-900'>Add CSV</button>
              <input type="file" id="csvUpload" className="hidden"  accept=".csv"/>
            </div>

          {/* Table */}
            <div className='my-16'>
              <DataTable value={questionList} paginator rows={5} showGridlines sortMode="multiple" removableSort  stripedRows size='large' tableStyle={{ minWidth: '50rem' }}>
                  <Column field="question_text" header="Question" style={{ color: 'black' }} sortable></Column>
                  <Column field="answer_text" header="Answer" style={{ color: 'black' }} sortable></Column>
                  <Column field="int_category_question_mapping.int_category.category_name" header="Category" style={{ color: 'black' }} sortable></Column>
                  <Column field="status" header="Status" style={{ color: 'black' }}></Column>
                  <Column field="added_timestamp" header="Added on" style={{ color: 'black' }} sortable></Column>
                  <Column header="Edit" style={{ color: 'black', textAlign:"left" }} body={actionTemplate}></Column>
              </DataTable>
            </div>
            {/* Table Ends */}
            <Dialog header="Add Question Set" visible={addQuestionModal} style={{ width: '40vw' }} onHide={() => setAddQuestionModal(false)}>
                <div className="relative w-auto mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                    {/*header*/}
                    {/*body*/}
                    <div className="relative p-2 px-3 flex-auto">
                      <div className="mb-2">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Question</label>
                        <InputTextarea autoResize  onChange={(e) => addQuestionTextHandler(e)} rows={5} cols={40} /> 
                        <span className="text-red-500">{questionNameErrorText}</span>
                      </div>
                      <div className="mb-2">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Answer</label>
                        <InputTextarea autoResize  onChange={(e) => addAnswerTextHandler(e)} rows={5} cols={40} /> 
                        <span className="text-red-500">{answerNameErrorText}</span>
                      </div>
                      <div className="mb-5">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category</label>
                        <select id="countries" className="bg-white border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" onChange={(e) => addCategoryHandler(e)}>

                          <option value='' selected>Select an option</option>
                          {categoryList.map((category) => {
                            return <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                          })}
                        </select>
                        <span className="text-red-500">{categoryNameErrorText}</span>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end py-2 px-3 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setAddQuestionModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => addQuestionSetHandler()}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
          </Dialog>
            {/*Modal add starts*/}

            {/* Modal Add Ends */}
            {/* Modal Edit Starts */}
            <Sidebar visible={visibleRight} style={{ width: '50vw' }} position="right" onHide={() => setVisibleRight(false)}>
                  <div class="bg-gray-50 shadow-md rounded px-2 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Question
                      </label>
                      <InputTextarea className=' border border-gray-400 focus:outline-none' autoResize  onChange={(e) => addAnswerTextHandler(e)} rows={5} cols={40} />
                    </div>
                    <div class="mb-6">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Answer
                      </label>
                      <InputTextarea className=' border border-gray-400 focus:outline-none' autoResize  onChange={(e) => addAnswerTextHandler(e)} rows={5} cols={40} />
                    </div>
                    <div className="mb-4">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category</label>
                        <select id="countries" className="bg-white border border-gray-400 focus:outline-none text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" onChange={(e) => addCategoryHandler(e)}>

                          <option value='' selected>Select an option</option>
                          {categoryList.map((category) => {
                            return <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                          })}
                        </select>
                        <span className="text-red-500">{categoryNameErrorText}</span>
                      </div>

                      <div className="mb-4">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Status</label>
                        <select id="countries" className="bg-white border border-gray-400 focus:outline-none text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" value={categoryDetails.status}>

                          <option value='' selected>Select an option</option>
                          <option value='active'>Active</option>
                          <option value='inactive'>Inactive</option>
                        </select>
                      </div>
                    <div class="flex items-center justify-between">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Update
                      </button>
                    </div>
                  </div>
            </Sidebar>
          </div>
        </main>
        </div>
        </>
    )}
    
    </>
  );
}

export default Question;