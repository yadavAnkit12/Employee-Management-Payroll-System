import axios from "axios";
import { addEmployee, loginUser, setUsers } from "./userSlice";

export const authUser = (userData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/users");
            const matchedUser = response.data.find(
                (user) =>
                    user.email === userData.email &&
                    user.password === userData.password
            );
            if (matchedUser) {
                const token =
                    "token_" +
                    Date.now() +
                    "_" +
                    Math.random().toString(36).substring(2);

                const authData = {
                    user: matchedUser,
                    token,
                };

                localStorage.setItem(
                    "auth",
                    JSON.stringify(authData)
                );

                dispatch(loginUser(authData));

                navigate("/dashboard");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.log(error);
            alert("Login failed");
        }
    };
};
export const addNewUser = (userData) => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/users");
        const matchedUser = response.data.find(
            (user) =>
                user.email === userData.email
        );
        if (matchedUser) {
            alert('User already exist')
        } else {
            axios.post('http://localhost:3001/users', userData)
                .then((response) => dispatch(addEmployee(response.data)))
        }

    }
}
export const getUserList = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/users");
        const matchedUser = response.data.filter(
            (user) =>
                user.role !== 'admin'
        );
        if (matchedUser) {
            dispatch(setUsers(matchedUser))
        }
    }
}
export const updateUser = (userData, closeModal) => {
    return async (dispatch) => {
        try {
            console.log(userData)
            const response = await axios.put(
                `http://localhost:3001/users/${userData.id}`,
                userData
            );

            dispatch(getUserList());

            alert("Employee updated successfully");

            closeModal();
        } catch (error) {
            alert("Update failed");
        }
    };
};

export const deleteUSER=(id)=>{
    return async (dispatch)=>{
        axios.delete(`http://localhost:3001/users/${id}`)
        .then((response)=>dispatch(dispatch(getUserList())))
    }
}
