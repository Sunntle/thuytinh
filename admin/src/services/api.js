import axios from "../utils/axios";

// ?????????   Order  ????????? //
export const getAllOrder = (params) => {
  return axios.get(`/api/order`, { params });
};
export const delOrder = (id) => {
  return axios.delete(`/api/order/` + id);
};
export const updateOrder = (body) => {
  return axios.put(`/api/order`, body);
};

// product //
export const getAllProduct = (params) => {
  return axios.get(`/api/product`, { params });
};
export const addNewProduct = (data) => {
  return axios.post(`/api/product`, data);
};
// category//
export const getAllCate = (params) => {
  return axios.get(`/api/category`, { params });
};

//image//
export const uploadImg = (file) => {
  const form = new FormData();
  form.append("Image", file);
  return axios.post(`/api/image`, form);
};
export const deleteImg = (url) => {
  return axios.delete(`/api/image`, { params: { url } });
};
//material//
export const getAllMaterial = (params) => {
  return axios.get(`/api/material`, { params });
};
