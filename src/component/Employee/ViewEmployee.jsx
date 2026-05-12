import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUSER, getUserList } from "../../features/user/userThunk";
import UpdateEmployee from "./UpdateEmployee";

const ViewEmployee = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.user.users);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] =
        useState(null);

    useEffect(() => {
        dispatch(getUserList());
    }, [dispatch]);

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    return (
        <>
            <div className="w-5xl bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-blue-600 text-white px-6 py-4">
                    <h2 className="text-xl font-semibold">
                        User Details
                    </h2>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Salary</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userList.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">
                                    {user.name}
                                </td>

                                <td className="px-6 py-4">
                                    {user.email}
                                </td>

                                <td className="px-6 py-4">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4">
                                    {user.salary}
                                </td>

                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        onClick={() =>
                                            handleEdit(user)
                                        }
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg" onClick={() => dispatch(deleteUSER(user.id))}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative">

                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-xl"
                        >
                            ✕
                        </button>

                        <UpdateEmployee
                            employee={selectedEmployee}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewEmployee;