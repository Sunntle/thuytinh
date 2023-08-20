import axios from "../utils/axios";
export const getAllOrder = (params) => {
    return axios.get(`/api/order`);
}