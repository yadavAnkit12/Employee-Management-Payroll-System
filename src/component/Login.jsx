import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../features/user/userThunk";

const userData = {
    email: "",
    password: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "input_change":
            return {
                ...state,
                [action.field]: action.value,
            };

        default:
            return state;
    }
};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, fieldDispatch] = useReducer(
        reducer,
        userData
    );

    const handleChange = (e) => {
        fieldDispatch({
            type: "input_change",
            field: e.target.name,
            value: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authUser(state, navigate));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-white text-center mb-8">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="space-y-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white"
                    />

                    <button
                        type="button"
                        className="w-full bg-white text-purple-700 py-3 rounded-xl"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;