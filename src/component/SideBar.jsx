import { useState } from "react";
import { ChevronDown, Users, CalendarCheck, Wallet } from "lucide-react";
import { useSelector } from "react-redux";

const SideBar = ({ handleActiveTab }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const role = JSON.parse(localStorage.getItem('auth')).user.role

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const menuItems = [
        {
            title: "Employees",
            icon: <Users size={20} />,
            submenu: [
                "View Employees",
                "Add Employee",
            ],
            isShow: role === "admin",
        },
        {
            title: "Attendance",
            icon: <CalendarCheck size={20} />,
            submenu: ["Attendance"],
            isShow: role === "admin" || role === "employee",
        },
        {
            title: "Payroll",
            icon: <Wallet size={20} />,
            submenu: ["Calculate Salary"],
            isShow: role === "admin",
        },
    ];


    return (
        <div className="w-72 min-h-screen bg-slate-900 text-white shadow-xl">
            <div className="p-6 text-2xl font-bold border-b border-slate-700">
                Payroll Admin
            </div>

            <div className="p-4 space-y-3">
                {menuItems
                    .filter((item) => item.isShow)
                    .map((item, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleMenu(item.title)}
                                className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-slate-800 transition"
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span>{item.title}</span>
                                </div>

                                <ChevronDown
                                    size={18}
                                    className={`transition-transform ${openMenu === item.title
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                />
                            </button>

                            {openMenu === item.title && (
                                <div className="ml-10 mt-2 space-y-2">
                                    {item.submenu.map((sub, i) => (
                                        <button
                                            key={i}
                                            className="block w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                            onClick={()=>handleActiveTab(sub)}
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SideBar;