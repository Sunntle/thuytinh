import instance from "../utils/axiosConfig.js";

export const getAllProduct = async () => {
    return await instance.get('/product')
}