import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    return auth?.token ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;