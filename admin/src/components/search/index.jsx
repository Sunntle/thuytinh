import { Input } from "antd";
import "./searchStyle.scss";
const { Search } = Input;
// eslint-disable-next-line react/prop-types
function SearchComponent({ className, size, textColor }) {
  const onSearch = (value) => console.log(value);
  return (
    <Search
      placeholder="Tìm kiếm..."
      allowClear
      onSearch={onSearch}
      className={`${className} rounded-lg search h-full ${textColor && "change-text-color"}`}
      size={size}
    />
  );
}
export default SearchComponent;
