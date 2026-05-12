import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/user/userThunk";

const UpdateEmployee = ({ employee, closeModal }) => {
    const dispatch=useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        id:'',
        role:"",
        salary:''
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || "",
                email: employee.email || "",
                password: employee.password || "",
                id:employee.id || "",
                role:employee.role || "",
                salary:employee.salary || ""
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUser(formData))
        closeModal();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Update Employee
            </h2>

            <form
                onSubmit={handleUpdate}
                className="space-y-5"
            >
                <div>
                    <label className="block mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl"
                    />
                </div>

                <div>
                    <label className="block mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl"
                    />
                </div>
                <div>
                    <label className="block mb-2">
                        Salary
                    </label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl"
                    />
                </div>

                <div>
                    <label className="block mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                    >
                        Update
                    </button>

                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-300 px-5 py-2 rounded-xl"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployee;