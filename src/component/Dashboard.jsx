import { useState } from "react";
import SideBar from "./SideBar";
import AddEmployee from "./Employee/AddEmployee";
import ViewEmployee from "./Employee/ViewEmployee";
import AttendancePage from "./Attendance/AttendancePage";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('')
    const [activeComponent, setActiveComponent] = useState(null)
   const handleActiveTab = (menu) => {
        setActiveTab(menu);

        switch (menu) {
            case "Add Employee":
                setActiveComponent(<AddEmployee />);
                break;

            case "View Employees":
                setActiveComponent(<ViewEmployee />);
                break;

            case "Attendance":
                setActiveComponent(<AttendancePage />);
                break;

            default:
                setActiveComponent(null);
        }
    };
    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar */}
            <SideBar handleActiveTab={handleActiveTab} />

            {/* Main Section */}
            <div className="flex-1 flex flex-col">

                {/* Top Navbar */}
                <div className="h-16 bg-white shadow-md flex justify-end items-center px-8">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold cursor-pointer">
                        A
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-md h-full flex justify-center">
                        {activeComponent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;