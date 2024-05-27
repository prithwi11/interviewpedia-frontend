import React, {useState} from 'react'
import { IMAGE_NAME } from '../../../enums/index'
import { Link, useNavigate, redirect } from "react-router-dom"
import { emailValidator } from '../../../validators'
import { passwordValidator } from '../../../validators'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { ApiCall } from '../../../services/middleware'
import { COMMON } from '../../../constants/commonConstants'
import { addLoginDetails } from '../../../store/slices/loginDetailsSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
  }

  const handleLogin = async(e) => {
    let errCournter = 0
    const validateEmail = await emailValidator(email)
    if (validateEmail.status === false) {
      toast.error(validateEmail.message, { hideProgressBar: true });
      errCournter++
    }
    const validatePassword = await passwordValidator(password)
    if (validatePassword.status === false) {
      toast.error(validatePassword.message, { hideProgressBar : true })
      errCournter++
    }
    if (errCournter === 0) {
      const data = {
        email: email,
        password: password,
      }
      try {
        const login_data = await ApiCall('signin', data, COMMON.USER_TYPES[0].label)
        if (login_data) {
          if (login_data.response.status.action_status === false) {
            toast.error(login_data.response.status.message, { hideProgressBar : true })
          }
          else {
            toast.success('Logged in successfully', { hideProgressBar : true })
            window.localStorage.setItem('loginDetails', JSON.stringify(login_data.response.data))
            window.localStorage.setItem('authToken', JSON.stringify(login_data.response.data.token))
            dispatch(addLoginDetails(login_data.response.data))
            window.location.reload()
          }
        }
      }
      catch (e) {
        toast.error(e.message, { hideProgressBar : true })
        console.log(e)
      }
      
    }
    else {
      e.preventDefault()
    }
  }

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <ToastContainer hideProgressBar theme="colored"/>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img class="w-20 h-20" src={IMAGE_NAME.IMAGE_NAME.LOGO_ICON} alt="logo" />
                  <span class="text-green-500">INTERVIEW </span> PEDIA
          </Link>
          <div class="w-full bg-gradient-to-b from-customGreenLight to-customGreenDark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  <div class="space-y-4 md:space-y-6">
                      <div class="space-y-4 md:space-y-6">
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleEmailChange} />
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handlePasswordChange} />
                      </div>
                      <div class="flex items-center justify-between">
                          <div class="flex items-start">
                              <div class="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                              </div>
                              <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                              </div>
                          </div>
                          {/* <a  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                      </div>
                      <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleLogin}>Sign in</button>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <Link to="/admin-register" class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-teal-500">Sign up</Link>
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </section>
  )
}

export default Login