import { Badge, Button, Popover, Tooltip, Typography } from "antd";
import { formatNgay } from "../../utils/format";
import { BellOutlined, CheckOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  deleteNotification,
  loadMoreNotification,
  maskAllRead,
  maskAsRead,
} from "../../redux/notification/notificationSystem";
// import InfiniteScroll from 'react-infinite-scroll-component';
/* eslint-disable react-refresh/only-export-components */
import defaultAvatar from "../../assets/images/defaultAvatar.png"
import { useState } from "react";
function NotificationsComponent({
  notifications,
  openPopover,
  setOpenPopover,
  isLoading,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(10)

  const handleCheckedAll = useCallback(() => {
    dispatch(maskAllRead());
  }, [dispatch]);

  const handleToContent = useCallback((index) => {
    const content = notifications[index];
    const navigateTo = content.type.includes('-') ? `/employee/choosetable` :`/admin/${content.type}`;
    dispatch(maskAsRead(content));
    navigate(navigateTo);
  }, [dispatch, navigate, notifications])

  const handleDelete = useCallback(async (id) => {
    dispatch(deleteNotification(id));
  }, [dispatch])

  // const handleLoadMore = useCallback(()=>{
  //   dispatch(loadMoreData(notifications.length))
  // },[])

  const getCountNoti = useMemo(() => {
    return notifications && notifications.length > 0
      ? notifications.filter((el) => el.status == 0).length
      : 0;
  }, [notifications]);

  const handleLoadMore = useCallback(()=>{
    dispatch(loadMoreNotification(step))
    setStep(step=> step + 10)
  },[dispatch, step])

  const content = () => {
    if (!Array.isArray(notifications) || notifications.length < 1)
      return <p className="text-gray-500">Không có thông báo nào</p>;
    return (
      //   <InfiniteScroll
      //   dataLength={notifications.length}
      //   next={handleLoadMore}
      //   hasMore={notifications.length < 50}
      //   endMessage={"It is all, nothing more 🤐"}
      //   // scrollableTarget="scrollableDiv"
      // >
      //   <div className="max-h-[400px] overflow-y-scroll">
      //   {notifications.map((el, index) => {
      //     return (
      //       <div
      //         key={index}
      //         className="my-2 flex items-center justify-between py-2 pe-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-main gap-x-2"
      //       >
      //         <div onClick={() => handleToContent(index)} className="flex items-center gap-x-2 ">
      //           <div className="max-w-[50px]">
      //             <img
      //               className="w-full  rounded-md "
      //               src="https://t4.ftcdn.net/jpg/05/86/91/55/360_F_586915596_gPqgxPdgdJ4OXjv6GCcDWNxTjKDWZ3JD.jpg"
      //             />
      //           </div>
      //           <div className={el.status == 1 ? "text-gray-500" : " pe-2"}>
      //             {el.description}
      //             <p className="text-main text-sm">
      //               {formatNgay(el.createdAt, "HH:mm DD-MM-YYYY")}
      //             </p>
      //           </div>
      //         </div>
      //         <div className="px-2">
      //           {el.status == 0 ? (
      //             <Badge status="processing" color="#fc8e32" />
      //           ) : (
      //             <div onClick={() => handleDelete(el.id)}><DeleteOutlined /></div>
      //           )}
      //         </div>
      //       </div>
      //     );
      //   })}
      //     </div>
      // </InfiniteScroll>
      <div className="max-h-[400px] overflow-y-scroll scroll-m-0">
        {notifications.map((el, index) => {
          return (
            <div
              key={index}
              className="my-2 flex items-center justify-between py-2 pe-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-main gap-x-2"
            >
              <div
                onClick={() => handleToContent(index)}
                className="flex items-center gap-x-2 "
              >
                <div className="max-w-[50px]">
                  <img className="w-full  rounded-md " src={defaultAvatar} />
                </div>
                <div className={el.status == 1 ? "text-gray-500" : " pe-2"}>
                  {el.description}
                  <p className="text-main text-sm">
                    {formatNgay(el.createdAt, "HH:mm DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="px-2">
                {el.status == 0 ? (
                  <Badge status="processing" color="#fc8e32" />
                ) : (
                  <div onClick={() => handleDelete(el.id)}>
                    <DeleteOutlined />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <p className="text-gray-500 text-sm text-center cursor-pointer" onClick={handleLoadMore}>Xem thêm</p>
      </div>
    );
  };
  return (
    <Popover
      content={content}
      title={
        <div className="flex items-center justify-between">
          <Typography.Title
            level={4}
            style={{
              margin: 0,
            }} className="m-0">Thông báo</Typography.Title>
          <Tooltip title="Đánh dấu tất cả đã đọc" placement="bottom">
            <Button
              className="border-0"
              shape="circle"
              icon={isLoading ? <LoadingOutlined /> : <CheckOutlined />}
              onClick={handleCheckedAll}
            />
          </Tooltip>
        </div>
      }
      trigger="click"
      open={openPopover}
      onOpenChange={() => setOpenPopover(!openPopover)}
      placement="topRight"
    >
      <Badge count={getCountNoti} style={{ borderColor: 'rgb(255, 77, 79)' }}>
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

export default memo(NotificationsComponent);
