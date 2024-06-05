import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { emailValidator } from '../../../validators'
import { passwordValidator } from '../../../validators'
import { ToastContainer, toast } from 'react-toastify'
import { ApiCall } from '../../../services/middleware'
import { IMAGE_NAME } from '../../../enums'

const Verificaton = () => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = useRef([]);
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userEmail = window.localStorage.getItem('emailLogin')
    setEmail(userEmail)
  }, [])
  

  const handleVerificationChange = (event, index) => {
    const newOtp = [...otp];
    newOtp[index] = event;
    setOtp(newOtp);

    if (event.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    } else if (event === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    if (newOtp.length > 3) {
      setVerificationCode(newOtp.join(''));
      setIsButtonDisabled(false)
    }
  }

  const handleFormSubmit = async() => { 
    console.log(">>>>>>>>>")
    let errCournter = 0
    const userId = window.localStorage.getItem('userIdLogin')
    if (verificationCode.length < 4) {
      toast.error("Please enter verification code");
      errCournter++
    }

    if (errCournter === 0) {
      setIsFormSubmitting(true)
      const data = {
        verificationCode : verificationCode,
        userId : userId
      }
      try {
        const check_verify = await ApiCall('check_verification', data, 'CLIENT')
        loginUser(check_verify.response.data)
      }
      catch (e) {
        console.log(e)
        toast.error(e.data.response.status.message)
      }
    }
  }

  const loginUser = async(userData) => {
    const email = window.localStorage.getItem('emailLogin')
    const password = window.localStorage.getItem('passwordLogin')
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
        setIsFormSubmitting(false)
        console.log(e)
        toast.error(e.data.response.status.message)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <ToastContainer hideProgressBar theme="colored"/>
        <div className=" bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="font-semibold text-3xl">
                        <p>Email Verification</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                        <p>We have sent a code to your email {email}</p>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col space-y-16">
                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                          {otp.map((digit, index) => (
                            <div className="w-16 h-16 ">
                              <input 
                                className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-black text-lg bg-white focus:ring-1 ring-blue-700"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleVerificationChange(e.target.value, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                 />
                          </div>
                          ))}
                        </div>

                        <div className="flex flex-col space-y-5">
                            <div>
                                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-green-700 border-none text-white text-sm shadow-sm" 
                                disabled={isButtonDisabled}
                                onClick={handleFormSubmit}>
                                Verify Account
                                </button>
                            </div>

                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Verificaton