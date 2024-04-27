import { configureStore } from '@reduxjs/toolkit'
import loginDetailsSlice from './slices/loginDetailsSlice'

export default configureStore({
    reducer : {
        loginDetails : loginDetailsSlice
    }
})