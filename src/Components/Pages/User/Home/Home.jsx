import React, {useState, useEffect} from 'react'
import { ApiCall } from '../../../services/middleware'
import { formateDateTime } from '../../../Helpers/CommonHelper';
import Article from '../../UI/Article';

const Home = () => {
  const [questionData, setQuestionData] = useState({})

  const getQuestionData = async() => {
    let first = 0
    let rows = 1000
    let payload = {first : first, rows : rows}
    let response = await ApiCall('question_list', payload, 'ADMIN')
    if (response) {
      setQuestionData(response.response.data)
    }
  }

  useEffect(() => {
    getQuestionData()
  }, [])

  return (
    <section class="bg-white dark:bg-gray-900 pt-20">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-green-700 dark:text-green-800">Interview Pedia</h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Your Personalized Interview Coach.</p>
        </div> 

        <div class="grid gap-8 lg:grid-cols-2 w-6/6 flex">
          {questionData.length > 0 ? (
            questionData.map((question, index) => (
              <Article key={index} question={question} />
            ))
          ): (
            <div>No Question data found</div>
          )}                
        </div>  
    </div>
  </section>
  )
}

export default Home