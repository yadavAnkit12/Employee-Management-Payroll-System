import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendancePage = () => {
    const [month, setMonth] = useState("2026-05");
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchData = async () => {
        const empRes = await axios.get("http://localhost:3001/employees");
        const attRes = await axios.get(
            `http://localhost:3001/attendance?month=${month}`
        );

        setEmployees(empRes.data);
        setAttendance(attRes.data);
    };

    useEffect(() => {
        fetchData();
    }, [month]);

    const mergedData = employees.map((emp) => {
        const att = attendance.find((a) => a.employeeId === emp.id);

        const presentDays = att
            ? Object.values(att.days).filter((d) => d === "P").length
            : 0;

        const absentDays = att
            ? Object.values(att.days).filter((d) => d === "A").length
            : 0;

        const leaveDays = att
            ? Object.values(att.days).filter((d) => d === "L").length
            : 0;

        return {
            ...emp,
            attendance: att,
            presentDays,
            absentDays,
            leaveDays,
        };
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Attendance Dashboard
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Manage employee monthly attendance
                    </p>
                </div>

                {/* Month Selector */}
                <div className="bg-white shadow-md rounded-xl px-4 py-2">
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="outline-none"
                    />
                </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-gray-500 text-sm">Total Employees</h2>
                    <p className="text-2xl font-bold text-blue-600">
                        {employees.length}
                    </p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-gray-500 text-sm">Avg Present Days</h2>
                    <p className="text-2xl font-bold text-green-600">
                        {mergedData.reduce((acc, e) => acc + e.presentDays, 0)}
                    </p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-gray-500 text-sm">Avg Absent Days</h2>
                    <p className="text-2xl font-bold text-red-500">
                        {mergedData.reduce((acc, e) => acc + e.absentDays, 0)}
                    </p>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Employee Attendance
                    </h2>
                </div>

                <table className="w-full">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4 text-left">Employee</th>
                            <th>Department</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Leave</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {mergedData.map((emp) => (
                            <tr
                                key={emp.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-4 font-medium text-gray-800">
                                    {emp.name}
                                </td>

                                <td className="text-gray-600">{emp.department}</td>

                                <td>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                        {emp.presentDays}
                                    </span>
                                </td>

                                <td>
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                        {emp.absentDays}
                                    </span>
                                </td>

                                <td>
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                        {emp.leaveDays}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        onClick={() => setSelectedEmployee(emp)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm transition"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {selectedEmployee && (
                <AttendanceModal
                    employee={selectedEmployee}
                    month={month}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
        </div>
    );
};

export default AttendancePage;