import axios from "axios";


const BACKEND_URL =  "http://localhost:5000";
// process.env.REACT_APP_BACKEND_URL
export const API_URL = `${BACKEND_URL}/api/users/`;

//registro de usuario
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData, {
        withCredentials: true,
    });
    return response.data
};

//inicio de sesion usuario
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    return response.data
};

//cerrar sesion usuario
const logout = async () => {
    const response = await axios.get(API_URL + "logout");
    return response.data.message;
};

//tarer stado de inicio de sesion
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus");
    return response.data;
};
//tarer stado de inicio de sesion
const getUser = async () => {
    const response = await axios.get(API_URL + "getUser");
    return response.data;
};
//Actualizar perfil
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateUser", userData);
    return response.data;
};

//Actualizar foto
const updatePhoto = async (userData) => {
    const response = await axios.patch(API_URL + "updatePhoto", userData);
    return response.data;
};
const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    updatePhoto
}

export default authService;
