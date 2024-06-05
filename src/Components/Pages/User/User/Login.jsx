import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { emailValidator } from '../../../validators'
import { passwordValidator } from '../../../validators'
import { ToastContainer, toast } from 'react-toastify'
import { ApiCall } from '../../../services/middleware'
import { IMAGE_NAME } from '../../../enums'

const Login = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (value) => {
    setEmail(value);
  }
  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  const handleFormSubmit = async() => {
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
        setIsFormSubmitting(true)
      const data = {
        email : email,
        password : password
      }
      try {
        const login_user = await ApiCall('login', data, 'CLIENT')
        window.localStorage.setItem('userLoginDetails', login_user.response.data)
        navigate('/')
      }
      catch (e) {
        console.log(e)
        toast.error(e.data.response.status.message)
        if (e.data.response.data?.is_verified === '0') {
            sendEmail({user_id : e.data.response.data.user_id, email : email, password : password})
            navigate('/verification')
        }
      }
    }
  }

  const sendEmail = async(userData) => {
    const data = {
        email : userData.email,
        userId : userData.user_id
    }
    
    try {
        const create_verification = await ApiCall('create_verification', data, 'CLIENT')
        toast.success('Verification email sent successfully')
        setIsFormSubmitting(false)
        window.localStorage.setItem('userIdLogin', userData.user_id)
        window.localStorage.setItem('emailLogin', email)
        window.localStorage.setItem('passwordLogin', password)
        navigate('/verification')
    }
    catch (e) {
        setIsFormSubmitting(false)
        console.log(e)
        toast.error(e.data.response.status.message)
    }
  }

  return (
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer hideProgressBar theme="colored"/>
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div>
                    <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                        class="w-32 mx-auto" alt='bg-signin'/>
                </div>
                <div class="mt-12 flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">
                        Sign in
                    </h1>
                    <div class="w-full flex-1 mx-8">
                        {/* <div class=" flex-col items-center hidden">
                            <button
                                class="w-1/2 max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                <div class="bg-white p-2 rounded-full">
                                    <svg class="w-2" viewBox="0 0 533.5 544.3">
                                        <path
                                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                            fill="#4285f4" />
                                        <path
                                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                            fill="#34a853" />
                                        <path
                                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                            fill="#fbbc04" />
                                        <path
                                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                            fill="#ea4335" />
                                    </svg>
                                </div>
                                <span class="ml-4">
                                    Sign Up with Google
                                </span>
                            </button>

                            <button
                                class="w-1/2 max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                <div class="bg-white p-1 rounded-full">
                                    <svg class="w-3" viewBox="0 0 32 32">
                                        <path fill-rule="evenodd"
                                            d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                                    </svg>
                                </div>
                                <span class="ml-4">
                                    Sign Up with GitHub
                                </span>
                            </button>
                        </div> */}

                        <div class="my-2 border-b text-center">
                            <div
                                class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                 sign in with e-mail
                            </div>
                        </div>

                        <div class="mx-auto max-w-xs my-4">
                            <input
                                class="w-full px-8 py-4 rounded-lg font-medium border border-black text-sm focus:outline-none"
                                type="email" placeholder="Email" onChange={(e) => handleEmailChange(e.target.value)} />
                            <input
                                class="w-full px-8 py-4 my-4 rounded-lg font-medium border border-black text-sm focus:outline-none"
                                type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} />
                            <button
                                className={`
                                mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg flex items-center justify-center focus:shadow-outline focus:outline-none
                                ${isFormSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:bg-green-700 transition-all duration-300 ease-in-out '}
                                `} 
                                onClick={handleFormSubmit}
                                disabled={isFormSubmitting}
                                >
                                { isFormSubmitting && (
                                    <img src={IMAGE_NAME.IMAGE_NAME.BUTTON_LOADER} className='h-6 mr-2' alt='button-loader' />
                                )}
                                <span class="">
                                    Sign In
                                </span>
                            </button>
                            <p class="mt-6 text-xs text-gray-600 text-center">
                                I agree to abide by templatana's
                                <a href="#" class="border-b border-gray-500 border-dotted">
                                    Terms of Service
                                </a>
                                and its
                                <a href="#" class="border-b border-gray-500 border-dotted">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    >
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login