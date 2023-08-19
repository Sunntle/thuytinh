import SearchComponent from "../search";
import ButtonComponents from "../button";
import { DownOutlined, LogoutOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState } from "react";
const items = [
  {
    label: "Thoát",
    key: "1",
    icon: <LogoutOutlined />,
  },
];
function HeaderComponent() {
  const [icon, setIcon] = useState(false);
  const handleMenuClick = (e) => {
    console.log("click", e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="flex items-center justify-between px-11 bg-main py-5 w-full">
      <div>
        <img src="Logo" className="max-w-md object-cover" alt="" />
        Logo here
      </div>
      <div className="hidden md:block">
        <SearchComponent background={"bg-secondaryColor"} maxWidth={"max-w-md"} textColor={true} />
      </div>
      <Dropdown menu={menuProps}>
        <ButtonComponents
          sizeIconBefore={"text-lg"}
          sizeIconAfter={"text-xs"}
          spacingContent={"ms-1 me-3"}
          borderColor={"border-borderSecondaryColor"}
          backgroundColor={"bg-secondaryColor"}
          iconBefore={<UserOutlined />}
          iconAfter={icon ? <DownOutlined /> : <RightOutlined />}
          content={"Admin"}
          onClick={() => setIcon(!icon)}
        />
      </Dropdown>
    </div>
  );
}

export default HeaderComponent;
