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
            // CASE 2 + CASE 3
            if (isCurrentMonth || isFirstRun) {
                const newAttendance = employees.map(
                    (emp) => ({
                        // change here if you want more employee records
                        id: emp.id,
                        name: emp.name,
                        salary:emp.salary,
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
                dispatch(getAttendance(response.data));

                return;
            }

            // CASE 4
            alert(
                "Attendance data not found for selected month."
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
export const calculateSalary = (month) => {
    return async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/attendance?month=${month}`
            );

            if (!response.data.length) {
                alert("Data not found");
                return [];
            }

            const attendanceData = response.data[0];

            if (attendanceData.isPayrollLock) {
                alert(
                    "Payroll already generated for this month"
                );
                return [];
            }

            const totalDays = 30;

            const payroll = attendanceData.records.map(
                (emp) => {
                    const records =
                        emp.attendanceRecords || {};

                    let present = 0;
                    let absent = 0;
                    let leave = 0;

                    Object.values(records).forEach(
                        (status) => {
                            if (status === "P") present++;
                            else if (status === "A")
                                absent++;
                            else if (status === "L")
                                leave++;
                        }
                    );

                    const annualSalary =
                        Number(emp.salary);

                    const monthlySalary =
                        annualSalary / 12;

                    const perDaySalary =
                        monthlySalary / totalDays;

                    const payableDays =
                        present + leave;

                    const finalSalary =
                        payableDays * perDaySalary;

                    return {
                        name: emp.name,
                        annualSalary,
                        monthlySalary:
                            monthlySalary.toFixed(2),
                        totalPresent: present,
                        totalAbsent: absent,
                        totalLeave: leave,
                        payableSalary:
                            finalSalary.toFixed(2),
                    };
                }
            );
            return payroll;
        } catch (error) {
            console.error(error);
            alert("Salary calculation failed");
        }
    };
};

export const runPayroll = (month) => {
    return async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/attendance?month=${month}`
            );

            if (!response.data.length) {
                alert("Attendance data not found");
                return;
            }

            const attendanceData = response.data[0];

            if (attendanceData.isPayrollLock) {
                alert("Payroll already locked");
                return;
            }

            await axios.patch(
                `http://localhost:3001/attendance/${attendanceData.id}`,
                {
                    isPayrollLock: true,
                }
            );

            alert("Payroll run successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to run payroll");
        }
    };
};