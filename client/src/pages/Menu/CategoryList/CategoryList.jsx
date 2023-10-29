import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const CategoryList = ({ categories, activeIndex }) => {
  const activeButtonRef = useRef(null);
  const customerName = useSelector((state) => state.customerName);

  useEffect(() => {
    if (activeButtonRef.current !== null) {
      activeButtonRef.current.scrollIntoView({
        behavior: "smooth", // You can change this to "auto" for instant scroll
        block: "start", // "start", "center", "end", or "nearest"
      });
    }
  }, [activeButtonRef]);

  return (
    <>
      <div className="w-full flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
        <Link
            to={`/ban-${customerName?.tables[0]}/menu`}
          disabled={activeIndex === null}
          // ref={activeIndex === 0 ? activeButtonRef : null}
          className={`h-8 px-6 flex items-center justify-center border rounded-full whitespace-nowrap transition-colors duration-100 ${
            activeIndex === 0
              ? "text-white bg-primary shadow"
              : "text-slate-800 bg-white"
          }`}
        >
          Tất cả
        </Link>
        {categories &&
          categories.map((category) => (
            <Link
              to={`?category=${category.id}`}
              disabled={category.id === activeIndex}
              ref={category.id === activeIndex ? activeButtonRef : null}
              key={category.id}
              className={`px-6 flex items-center justify-center border rounded-full whitespace-nowrap transition-colors duration-100 ${
                category.id === activeIndex
                  ? "text-white bg-primary shadow"
                  : "text-slate-800 bg-white"
              }`}
            >
              {category.name_category}
            </Link>
          ))}
      </div>
      {/* Overlay */}
      {/* <div className="absolute right-0 bottom-0 w-12 h-1/2 bg-white bg-opacity-60"></div> */}
    </>
  );
};

export default CategoryList;
