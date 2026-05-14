const AttendanceModal = ({ employee, month, onClose, handleChangeAttendance }) => {
    console.log(employee)
    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    const getStatus = (day) => {
        return employee.attendanceRecords?.[day] || "-";
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white w-[90%] max-w-4xl rounded-2xl p-6 shadow-xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold">
                            {employee.name}
                        </h2>
                        <p className="text-gray-500">
                            Month: {month}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-red-500 font-bold"
                    >
                        ✕
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => {
                        const status = getStatus(day)

                        return (
                            <div
                                key={day}
                                className="p-3 rounded-lg bg-gray-100"
                            >
                                <div className="text-xs text-center mb-2">
                                    Day {day}
                                </div>

                                <div className="flex gap-1 justify-center">
                                    <button
                                        onClick={() =>
                                            handleChangeAttendance(employee.id, day, "P")
                                        }
                                        className="bg-green-500 text-white px-2 rounded"
                                    >
                                        P
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleChangeAttendance(employee.id, day, "A")
                                        }
                                        className="bg-red-500 text-white px-2 rounded"
                                    >
                                        A
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleChangeAttendance(employee.id, day, "L")
                                        }
                                        className="bg-yellow-400 px-2 rounded"
                                    >
                                        L
                                    </button>
                                </div>

                                <div className="text-center mt-2 font-bold">
                                    {status}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-5 text-sm">
                    <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500"></div> Present
                    </span>
                    <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-500"></div> Absent
                    </span>
                    <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-400"></div> Leave
                    </span>
                </div>

            </div>
        </div>
    );
};

export default AttendanceModal;