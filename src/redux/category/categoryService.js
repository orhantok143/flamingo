
import axios from 'axios';





export const getCategory = async (url) => {
    return axios.get(url);
};

