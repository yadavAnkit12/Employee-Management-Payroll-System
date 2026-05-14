import axios from "axios";
import { getAttendance } from "./attendanceSlice";

export const getAttendanceByMonth = (month) => {
    return async (dispatch) => {
        try {
            const empRes = await axios.get(
                "http://localhost:3001/users?role=employee"
            );

            const attRes = await axios.get(
                `http://localhost:3001/attendance?month=${month}`
            );

            const allAttendance = await axios.get(
                "http://localhost:3001/attendance"
            );

            const employees = empRes.data;
            const attendance = attRes.data;

            const currentMonth = new Date()
                .toISOString()
                .slice(0, 7); // YYYY-MM

            // CASE 1: Attendance already exists
            if (attendance.length > 0) {
                dispatch(getAttendance(attendance));
                return;
            }

            const isCurrentMonth = month === currentMonth;
            const isFirstRun =
                allAttendance.data.length === 0;
            console.log(isCurrentMonth,isFirstRun)
            // CASE 2 + CASE 3
            if (isCurrentMonth || isFirstRun) {
                const newAttendance = employees.map(
                    (emp) => ({
                        // change here if you want more employee records
                        id: emp.id,
                        name: emp.name,
                        attendanceRecords: {},
                    })
                );

                const createdAttendance = {
                    month,
                    isPayrollLock: false,
                    records: newAttendance,
                };

                const response = await axios.post(
                    "http://localhost:3001/attendance",
                    createdAttendance
                );

                dispatch(
                    getAttendance(response.data)
                );

                return;
            }

            // CASE 4
            alert(
                "Attendance data not found for selected historical month."
            );
        } catch (error) {
            console.error(error);
            alert("Failed to fetch attendance");
        }
    };
};

export const updateAttendance = (
    attendanceId,
    employeeId,
    day,
    status,
    month
) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(
                `http://localhost:3001/attendance/${attendanceId}`
            );

            const attendanceData = res.data;

            const updatedRecords =
                attendanceData.records.map((emp) => {
                    if (emp.id === employeeId) {
                        return {
                            ...emp,
                            attendanceRecords: {
                                ...(emp.attendanceRecords || {}),
                                [day]: status,
                            },
                        };
                    }

                    return emp;
                });

            await axios.patch(
                `http://localhost:3001/attendance/${attendanceId}`,
                {
                    records: updatedRecords,
                }
            );

            dispatch(getAttendanceByMonth(month));
        } catch (error) {
            console.error(error);
            alert("Failed to update attendance");
        }
    };
};