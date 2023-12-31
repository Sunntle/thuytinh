// Categories
export const fetchCategories = () => {
  return {
    method: "get",
    url: "/category",
  };
};

// Product
export const fetchProduct = (params) => {
  const qs = `${new URLSearchParams(params).toString()}`
  return {
    method: "get",
    url: `/product?${qs}`,
  };
};

export const fetchProductByLimit = (_limit) => {
  return {
    method: "get",
    url: `/product?_limit=${_limit}`,
  };
}

export const fetchProductByLoadMore = (_limit, _offset) => {
  return {
    method: "get",
    url: `/product?_limit=${_limit}&_offset=${_offset}`,
  };
};

export const fetchProductsByCategory = (categoryId) => {
  return {
    method: "get",
    url: `/product?_id_category=eq_${categoryId}`,
  };
};

export const fetchProductById = (id) => {
  return {
    method: "get",
    url: `/product/${id}`,
  };
};

export const searchProducts = (query) => {
  return {
    method: "get",
    url: `product?q=${query}`,
  };
};

// Order
export const addOrder = (body) => {
  return {
    method: "post",
    url: `/order`,
    ...body,
  };
};

export const fetchOrderById = (id) => {
  return {
    method: "get",
    url: `/order/${id}`,
  };
};

//Table
export const fetchTableById = (idTable, tableToken) => {
  return {
    method: "get",
    url: `/table/${idTable}?token=${tableToken}`,
  };
};