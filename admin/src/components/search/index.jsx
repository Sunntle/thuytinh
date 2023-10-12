import { Dropdown, Input } from "antd";

import "./searchStyle.scss";
import { useCallback, useState } from "react";

const { Search } = Input;
// eslint-disable-next-line react/prop-types

function SearchComponent({
  className,
  size,
  textColor,
  customContent,
  onChange,
  onClear,
  visible = false,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const onSearch = (value) => {
    const keyword = value.trim();
    if (keyword.length < 1) return;
    onChange(keyword);
    setDropdownVisible(visible);
  };
  const handleClear = useCallback(
    (e) => {
      const value = e.target.value;
      if (!value) {
        onClear();
      }
    },
    [onClear]
  );
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
      open={dropdownVisible}
      onOpenChange={(visible) => setDropdownVisible(visible)}
    >
      <Search
        placeholder="Tìm kiếm..."
        allowClear
        onChange={onClear ? handleClear : ""}
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
