import axios from "axios";

const basesURL = "https://localhost:7289/api/Customers";
let token = null;
const setToken = newToken => {
    token = `Bearer ${newToken}`;
}

const getCustomers = async () => {
    const config = {
        headers: {
            Authorization: token,
            "Content-Type":"application/json"
        }
    };
    try {
        const response = await axios.get(basesURL, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error;
    }
};

const create = async (newCustomer) => {
    const config = {
        headers: {
            Authorization: token,
            "Content-Type":"application/json"
        }
    };
    try {
        const response = await axios.post(basesURL, newCustomer, config);
        return response;
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
};

const remove = async (customerId) => {
    const config = {
        headers: {
            Authorization: token,
            "Content-Type":"application/json"
        }
    };
    try {
        const response = await axios.delete(`${basesURL}/${customerId}`, config);
        return response;
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw error;
    }
};

const edit = async (editedCustomer) => {
    const config = {
        headers: {
            Authorization: token,
            "Content-Type":"application/json"
        }
    };
    try {
        const response = await axios.put(`${basesURL}/${editedCustomer.customerId}`, editedCustomer, config);
        return response;
    } catch (error) {
        console.error("Error editing customer:", error);
        throw error;
    }
};

export default {
    setToken,
    getCustomers,
    create,
    remove,
    edit
};