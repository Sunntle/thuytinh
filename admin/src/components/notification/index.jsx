import { Badge, Button, Popover } from "antd";
import { formatNgay } from "../../utils/format";
import { BellOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function NotificationsComponent({
  notifications,
  openPopover,
  setOpenPopover,
  setNotifications,
}) {
  const navigate = useNavigate();
  const handleCheckedAll = () => {
    if (notifications.some((el) => el.status == false)) {
      setNotifications((prev) => prev.map((el) => ({ ...el, status: true })));
    }
  };
  const handleToContent = (index) => {
    const content = notifications[index];
    const navigateTo = content.name == "order" ? "/admin/order" : "/admin/user";
    if (content.status == false)
      setNotifications((prev) =>
        prev.map((el) => {
          if (el.id == content.id) {
            el.status = true;
          }
          return el;
        })
      );
    navigate(navigateTo);
  };
  const content = () => {
    if (notifications?.length < 1)
      return <p className="text-gray-500">Không có thông báo mới</p>;
    return (
      <>
        {notifications?.map((el, index) => {
          return (
            <div
              onClick={() => handleToContent(index)}
              key={index}
              className="my-2 flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 gap-x-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="max-w-[50px]">
                  <img
                    className="w-full  rounded-md "
                    src="https://t4.ftcdn.net/jpg/05/86/91/55/360_F_586915596_gPqgxPdgdJ4OXjv6GCcDWNxTjKDWZ3JD.jpg"
                  />
                </div>
                <div className={el.status == true ? "text-gray-500" : " pe-2"}>
                  {el.name == "order" ? "Đơn đặt hàng" : "Người dùng"} mới{" "}
                  <span className="font-semibold">#{el.id}</span>
                  <p className="text-main text-sm">
                    {formatNgay(el.timestamp, "HH:mm:ss DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              {el.status == false && (
                <div>
                  <Badge status="processing" color="#fc8e32" />
                </div>
              )}
            </div>
          );
        })}
        <a onClick={handleCheckedAll}>Đánh dấu tất cả đã đọc</a>
      </>
    );
  };
  return (
    <Popover
      content={content}
      title={<p className="text-xl">Thông báo</p>}
      trigger="click"
      open={openPopover}
      onOpenChange={() => setOpenPopover(!openPopover)}
      placement="topRight"
    >
      <Badge count={notifications?.filter((el) => el.status == false)?.length}>
        <Button
          type="primary"
          className="border-borderSecondaryColor bg-secondaryColor"
          size="large"
        >
          <BellOutlined className="text-white" />
        </Button>
      </Badge>
    </Popover>
  );
}

export default NotificationsComponent;
