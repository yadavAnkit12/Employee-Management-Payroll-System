import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { calculateSalary, runPayroll } from "../../features/attendance/attendanceThunk";

const CalculateSalary = () => {
    const dispatch = useDispatch();

    const [month, setMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );

    const [payrollData, setPayrollData] = useState([]);

    useEffect(() => {
        const fetchPayroll = async () => {
            const res = await dispatch(
                calculateSalary(month)
            );

            setPayrollData(res || []);
        };

        fetchPayroll();
    }, [month]);

    const handleRunPayroll = async () => {
        dispatch(runPayroll(month))
    };

    return (
        <div className="w-7xl mx-auto p-8">

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Payroll Management
                </h1>
                <p className="text-gray-500 mt-2">
                    Generate employee salary based on attendance
                </p>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mt-6">

                    <input
                        type="month"
                        value={month}
                        onChange={(e) =>
                            setMonth(e.target.value)
                        }
                        className="border px-4 py-3 rounded-xl shadow-sm"
                    />

                    <button
                        onClick={handleRunPayroll}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                        Run Payroll
                    </button>
                </div>
            </div>

            {payrollData.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Report Header */}
                    <div className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Payroll Report
                            </h2>
                            <p className="text-blue-100 text-sm mt-1">
                                Salary breakdown for {month}
                            </p>
                        </div>

                        <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                            {payrollData.length} Employees
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">

                            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">Employee</th>
                                    <th className="px-6 py-4 text-left">Annual</th>
                                    <th className="px-6 py-4 text-left">Monthly</th>
                                    <th className="px-6 py-4 text-center">Present</th>
                                    <th className="px-6 py-4 text-center">Absent</th>
                                    <th className="px-6 py-4 text-center">Leave</th>
                                    <th className="px-6 py-4 text-right">Payable</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {payrollData.map((emp, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-blue-50 transition-all duration-200"
                                    >
                                        {/* Employee */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                                    {emp.name.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {emp.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Employee
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Annual */}
                                        <td className="px-6 py-5 font-medium text-gray-700">
                                            ₹{emp.annualSalary.toLocaleString()}
                                        </td>

                                        {/* Monthly */}
                                        <td className="px-6 py-5 text-gray-700">
                                            ₹
                                            {Number(
                                                emp.monthlySalary
                                            ).toLocaleString()}
                                        </td>

                                        {/* Present */}
                                        <td className="px-6 py-5 text-center">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                {emp.totalPresent}
                                            </span>
                                        </td>

                                        {/* Absent */}
                                        <td className="px-6 py-5 text-center">
                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                {emp.totalAbsent}
                                            </span>
                                        </td>

                                        {/* Leave */}
                                        <td className="px-6 py-5 text-center">
                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                {emp.totalLeave}
                                            </span>
                                        </td>

                                        {/* Payable */}
                                        <td className="px-6 py-5 text-right">
                                            <span className="text-xl font-bold text-blue-600">
                                                ₹
                                                {Number(
                                                    emp.payableSalary
                                                ).toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalculateSalary;