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

//category//
export const addCate = (body) => {
  return axios.post(`/api/category`, body);
};
export const editCate = (body) => {
  return axios.put(`/api/category`, body);
};
export const getCate = () => {
  return axios.get(`/api/category`);
};
export const delCate = (id) => {
  return axios.delete(`/api/category/` + id);
};
export const addNewMaterial = (data) => {
  return axios.post(`/api/material`, data);
};

//account 
export const callLogin = (body) => {
  return axios.post(`/api/user/login`, body);
}
export const callFetchAccount = () => {
  return axios.get(`/api/user/current`);
}

// recipe

export const callFetchRecipe = () => {
  return axios.get(`/api/recipe`);
}
export const callCreateRecipe = (body) => {
  return axios.post(`/api/recipe`, body);
}
export const callDelRecipe = (id) => {
  return axios.delete(`/api/recipe/` + id);
}
export const callUpdateRecipe = (body) => {
  return axios.put(`/api/recipe`, body);
}