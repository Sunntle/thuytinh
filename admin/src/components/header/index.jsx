import SearchComponent from "../search";
import ButtonComponents from "../button";
import { RightOutlined, UserOutlined } from "@ant-design/icons";

function HeaderComponent() {
  return (
    <div className="flex items-center justify-between px-11 bg-main py-5 w-full">
      <div>
        <img src="Logo" className="max-w-md object-cover" alt="" />
        Logo here
      </div>
      <div className="d-md-none">
        <SearchComponent background={"bg-secondaryColor"} maxWidth={"max-w-md"} />
      </div>
      <ButtonComponents
        sizeIconBefore={"text-lg"}
        sizeIconAfter={"text-xs"}
        spacingContent={"ms-1 me-3"}
        borderColor={"border-borderSecondaryColor"}
        backgroundColor={"bg-secondaryColor"}
        iconBefore={<UserOutlined />}
        iconAfter={<RightOutlined />}
        content={"Admin"}
      />
    </div>
  );
}

export default HeaderComponent;
