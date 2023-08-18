import { Input } from "antd";
import "./searchStyle.scss";
const { Search } = Input;
function SearchComponent() {
  const onSearch = (value) => console.log(value);
  return (
    <Search
      placeholder="Tìm kiếm..."
      allowClear
      onSearch={onSearch}
      className="w-full max-w-md bg-gray-400 rounded-lg search h-full text-lg"
      size={"large"}
    />
  );
}
export default SearchComponent;
