import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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
  const isCategoryExist =
    activeIndex === 0 || !categories?.some((el) => el.id === activeIndex);

  return (
    <div className="w-full flex space-x-3 overflow-x-auto custom-scrollbar scroll-smooth">
      <Link
        to={`/tables-${customerName?.tables[0]}/menu`}
        disabled={activeIndex === null}
        ref={isCategoryExist ? activeButtonRef : null}
        className={`box-border font-medium h-8 px-6 flex items-center justify-center border-2 rounded-full whitespace-nowrap transition-colors duration-300 hover:bg-white hover:border-primary hover:text-primary ${
          isCategoryExist
            ? "text-white bg-primary shadow border-transparent"
            : "text-slate-800"
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
            className={`font-semibold box-border px-6 flex items-center justify-center border-2 rounded-full whitespace-nowrap transition-colors duration-300 hover:bg-white hover:border-primary hover:text-primary ${
              isCategoryActive(category)
                ? "text-white bg-primary shadow border-transparent"
                : "text-slate-800"
            }`}
          >
            {category.name_category}
          </Link>
        ))}
    </div>
  );
};
CategoryList.propTypes = {
  categories: PropTypes.array,
  activeIndex: PropTypes.number,
};
export default CategoryList;
