import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ApiCall } from '../../../services/middleware'
import { useNavigate, redirect } from 'react-router-dom'
import Article from '../../UI/Article'
import Slider from "react-slick";

const CategoryDetails = () => {
    const params = useParams()
    const category_id = params['id']

    const [questionList, setQuestionList] = useState({})
    const [categoryList, setCategoryList] = useState({})
    const [categoryDetails, setCategoryDetails] = useState({})

    const category_image_path = 'http://localhost/InterviewPedia/interviewpedia-frontend/src/Components/assets/Images/uploads/category/'
    const navigate = useNavigate()

    const handleCategoryRedirect = async(categoryId) => {
      redirect(`/category/${categoryId}`)
    }

    const getCategoryDetails = async() => {
      const payload = {parent_id : category_id}
      const categoryData = await ApiCall('category_details', payload, 'CLIENT')
      console.log(categoryData)
      setQuestionList(categoryData?.response?.data?.question_list)
      setCategoryList(categoryData?.response?.data?.category_list)
      setCategoryDetails(categoryData?.response?.data?.category_details)
    }

    useEffect(() => {
      getCategoryDetails()
    }, [])


    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "black", color : "black", fontSize: "32px"}}
          onClick={onClick}
        />
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "black" }}
          onClick={onClick}
        />
      );
    }


  return (
    <div className="container mx-auto pt-28 slider-container">
      <h1 className="text-3xl font-bold mb-8">{categoryDetails.category_name}</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <Slider {...settings} className='gap-6 p-4 mx-8'>
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
        </Slider>

      <div class="grid gap-8 lg:grid-cols-2 w-6/6 pt-12">
          {questionList.length > 0 ? (
            questionList.map((question, index) => (
              <Article key={index} question={question} />
            ))
          ): (
            <div>No Question data found</div>
          )}    
      </div>
    </div>
  )
}

export default CategoryDetails