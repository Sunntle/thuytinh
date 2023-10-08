import axios from "../utils/axios";


// ?????????   Order  ????????? //
export const addOrder = (data) => {
  return axios.post(`/api/order`, data);
};
export const getAllOrder = (params) => {
  return axios.get(`/api/order`, { params });
};
export const delOrder = (id) => {
  return axios.delete(`/api/order/` + id);
};
export const updateOrder = (body) => {
  return axios.put(`/api/order`, body);
};
// table //
export const getAllTable = (params) => {
  return axios.get(`/api/table`, { params });
}
// product //
export const getAllProduct = (params) => {
  return axios.get(`/api/product`, { params });
};
export const addNewProduct = (data) => {
  return axios.post(`/api/product`, data);
};
export const deleteProduct = (idProduct) => {
  return axios.delete(`/api/product/${idProduct}`);
};
export const editProduct = (data) => {
  return axios.put(`/api/product/${data.id}`, data);
};
export const getOneProduct = (id_product) => {
  return axios.get(`/api/product/${id_product}`);
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
export const uploadImgByIdProduct = (file, idProduct) => {
  const form = new FormData();
  form.append("Image", file);
  form.append("idProduct", idProduct);
  return axios.post(`/api/image/product`, form);
};
export const deleteImgByUrl = (url, id) => {
  return axios.delete(`/api/image/url/${id}`, { params: { url } });
};
export const deleteImgById = (id) => {
  return axios.delete(`/api/image/${id}`);
};
//material//
export const getAllMaterial = (params) => {
  return axios.get(`/api/material`, { params });
};
export const deleteMaterial = (id) => {
  return axios.delete(`/api/material/` + id);
};
export const editMaterial = (body) => {
  return axios.put(`/api/material`, body);
};
export const getOneMaterial = (id) => {
  return axios.get(`/api/material/${id}`);
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
};
export const callRegister = (body) => {
  return axios.post(`/api/user/register`, body);
};
export const callFetchAccount = () => {
  return axios.get(`/api/user/current`);
};
export const callLogout = () => {
  return axios.get(`/api/user/logout`);
}
export const callUpdateAccount = (body) => {
  return axios.put(`/api/user`, body);
}
export const callUpdatePassword = (body) => {
  return axios.post(`/api/user/set-password`, body);
}


// recipe
export const callFetchRecipe = () => {
  return axios.get(`/api/recipe`);
};
export const callCreateRecipe = (body) => {
  return axios.post(`/api/recipe`, body);
};
export const callDelRecipe = (id) => {
  return axios.delete(`/api/recipe/` + id);
};
export const callUpdateRecipe = (body) => {
  return axios.put(`/api/recipe`, body);
};
//recipe
export const editRecipeByIdProduct = (data) => {
  return axios.put(`/api/recipe/product/${data.id}`, data);
};
//reviews
export const getAllReviews = (params) => {
  return axios.get(`/api/review`, { params });
};
export const deleteReview = (id) => {
  return axios.delete(`/api/review/` + id);
};

export const getDataDashboard = (type) => {
  return axios.get(`/api/order/thongke`, { params: { type: type } });
};
