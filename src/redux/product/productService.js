// todosService.js
import axios from 'axios';


export const getProduct = async (url) => {
    return axios.get(url);
};
