import axios from "../utils/axios";

// ?????????   Order  ????????? //
export const getAllOrder = (params) => {
    return axios.get(`/api/order`, { params });
}
export const delOrder = (id) => {
    return axios.delete(`/api/order/` + id);
}
export const updateOrder = (body) => {
    return axios.put(`/api/order`, body);
}