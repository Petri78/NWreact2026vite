import axios from "axios";

const basesURL = "https://localhost:7289/api/Products";
let token = null;
const setToken = newToken => {
    token = `Bearer ${newToken}`;
}

const getProducts = async () => {
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
        console.error("Error fetching products:", error);
        throw error;
    }
};

const newProduct = async (newProduct) => {
    const config = {
        headers: {
            Authorization: token,
            "Content-Type":"application/json"
        }
    };
    try {
        const response = await axios.post(basesURL, newProduct, config);
        return response;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    const config = {
        headers: {
            Authorization: token,
            "Content-Type":"application/json"
        }
    };
    try {
        const response = await axios.delete(`${basesURL}/${productId}`, config);
        return response;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

const editProduct = async (editedProduct) => {
    const config = {
        headers: {
            Authorization: token,
            "Content-Type":"application/json"
        }
    };
    try {
        const response = await axios.put(`${basesURL}/${editedProduct.productId}`, editedProduct, config);
        return response;
    } catch (error) {
        console.error("Error editing product:", error);
        throw error;
    }
};

export default {
    setToken,
    getProducts,
    newProduct,
    deleteProduct,
    editProduct
};