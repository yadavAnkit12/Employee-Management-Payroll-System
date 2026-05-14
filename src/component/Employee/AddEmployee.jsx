import { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../features/user/userThunk";

const userData = {
    id: "EMP" + Math.floor(1000 + Math.random() * 9000),
    name: '',
    email: '',
    password: '',
    role: 'employee',
    salary:''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'input_change':
            return {
                ...state,
                [action.field]: action.value
            }

        default: return state
    }
}

const AddEmployee = () => {
    const [state, fieldDispatch] = useReducer(reducer, userData)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        
        fieldDispatch({
            type: "input_change",
            field: e.target.name,
            value: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewUser(state))
    }

    return (
        <div className="w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">
                Add Employee
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Employee ID */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Employee ID
                    </label>
                    <input
                        type="text"
                        value={state.id}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-600 cursor-not-allowed"
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter employee name"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                    </label>
                    <input
                        type="number"
                        name="salary"
                        placeholder="Enter salary"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;