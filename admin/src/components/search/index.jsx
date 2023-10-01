import { Dropdown, Input } from "antd";

import "./searchStyle.scss";

const { Search } = Input;
// eslint-disable-next-line react/prop-types

function SearchComponent({
  className,
  size,
  textColor,
  customContent,
  onChange,
}) {
  const onSearch = (value) => {
    const keyword = value.trim();
    if (keyword.length < 1) return;
    const searchArr = JSON.parse(localStorage.getItem("searchKeyWord")) || [];
    searchArr.unshift(keyword);
    localStorage.setItem("searchKeyWord", JSON.stringify(searchArr));
    onChange(searchArr);
  };
  const noContent = () => {
    return (
      <div className="bg-white rounded-lg px-5 py-3 shadow-md">
        <p>Không có nội dung phù hợp</p>
      </div>
    );
  };
  return (
    <Dropdown
      trigger={["click"]}
      overlayClassName="max-w-[200px]"
      dropdownRender={customContent ?? noContent}
    >
      <Search
        placeholder="Tìm kiếm..."
        allowClear
        onSearch={onSearch}
        className={`${className} rounded-lg search h-full ${
          textColor && "change-text-color"
        }`}
        size={size}
      />
    </Dropdown>
  );
}
export default SearchComponent;
