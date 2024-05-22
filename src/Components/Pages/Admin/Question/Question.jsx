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
import { Editor } from 'primereact/editor';
        
        
        
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
  const [questionDetails, setQuestionDetails] = useState({})
  const [editQuestionModal, setEditQuestionModal] = useState(false)



  const addQuestionTextHandler = (e) => {
    setAddQuestionName(e)
  }
  const addAnswerTextHandler = (e) => {
    setAddAnswerName(e)
  }
  const addCategoryHandler = (e) => {
    setAddCategoryName(e.target.value)
  }

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

  const editQuestionHandler = async(question_id) => {
    const data = {question_id : question_id}
    try {
      const questionEdit = await ApiCall('question_edit', data, 'ADMIN')
      setQuestionDetails(questionEdit.response.data)
      setEditQuestionModal(true)
    }
    catch (e) {
      console.log(e)
      toast.error(e.data.response.message, { hideProgressBar : true })
    } 
  }

  const editQuestionTextHandler = (e) => {
    setQuestionDetails({...questionDetails, question_text : e})
  }
  const editAnswerTextHandler = (e) => {
    setQuestionDetails({...questionDetails, answer_text : e})
  }

  const editCategoryHandler = (e) => {
    setQuestionDetails({...questionDetails, category_id : e.target.value})
  }

  const editStatusHandler = (e) => {
    setQuestionDetails({...questionDetails, status : e.target.value})
  }

  const updateQuestion = async() => {
    const data = {
      question_id : questionDetails.question_id,
      question_text : questionDetails.question_text,
      answer_text : questionDetails.answer_text,
      category_id : questionDetails.category_id ? questionDetails.category_id : questionDetails.int_category_question_mapping.fk_category_id,
      status : questionDetails.status,
      user_id : '0'
    }

    try {
      const updateQuestion = await ApiCall('question_update', data, 'ADMIN')
      toast.success(updateQuestion.response.data, { hideProgressBar : true })
      setEditQuestionModal(false)
      getQuestionList()
    }
    catch (e) {
      console.log(e)
      toast.error(e.data.response.message, { hideProgressBar : true })
    } 
  }

  const deleteQuestionHandler = async(question_id) => {
    const data = {question_id : question_id}
    try {
      const deleteQuestion = await ApiCall('question_delete', data, 'ADMIN')
      toast.success(deleteQuestion.response.data, { hideProgressBar : true })
      getQuestionList()
    }
    catch (e) {
      toast.error(e.data.response.message, { hideProgressBar : true })
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
           <DynamicButton label="Edit" color="var(--green-700)" onClick={() => editQuestionHandler(rowData.question_id)} />
           <DynamicButton label="Delete" color="var(--gray-200)" onClick={() => deleteQuestionHandler(rowData.question_id)} textColor='black' />
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
                  {/* <Column field="answer_text" header="Answer" style={{ color: 'black' }} sortable></Column> */}
                  <Column field="int_category_question_mapping.int_category.category_name" header="Category" style={{ color: 'black' }} sortable></Column>
                  <Column field="status" header="Status" style={{ color: 'black' }}></Column>
                  <Column field="added_timestamp" header="Added on" style={{ color: 'black' }} sortable></Column>
                  <Column header="Edit" style={{ color: 'black', textAlign:"left" }} body={actionTemplate}></Column>
              </DataTable>
            </div>
            {/* Table Ends */}
 
            {/*Modal add starts*/}

            <Sidebar header="Add Question" visible={addQuestionModal} style={{ width: '50vw' }} position="right" onHide={() => setAddQuestionModal(false)}>
                  <div class=" shadow-md rounded px-2 pt-6 pb-8 mb-4 border border-gray-800 focus:outline-none">
                    <div class="mb-4">
                      <label class="block  text-sm font-bold mb-2" for="username">
                        Question
                      </label>
                      <Editor onTextChange={(e) => addQuestionTextHandler(e.htmlValue)} style={{ height: '320px' }} />
                    </div>
                    <div class="mb-6">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Answer
                      </label>
                      <Editor  onTextChange={(e) => addAnswerTextHandler(e.htmlValue)} style={{ height: '320px' }} />
                    </div>
                    <div className="mb-4">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category</label>
                        <select id="countries" className="bg-white border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" onChange={(e) => addCategoryHandler(e)}>

                          <option value='' selected>Select an option</option>
                          {categoryList.map((category) => {
                            return <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                          })}
                        </select>
                        <span className="text-red-500">{categoryNameErrorText}</span>
                      </div>

                    <div class="flex items-center justify-between">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={addQuestionSetHandler}>
                        Submit
                      </button>
                    </div>
                  </div>
            </Sidebar>

            {/* Modal Add Ends */}
            {/* Modal Edit Starts */}
            <Sidebar header="Update Question" visible={editQuestionModal} style={{ width: '50vw' }} position="right" onHide={() => setEditQuestionModal(false)}>
                  <div class="bg-gray-50 shadow-md rounded px-2 pt-6 pb-8 mb-4 border border-gray-800 focus:outline-none">
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Question
                      </label>
                      <Editor value={questionDetails.question_text} onTextChange={(e) => editQuestionTextHandler(e.htmlValue)} style={{ height: '320px' }} />
                      {/* <InputTextarea className=' border border-gray-400 focus:outline-none' autoResize  onChange={(e) => editQuestionTextHandler(e)} rows={5} cols={40} value={questionDetails.question_text} /> */}
                    </div>
                    <div class="mb-6">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Answer
                      </label>
                      <Editor value={questionDetails.answer_text} onTextChange={(e) => editAnswerTextHandler(e.htmlValue)} style={{ height: '320px' }} />
                      {/* <InputTextarea className=' border border-gray-400 focus:outline-none' autoResize  onChange={(e) => editAnswerTextHandler(e)} rows={5} cols={40} value={questionDetails.answer_text} /> */}
                    </div>
                    <div className="mb-4">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category</label>
                        <select id="countries" className="bg-white border border-gray-400 focus:outline-none text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" onChange={(e) => editCategoryHandler(e)} value={questionDetails?.category_id ? questionDetails?.category_id : questionDetails?.int_category_question_mapping?.int_category?.category_id}>

                          <option value='' selected>Select an option</option>
                          {categoryList.map((category) => {
                            return <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                          })}
                        </select>
                        <span className="text-red-500">{categoryNameErrorText}</span>
                      </div>

                      <div className="mb-4">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Status</label>
                        <select id="countries" className="bg-white border border-gray-400 focus:outline-none text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600" value={questionDetails.status} onChange={(e) => editStatusHandler(e)}>

                          <option value='' selected>Select an option</option>
                          <option value='active'>Active</option>
                          <option value='inactive'>Inactive</option>
                        </select>
                      </div>
                    <div class="flex items-center justify-between">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={updateQuestion}>
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