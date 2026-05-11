import axios from "axios";

const baseURL = "https://localhost:7289/api/Users";


let token = null;
const setToken = newToken => {
    token = `Bearer ${newToken}`;
}
// Axios config tokenin lisäämiseen
const authHeader = () => ({
    headers: {
        Authorization: token, "Content-Type": "application/json"
    }
});

const login = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}/login`, credentials);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

const getUsers = async () => {
    try {
        const response = await axios.get(baseURL, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const create = async (newUser) => {
    try {
        const response = await axios.post(`${baseURL}/register`, newUser, authHeader());
        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

const remove = async (userId) => {
    try {
        const response = await axios.delete(`${baseURL}/${userId}`, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

const edit = async (editedUser) => {
    try {
        const response = await axios.put(`${baseURL}/${editedUser.userId}`, editedUser,authHeader());
        return response;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
};

const changePassword = async (passwords) => {
    try {
        const response = await axios.post(
            `${baseURL}/change-password`,passwords, authHeader());
        return response;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
};

export default {
    login,
    getUsers,
    create,
    remove,
    edit,
    changePassword,
    setToken
};