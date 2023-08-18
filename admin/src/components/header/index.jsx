import { Button } from "antd";
import { RightOutlined, UserOutlined } from "@ant-design/icons";
import SearchComponent from "../search";

function HeaderComponent() {
  return (
    <div className="flex items-center justify-between px-11 bg-main py-5 w-full">
      <div>
        <img src="Logo" className="max-w-md object-cover" alt="" />
        Logo here
      </div>
      <SearchComponent />
      <Button className="bg-gray-300 border-0 flex justify-center items-center py-5">
        <div className="text-lg flex justify-center items-center">
          <UserOutlined />
        </div>
        <span className="ms-1 me-3">Admin</span>
        <div className="text-xs flex justify-center items-center">
          <RightOutlined />
        </div>
      </Button>
    </div>
  );
}

export default HeaderComponent;
