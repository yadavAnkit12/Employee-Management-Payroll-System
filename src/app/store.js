import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import attendanceReducer from "../features/attendance/attendanceSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        attendance: attendanceReducer
    },
})