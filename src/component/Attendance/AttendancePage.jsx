import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAttendanceByMonth, updateAttendance } from "../../features/attendance/attendanceThunk";
import AttendanceModal from "./AttendanceModal";

const AttendancePage = () => {
    const dispatch = useDispatch();

    const attendanceList = useSelector((state) => state.attendance.attendanceList);

    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    useEffect(() => {
        dispatch(getAttendanceByMonth(month));
    }, [month]);
    useEffect(() => {
        if (selectedEmployee && attendanceList.length > 0) {
            const updatedEmployee =
                attendanceList[0].records.find(
                    (emp) => emp.id === selectedEmployee.id
                );

            if (updatedEmployee) {
                setSelectedEmployee(updatedEmployee);
            }
        }
    }, [attendanceList]);

    const handleChangeAttendance = (employeeId, day, status) => {
        dispatch(updateAttendance(attendanceList[0].id, employeeId, day, status, month));
    };

    console.log(attendanceList)

    return (
        <div className="w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Attendance Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage employee monthly attendance
                        </p>
                    </div>

                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border rounded-xl px-4 py-2 shadow-sm"
                    />
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-gray-600">
                                <th className="p-4">Employee</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                attendanceList.length > 0 ? attendanceList[0].records.map((emp) => (
                                    <tr
                                        key={emp.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-4 font-medium">
                                            {emp.name}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => setSelectedEmployee(emp)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                )) : ''
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedEmployee && (
                <AttendanceModal
                    employee={selectedEmployee}
                    attendanceList={attendanceList}
                    month={month}
                    onClose={() => setSelectedEmployee(null)}
                    handleChangeAttendance={handleChangeAttendance}
                />
            )}
        </div>
    );
};

export default AttendancePage;