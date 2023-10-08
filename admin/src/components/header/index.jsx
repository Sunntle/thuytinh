import SearchComponent from "../search";
import ButtonComponents from "../button";
import {
  CloseOutlined,
  DownOutlined,
  FileSearchOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  RightOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Dropdown, Form, Input, Menu, Modal, Tabs, Upload, message } from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../socket";
import NotificationsComponent from "../notification";
import { NAV_ITEMS } from "../../utils/constant";
import { doLogoutAction, fetchAccount } from "../../redux/account/accountSlice";
import { callLogout, callUpdateAccount, callUpdatePassword } from "../../services/api";
import { roleRext } from "../../utils/format";

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
        id, name, email, phone,
        role: roleRext(role),
        avatar: [{
          uid: '1',
          name: 'anhnen.jpg',
          status: 'done',
          url: avatar
        }]
      };
      form.setFieldsValue(data);
    }
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
      console.log(arg);
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

  }, []);



  const onFinish = async (values) => {
    const formData = new FormData();
    const { avatar, role, ...rest } = values;
    const val = { ...rest };
    if (avatar[0]?.originFileObj) {
      val.avatar = avatar[0].originFileObj
    }
    for (const item of Object.entries(val)) {
      formData.append(item[0], item[1]);
    }
    const res = await callUpdateAccount(formData);
    dispatch(fetchAccount());
    messageApi.open({
      type: 'success',
      content: res.message,
    });
    setOpenModalProfile(false)
    form.resetFields();
  }
  const submitResetPass = async (values) => {
    let res = await callUpdatePassword(values);
    messageApi.open({
      type: res.success ? "success" : "error",
      content: res.message,
    });
    if (res.success === true) {
      setOpenModalProfile(false)
      form.resetFields();
    }

  }
  return (
    <>
      {contextHolder}
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

        <div className="hidden sm:block flex-1 text-center">
          <SearchComponent
            className="bg-secondaryColor w-full max-w-2xl"
            textColor={true}
            size="large"
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
              content={user?.user.name}
              onClick={() => setIcon(!icon)}
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
            items={
              [{
                label: `Thông tin`,
                key: 1,
                children: <>
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
                    autoComplete="off">
                    <Form.Item
                      name="id"
                      hidden
                    >
                      <Input />

                    </Form.Item>
                    <Form.Item
                      label="Vai trò"
                      name="role"
                      rules={[{
                        required: true
                      }]}
                    >
                      <Input disabled />

                    </Form.Item>
                    <Form.Item
                      label="Họ tên"
                      name="name"
                      rules={[{
                        required: true,
                        min: 5,
                        message: 'Vui lòng nhập họ tên (ít nhất 5 kí tự)!'
                      }]}
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
                          message: 'Vui lòng nhập số điện thoại đúng định dạng (10 số)',
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
                          type: 'email',
                          message: 'Vui lòng nhập một email hợp lệ (ít nhất 5 kí tự)!',
                        }
                      ]}
                    >
                      <Input />

                    </Form.Item>
                    <Form.Item
                      label="Avatar"
                      name="avatar"
                      rules={[{
                        required: true,
                        message: 'Vui lòng chon anh'
                      }]}
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
                        listType='picture'
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
                </>,
              },
              {
                label: `Mật khẩu`,
                key: 2,
                children: <>
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
                          message: 'Vui lòng nhập mật khẩu hiện tại!',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      name="pass_new"
                      label="Mật khẩu mới"
                      dependencies={['current']}
                      rules={[
                        {
                          required: true,
                          min: 5,
                          message: 'Vui lòng nhập mật khẩu mới (ít nhất 5 kí tự)!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('current') !== value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Tạo mới mật khẩu không trùng hiện tại!'));
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
                      dependencies={['pass_new']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Xác nhận lại mật khẩu !',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('pass_new') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Xác nhận lại không khớp với mật khẩu mới!'));
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
                </>,
              }]}
          />
        </Modal>
      </div >
    </>

  );
}

export default HeaderComponent;
