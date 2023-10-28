import { useCallback, useEffect, useMemo, useState } from "react";
import ConfirmComponent from "../../components/confirm";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Tabs,
  Typography,
  Upload,
  message,
} from "antd";
import {
  callRegister,
  callUpdateAccount,
  callUpdatePassword,
  getAllUser,
  getDetailUser,
  removeUser,
} from "../../services/api";
import { formatNgay, roleRext } from "../../utils/format";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import ButtonComponents from "../../components/button";
import Spinner from "../../components/spinner";
import RegisterPage from "../register";
const { Title } = Typography;

function UserPage() {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const userStore = useSelector((state) => state.account);
  const notifications = useSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);
  const fetchData = useCallback(async (role) => {
    try {
      setLoading(true);
      switch (role) {
        case "admin": {
          const dataAdmin = await getAllUser({ _like: "role_R1_not" });
          dataAdmin.success && setAdmin(dataAdmin);
          break;
        }
        case "user": {
          const dataUser = await getAllUser({ _like: "role_R1" });
          dataUser.success && setUser(dataUser);
          break;
        }
        default: {
          const [dataAdmin, dataUser] = await Promise.all([
            getAllUser({ _like: "role_R1_not" }),
            getAllUser({ _like: "role_R1" }),
          ]);
          dataAdmin.success && setAdmin(dataAdmin);
          dataUser.success && setUser(dataUser);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleEdit = useCallback(
    async (idUser) => {
      setOpenModalProfile(true);
      const user = await getDetailUser(idUser);
      const { id, name, email, phone, avatar, role } = user.data;
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
    },
    [form]
  );
  const handleDelete = useCallback(
    async (id) => {
      if (id === userStore.user.id) {
        message.error("Không thể xóa chính bản thân mình !!");
        return;
      }
      try {
        await removeUser(id);
        await fetchData();
        message.success("Xóa thành công");
      } catch (err) {
        console.log(err);
        message.error("Xảy ra lỗi, xóa thất bại");
      }
    },
    [fetchData, userStore.user.id]
  );

  const onChange = useCallback((pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  }, []);

  useEffect(() => {
    socket.on("update-admin-online", (data) => {
      if (admin && admin.data) {
        const arrAdmin = [...admin.data];
        arrAdmin.forEach((itemA) => {
          const itemB = data.find((el) => el.id === itemA.id);
          if (itemB) {
            itemA.status = true;
          } else {
            itemA.status = false;
          }
        });
        setAdmin((prev) => ({ ...prev, data: arrAdmin }));
      }
    });
    return () => {
      socket.off("update-admin-online");
    };
  }, [admin]);

  useEffect(() => {
    if (
      notifications.lastNotification &&
      notifications.lastNotification?.type ==
      location.pathname.split("/").at(-1)
    ) {
      fetchData();
    }
  }, [fetchData, notifications.lastNotification]);
  const onFinish = useCallback(
    async (values) => {
      const formData = new FormData();
      const { avatar, role, ...rest } = values;
      const val = { ...rest, role: roleRext(role) };
      if (avatar[0]?.originFileObj) {
        val.avatar = avatar[0].originFileObj;
      }
      for (const item of Object.entries(val)) {
        formData.append(item[0], item[1]);
      }
      const res = await callUpdateAccount(formData);
      messageApi.open({
        type: "success",
        content: res.message,
      });
      if (val.role !== "R1") fetchData("admin");
      else fetchData("user");
      setOpenModalProfile(false);
    },
    [fetchData, messageApi]
  );

  const submitResetPass = useCallback(
    async (values) => {
      let res = await callUpdatePassword(values);
      messageApi.open({
        type: res.success ? "success" : "error",
        content: res.message,
      });
      if (res.success === true) {
        setOpenModalProfile(false);
        form.resetFields();
      }
    },
    [form, messageApi]
  );

  const renderUpdateModal = useMemo(
    () => (
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
                      <Input />
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
                            if (!value || getFieldValue("current") !== value) {
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
                            if (!value || getFieldValue("pass_new") === value) {
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
    ),
    [form, form1, onFinish, openModalProfile, submitResetPass]
  );

  const columnsUser = useMemo(
    () => [
      {
        title: "Ảnh đại diện",
        dataIndex: "avatar",
        render: (_, record) => (
          <img
            key={record.id}
            className="w-full"
            style={{ maxWidth: "120px" }}
            src={record?.avatar}
            alt=""
          />
        ),
      },
      {
        title: "Mã tài khoản",
        dataIndex: "id",
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "Tên",
        dataIndex: "name",
        filters: [
          {
            text: "Cá",
            value: "Cá",
          },
          {
            text: "Rau",
            value: "Rau",
          },
          {
            text: "Thịt",
            value: "Thịt",
          },
        ],
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
      },
      {
        title: "Email",
        dataIndex: "email",
        filterSearch: true,
      },
      {
        title: "Thời gian tạo",
        dataIndex: "createdAt",
        render: (_, record) => (
          <span key={record.id}>{formatNgay(record.createdAt)}</span>
        ),
        sorter: (a, b) => a.createdAt - b.createdAt,
      },

      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <div
            key={record.id}
            className="h-10 flex items-center cursor-pointer"
          >
            <span
              className="bg-orange-500 px-4 rounded-md py-2 text-white"
              onClick={() => handleEdit(record.id)}
            >
              Sửa
            </span>
            <ConfirmComponent
              title="Xác nhận xóa tài khoản này?"
              confirm={() => handleDelete(record.id)}
            >
              Xóa
            </ConfirmComponent>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  const columnsAdmin = useMemo(
    () => [
      ...columnsUser,
      {
        title: "Trạng thái",
        dataIndex: "status",
        sorter: (a, b) => a.status - b.status,
        render: (_, record) =>
          record.status == true ? (
            <span key={record.id} className="text-green-500">
              Đang hoạt động
            </span>
          ) : (
            <span key={record.id} className="text-red-500">
              Tạm vắng
            </span>
          ),
      },
    ],
    [columnsUser]
  );

  const renderTableAdmin = () => {
    return (
      <Table
        columns={columnsAdmin}
        dataSource={admin?.data}
        onChange={onChange}
        rowKey={"id"}
      />
    );
  };
  const renderTableUser = () => {
    return (
      <Table
        columns={columnsUser}
        dataSource={user?.data}
        onChange={onChange}
        rowKey={"id"}
      />
    );
  };
  const items = [
    {
      label: "Khách hàng",

      key: "1",
      children: loading ? <Spinner /> : renderTableUser(),
    },
    {
      label: "Quản trị viên",
      key: "2",
      children: loading ? <Spinner /> : renderTableAdmin(),
    },
  ];
  const handleFinish = useCallback(
    async (values) => {
      const { success, mes } = await callRegister(values);
      messageApi.open({
        type: success ? "success" : "warning",
        content: mes ? mes : "Đăng kí thành công",
      });
      setOpen(false);
    },
    [messageApi]
  );
  return (
    <div className="my-7 px-5">
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        size="large"
        tabBarExtraContent={
          <ButtonComponents
            className="border-borderSecondaryColor text-main"
            content={"Thêm mới"}
            onClick={() => setOpen(true)}
          />
        }
        animated
        items={items}
      />
      {renderUpdateModal}

      <Modal
        open={open}
        title="Thêm tài khoản mới"
        centered
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <RegisterPage handleFinish={handleFinish} />
      </Modal>
    </div>
  );
}

export default UserPage;
