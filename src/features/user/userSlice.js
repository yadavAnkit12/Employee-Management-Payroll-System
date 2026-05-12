import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    users:[]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        addEmployee:(state,action)=>{

        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const { loginUser, addEmployee,setUsers } = userSlice.actions

export default userSlice.reducer