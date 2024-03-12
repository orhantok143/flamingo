
import axios from 'axios';
import { headers } from '../baseUrl';




export const getCategory = async (url) => {
    return axios.get(url, { headers });
};

