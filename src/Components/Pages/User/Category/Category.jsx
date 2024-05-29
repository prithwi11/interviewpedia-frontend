import React, {useState, useEffect} from 'react'
import { ApiCall } from '../../../services/middleware'
import { IMAGE_NAME } from '../../../enums'
import { Link, useNavigate, redirect } from "react-router-dom"

const Category = () => {
  const [categoryList, setCategoryList] = useState({})
  const category_image_path = 'http://localhost/InterviewPedia/interviewpedia-frontend/src/Components/assets/Images/uploads/category/'
  const navigate = useNavigate()

  const handleCategoryRedirect = async(categoryId) => {
    navigate(`/category/${categoryId}`)
  }

  const getCategoryList = async() => {
      let first = 0
      let rows = 100
      let payload = {first : first, rows : rows}
      let response = await ApiCall('category_for_user', payload, 'CLIENT')
      if (response) {
        setCategoryList(response.response.data.response)
      }
  }
  useEffect(() => {
    setTimeout(() => 2000)
    getCategoryList()
  }, [])
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryList.length > 0 ? (
          categoryList.map((category) => (
            <div key={category.category_id} className=" p-6 rounded-lg shadow-md bg-gray-100 border border-black cursor-pointer hover:scale-110 transition duration-200 ease-in-out" onClick={() => handleCategoryRedirect(category?.category_id)}>
                <img src={category_image_path + category?.image_url} alt="Webflow 101 crash course" className="mb-4 w-full h-32 object-cover rounded" />
                <h2 className="text-xl font-semibold">{category?.category_name}</h2>
            </div>
          ))
        ) : (
          <div>No Category found</div>
        )}
      </div>
    </div>
  )
}

export default Category