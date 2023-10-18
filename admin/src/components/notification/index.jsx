import { Badge, Button, Popover } from "antd";
import { formatNgay } from "../../utils/format";
import { BellOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  maskAllRead,
  maskAsRead,
} from "../../redux/notification/notificationSystem";
function NotificationsComponent({
  notifications,
  openPopover,
  setOpenPopover,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckedAll = useCallback(async () => {
    dispatch(maskAllRead());
  }, [dispatch]);
  const handleToContent = (index) => {
    const content = notifications[index];
    const navigateTo = `/admin/${content.type}`;
    dispatch(maskAsRead(content));
    navigate(navigateTo);
  };
  const getCountNoti = useMemo(() => {
    return notifications && notifications.length > 0
      ? notifications.filter((el) => el.status == 0).length
      : 0;
  }, [notifications]);
  const content = () => {
    if (!Array.isArray(notifications) || notifications.length < 1)
      return <p className="text-gray-500 px-3">Không có thông báo nào</p>;
    return (
      <div className="max-h-[300px] overflow-y-scroll relative">
        {notifications.map((el, index) => {
          return (
            <div
              onClick={() => handleToContent(index)}
              key={index}
              className="my-2 flex items-center justify-between py-2 pe-2 rounded-md cursor-pointer hover:bg-gray-100 gap-x-2"
            >
              <div className="flex items-center gap-x-2">
                <div className="max-w-[50px]">
                  <img
                    className="w-full  rounded-md "
                    src="https://t4.ftcdn.net/jpg/05/86/91/55/360_F_586915596_gPqgxPdgdJ4OXjv6GCcDWNxTjKDWZ3JD.jpg"
                  />
                </div>
                <div className={el.status == 1 ? "text-gray-500" : " pe-2"}>
                  <span className="font-semibold">#{el.id}</span>{" "}
                  {el.description}
                  <p className="text-main text-sm">
                    {formatNgay(el.createdAt, "HH:mm DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              {el.status == 0 && (
                <div>
                  <Badge status="processing" color="#fc8e32" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <Popover
      content={content}
      title={<div className="flex items-center justify-between"><p className="m-0 text-xl">Thông báo</p><p className="cursor-pointer" onClick={handleCheckedAll}>Đánh dấu tất cả đã đọc</p></div>}
      trigger="click"
      open={openPopover}
      onOpenChange={() => setOpenPopover(!openPopover)}
      placement="topRight"
    >
      <Badge count={getCountNoti}>
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
