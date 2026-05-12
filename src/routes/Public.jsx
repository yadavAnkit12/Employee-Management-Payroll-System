import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    return !auth?.token ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default Public;