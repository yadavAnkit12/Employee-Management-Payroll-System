import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    attendanceList: []
}

export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        getAttendance: (state, action) => {
            state.attendanceList=action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getAttendance } = attendanceSlice.actions

export default attendanceSlice.reducer