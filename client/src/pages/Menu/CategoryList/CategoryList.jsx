import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const CategoryList = ({ categories, activeIndex }) => {
  const customerName = useSelector((state) => state.customerName);
  const activeButtonRef = useRef(null);

  useEffect(() => {
    if (activeButtonRef.current) {
      activeButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [activeButtonRef]);

  const isCategoryActive = (category) => category.id === activeIndex;

  return (
    <div className="w-full flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
      <Link
        to={`/ban-${customerName?.tables[0]}/menu`}
        disabled={activeIndex === null}
        ref={activeIndex === 0 ? activeButtonRef : null}
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
            disabled={isCategoryActive(category)}
            ref={isCategoryActive(category) ? activeButtonRef : null}
            key={category.id}
            className={`px-6 flex items-center justify-center border rounded-full whitespace-nowrap transition-colors duration-100 ${
              isCategoryActive(category)
                ? "text-white bg-primary shadow"
                : "text-slate-800 bg-white"
            }`}
          >
            {category.name_category}
          </Link>
        ))}
    </div>
  );
};

export default CategoryList;
