import React from 'react';
import Product from "../Product/Product.jsx";

const ProductList = ({foods}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {foods &&
                foods?.data?.map((item) => (
                    <Product key={item.id} item={item} />
                ))}
        </div>
    );
};

export default ProductList;