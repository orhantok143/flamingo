
import axios from 'axios';




export const userLogin = async (url, data) => {
    return axios.post(url, data);
};


export const userLogout = async (url) => {
    return axios.get(url);
};

