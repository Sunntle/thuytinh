import SearchComponent from "../search";
import ButtonComponents from "../button";
import {
  CloseOutlined,
  DownOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Tabs,
  Upload,
  message,
  Tooltip,
} from "antd";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../socket";
import NotificationsComponent from "../notification";
import { NAV_ITEMS } from "../../utils/constant";
import { doLogoutAction, fetchAccount } from "../../redux/account/accountSlice";
import { roleRext, truncateString } from "../../utils/format";
import {
  callLogout,
  getAllCate,
  getAllProduct,
  callUpdateAccount,
  callUpdatePassword,
} from "../../services/api";
import { Swiper, SwiperSlide } from "swiper/react";

function HeaderComponent() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);
  const [searchKw, setSearchKw] = useState(
    JSON.parse(localStorage.getItem("searchKeyWord")) || []
  );
  const user = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const items = [
    {
      label: <span className="font-semibold">{user?.user.name}</span>,
      key: "3",
    },
    {
      label: "Thông tin",
      key: "1",
      icon: <FileSearchOutlined />,
    },
    {
      label: "Thoát",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];
  const handleMenuClick = async (e) => {
    if (e.key == 2) {
      dispatch(doLogoutAction());
      await callLogout();
    } else if (e.key == 1) {
      setOpenModalProfile(true);
      const { id, name, email, phone, avatar, role } = user.user;
      let data = {
        id,
        name,
        email,
        phone,
        role: roleRext(role),
        avatar: [
          {
            uid: "1",
            name: "anhnen.jpg",
            status: "done",
            url: avatar,
          },
        ],
      };
      form.setFieldsValue(data);
    }
  };
  const handleRemoveKeyWord = (index) => {
    const searchArr = JSON.parse(localStorage.getItem("searchKeyWord"));
    searchArr.splice(index, 1);
    localStorage.setItem("searchKeyWord", JSON.stringify(searchArr));
    setSearchKw(searchArr);
  };
  const handleSearch = (keyword) => {
    const searchArr = JSON.parse(localStorage.getItem("searchKeyWord")) || [];
    searchArr.unshift(keyword);
    localStorage.setItem("searchKeyWord", JSON.stringify(searchArr));
    setSearchKw(searchArr);
    navigate(`/employee/search?keyword=${searchArr[0]}`);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const dataProducts = await getAllProduct({
        _sort: "sold",
        _order: "DESC",
        _limit: 8,
      });
      const dataCate = await getAllCate({});
      setCategories(dataCate);
      setData(dataProducts);
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    socket.emit("new user", {
      userName: user?.user.name,
      role: user?.user.role,
    });
    socket.on("new message", (arg) => {
      setNotifications((prev) => {
        const arr = [...prev];
        if (Array.isArray(arg)) {
          arr.unshift(...arg);
        } else {
          arr.unshift(arg);
        }
        return arr;
      });
    });
  }, [user?.user.name, user?.user.role]);

  const onFinish = async (values) => {
    const formData = new FormData();
    const { avatar, ...rest } = values;
    const val = { ...rest };
    if (avatar[0]?.originFileObj) {
      val.avatar = avatar[0].originFileObj;
    }
    for (const item of Object.entries(val)) {
      formData.append(item[0], item[1]);
    }
    const res = await callUpdateAccount(formData);
    dispatch(fetchAccount());
    messageApi.open({
      type: "success",
      content: res.message,
    });
    setOpenModalProfile(false);
    form.resetFields();
  };
  const submitResetPass = async (values) => {
    let res = await callUpdatePassword(values);
    messageApi.open({
      type: res.success ? "success" : "error",
      content: res.message,
    });
    if (res.success === true) {
      setOpenModalProfile(false);
      form.resetFields();
    }
  };
  const customContent = () => {
    return (
      <div className="bg-white rounded-lg px-5 py-3 shadow-md">
        <h4 className="text-gray-500 mb-3">Tìm kiếm gần đây</h4>
        <Swiper
          speed={1000}
          slidesPerView={6}
          spaceBetween={20}
          className="mySwiper my-5"
        >
          {searchKw.length > 0 ? (
            searchKw.map((el, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="inline-flex items-center">
                    <Link
                      to={`/employee/search?keyword=${el}`}
                      className="p-1 text-main hover:text-gray-500"
                    >
                      {truncateString(el, 7)}
                    </Link>
                    <Tooltip title="remove">
                      <Button
                        className="border-none shadow-none hover:bg-gray-300 text-gray-300 "
                        shape="circle"
                        icon={<CloseOutlined />}
                        onClick={() => handleRemoveKeyWord(index)}
                      />
                    </Tooltip>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <p className="text-gray-500">Không có tìm kiếm nào!</p>
          )}
        </Swiper>
        <h4 className="text-gray-500 mb-3">Danh mục</h4>
        <div className="my-5">
          <Swiper
            speed={1000}
            slidesPerView={8}
            spaceBetween={20}
            className="mySwiper"
          >
            {categories?.map((el) => (
              <SwiperSlide key={el.id} className="my-5">
                <Link
                  to={`/employee/menu?category=${el.id}`}
                  className="border rounded-full border-gray-300 border-solid py-2 px-3 transition-all duration-500 text-gray-500 hover:text-white hover:border-secondaryColor hover:bg-main me-2"
                >
                  {el.name_category}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <h4 className="text-gray-500 my-3">Món ăn phổ biến</h4>
        <div>
          <Swiper
            speed={1000}
            slidesPerView={4}
            spaceBetween={20}
            className="mySwiper"
          >
            {data.data?.map((product, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link to={`/employee/menu?product=${product.id}`}>
                    <div className="p-2 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 text-center">
                      <img
                        className="w-full mb-3"
                        src={product.imageUrls?.split(";")[0]}
                        alt=""
                      />
                      <h6 className="font-semibold text-gray-500">
                        {product.name_product}
                      </h6>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <>
      {contextHolder}
      {/* <div className="flex items-center justify-between px-11 bg-main py-5 w-full">

        <div className="flex items-center justify-between"> */}

      {/*   
  return ( */}
      <div className="flex items-center justify-between px-11 bg-main py-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <img src="Logo" className="max-w-md object-cover" alt="" />
            Logo here
          </div>
          <div className="block sm:hidden">
            <Button type="primary" onClick={() => setOpen(true)}>
              <MenuUnfoldOutlined />
            </Button>
          </div>
        </div>

        <div className="hidden sm:block flex-1 text-center mx-3">
          <SearchComponent
            className="bg-secondaryColor w-full max-w-2xl "
            textColor={true}
            size="large"
            customContent={customContent}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center justify-center gap-x-1">
          <NotificationsComponent
            notifications={notifications}
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
            setNotifications={setNotifications}
          />
          <Dropdown menu={menuProps} trigger={["click"]}>
            <ButtonComponents
              sizeIconBefore={"text-lg"}
              sizeIconAfter={"text-xs"}
              spacingContent={"ms-1 me-3"}
              className="border-borderSecondaryColor bg-secondaryColor text-white ms-3"
              iconBefore={<UserOutlined />}
              iconAfter={icon ? <DownOutlined /> : <RightOutlined />}
              content={truncateString(user?.user.name, 7)}
              onClick={() => setIcon(!icon)}
              customAttribute={{ size: "large" }}
            />
          </Dropdown>
        </div>
        <Drawer
          title={
            <div>
              <SearchComponent />
            </div>
          }
          placement="left"
          className="main_area"
          headerStyle={{ border: "none" }}
          bodyStyle={{ padding: 0 }}
          closable={true}
          onClose={() => setOpen(false)}
          open={open}
          key="left"
          width={300}
        >
          <Menu
            defaultSelectedKeys={pathname}
            theme="light"
            mode="inline"
            items={NAV_ITEMS}
            style={{ border: "none" }}
            onClick={(e) => navigate(e.key)}
          />
        </Drawer>
        <Modal
          title="Thông tin tài khoản"
          centered
          open={openModalProfile}
          onCancel={() => setOpenModalProfile(false)}
          footer={null}
        >
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                label: `Thông tin`,
                key: 1,
                children: (
                  <>
                    <Form
                      form={form}
                      name="update profile"
                      labelCol={{
                        span: 24,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item name="id" hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input disabled />
                      </Form.Item>
                      <Form.Item
                        label="Họ tên"
                        name="name"
                        rules={[
                          {
                            required: true,
                            min: 5,
                            message: "Vui lòng nhập họ tên (ít nhất 5 kí tự)!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            pattern: /^[0-9]{10}$/,
                            message:
                              "Vui lòng nhập số điện thoại đúng định dạng (10 số)",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message:
                              "Vui lòng nhập một email hợp lệ (ít nhất 5 kí tự)!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Avatar"
                        name="avatar"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chon anh",
                          },
                        ]}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                          if (Array.isArray(e)) {
                            return e;
                          }
                          return e?.fileList;
                        }}
                      >
                        <Upload
                          beforeUpload={() => false}
                          multiple={false}
                          listType="picture"
                          maxCount={1}
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        </Upload>
                      </Form.Item>
                      <div className="flex justify-end">
                        <ButtonComponents
                          content={"Cập nhật"}
                          key="submit"
                          htmlType="submit"
                          className="border-borderSecondaryColor bg-secondaryColor text-white"
                        />
                      </div>
                    </Form>
                  </>
                ),
              },
              {
                label: `Mật khẩu`,
                key: 2,
                children: (
                  <>
                    <Form
                      form={form1}
                      name="reset_pass"
                      initialValues={{
                        remember: true,
                      }}
                      labelCol={{
                        span: 24,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      onFinish={submitResetPass}
                    >
                      <Form.Item
                        name="current"
                        label="Mật khẩu hiện tại"
                        rules={[
                          {
                            required: true,
                            min: 5,
                            message: "Vui lòng nhập mật khẩu hiện tại!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        name="pass_new"
                        label="Mật khẩu mới"
                        dependencies={["current"]}
                        rules={[
                          {
                            required: true,
                            min: 5,
                            message:
                              "Vui lòng nhập mật khẩu mới (ít nhất 5 kí tự)!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("current") !== value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "Tạo mới mật khẩu không trùng hiện tại!"
                                )
                              );
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        name="confirm"
                        label="Xác nhận mật khẩu mới"
                        dependencies={["pass_new"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Xác nhận lại mật khẩu !",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("pass_new") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "Xác nhận lại không khớp với mật khẩu mới!"
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <div className="flex justify-end">
                        <ButtonComponents
                          content={"Cập nhật"}
                          key="submit"
                          htmlType="submit"
                          className="border-borderSecondaryColor bg-secondaryColor text-white"
                        />
                      </div>
                    </Form>
                  </>
                ),
              },
            ]}
          />
        </Modal>
      </div>
    </>
  );
}

export default HeaderComponent;
