import React from "react";

const CategoryList = ({
  categories,
  activeIndex,
  handleGetAllFood,
  handleFilterFoodByCategory,
}) => {
  return (
    <>
      <div className="w-full flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
        <button
          disabled={activeIndex === 0}
          onClick={() => handleGetAllFood(0)}
          className={`h-8 px-6 border rounded-full whitespace-nowrap transition-colors duration-100 ${
            activeIndex === 0
              ? "text-white bg-primary shadow"
              : "text-slate-800 bg-white"
          }`}
        >
          Tất cả
        </button>
        {categories &&
          categories.map((category) => (
            <button
              disabled={category.id === activeIndex}
              key={category.id}
              onClick={() => handleFilterFoodByCategory(category.id)}
              className={`px-6 border rounded-full whitespace-nowrap transition-colors duration-100 ${
                category.id === activeIndex
                  ? "text-white bg-primary shadow"
                  : "text-slate-800 bg-white"
              }`}
            >
              {category.name_category}
            </button>
          ))}
      </div>
      {/* Overlay */}
      <div className="absolute right-0 bottom-0 w-12 h-1/2 bg-white bg-opacity-60"></div>
    </>
  );
};

export default CategoryList;
