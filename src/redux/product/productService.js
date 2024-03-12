// todosService.js
import axios from 'axios';
import { headers } from "../baseUrl"



export const getProduct = async (url) => {
    return axios.get(url, { headers });
};
