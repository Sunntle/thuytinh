// Categories
export const fetchCategories = () => {
  return {
    method: "get",
    url: "/category",
  };
};

// Product
export const fetchProduct = () => {
  return {
    method: "get",
    url: "/product",
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
    url: `/product/category/${categoryId}`,
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
    url: `product/search?query=${query}`,
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
