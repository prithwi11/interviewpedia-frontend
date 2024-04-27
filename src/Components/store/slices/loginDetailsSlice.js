import { createSlice } from '@reduxjs/toolkit'

const loginDetailsSlice = createSlice({
    name : 'loginDetails',
    initialState : {},
    reducers : {
        addLoginDetails : (state, action) => {
            state.loginDetails = action.payload
        }
    }
})

export const { addLoginDetails } = loginDetailsSlice.actions
export default loginDetailsSlice.reducer