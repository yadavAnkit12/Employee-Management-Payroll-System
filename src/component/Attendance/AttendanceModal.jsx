const AttendanceModal = ({ employee, month, onClose }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getStatus = (day) => {
    return employee.attendance?.days?.[day] || "-";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[600px] p-5 rounded-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {employee.name} - {month}
          </h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            X
          </button>
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {days.map((day) => (
            <div
              key={day}
              className={`p-2 border rounded ${
                getStatus(day) === "P"
                  ? "bg-green-200"
                  : getStatus(day) === "A"
                  ? "bg-red-200"
                  : getStatus(day) === "L"
                  ? "bg-yellow-200"
                  : ""
              }`}
            >
              <div className="text-xs">{day}</div>
              <div className="font-bold">{getStatus(day)}</div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-sm">
          <span>🟢 P = Present</span>
          <span>🔴 A = Absent</span>
          <span>🟡 L = Leave</span>
        </div>
      </div>
    </div>
  );
};