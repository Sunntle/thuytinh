import React, { useEffect } from "react";
import { useState } from "react";
import CreateCategory from "./add_cat";
import ButtonComponents from "../../components/button";
import {
  Col,
  Modal,
  Table,
  message,
  Button,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
const { Option } = Select;
import { delCate, editCate, getCate } from "../../services/api";
import { formatNgay } from "../../utils/format";
import ConfirmComponent from "../../components/confirm";
import { UploadOutlined } from "@ant-design/icons";

const CategoryPage = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [data, setDate] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await getCate();
    setDate(res);
  };
  const handleCancel = () => {
    setOpenModal(false);
    setOpenModalUpdate(false);
  };
  const handOpen = () => {
    setOpenModal(true);
  };
  const showModalUpdate = (record) => {
    setOpenModalUpdate(true);
    const data = { ...record };
    data.thumbnail = [
      {
        uid: "-1",
        name: "thumbnail.jpg",
        status: "done",
        url: record.thumbnail,
      },
    ];
    form.setFieldsValue(data);
  };
  const handDeleteOrder = async (id) => {
    const res = await delCate(id);
    message.success(res);
    fetchData();
  };
  const onFinish = async (values) => {
    const formData = new FormData();
    const { thumbnail, ...rest } = values;

    if (thumbnail[0]?.originFileObj) {
      const val = { ...rest, thumbnail: thumbnail[0].originFileObj };
      for (const item of Object.entries(val)) {
        formData.append(item[0], item[1]);
      }
      const res = await editCate(formData);
      message.success(res);
    } else {
      const res = await editCate(rest);
      message.success(res);
    }
    fetchData();
    handleCancel();
  };
  return (
    <div className="px-5 mt-5">
      <div className="mb-4">
        <ButtonComponents
          className="text-main border-borderSecondaryColor"
          onClick={handOpen}
          content={"Thêm mới"}
        />
      </div>
      <Table
        columns={[
          {
            title: "Tên danh mục",
            dataIndex: "name_category",
            key: "name_category",
            sorter: true,
          },
          {
            title: "Ảnh chính",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (_, record) => <img src={record.thumbnail} width={100} />,
          },
          {
            title: "Ẩn / Hiện",
            dataIndex: "status",
            key: "status",
            sorter: true,
          },
          {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: true,
            render: (_, record) => <span>{formatNgay(record.createdAt)}</span>,
          },
          {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            key: "updatedAt",
            sorter: true,
            render: (_, record) => <span>{formatNgay(record.updatedAt)}</span>,
          },
          {
            title: "Chỉnh sửa",
            key: "action",
            render: (_, record) => (
              <div className="h-10 flex items-center cursor-pointer">
                <span
                  className="bg-orange-500 px-4 rounded-md py-2 text-white"
                  onClick={() => showModalUpdate(record)}
                >
                  Sửa
                </span>
                <ConfirmComponent
                  title="Xác nhận xóa đơn hàng"
                  confirm={() => handDeleteOrder(record.id)}
                >
                  Xóa
                </ConfirmComponent>
              </div>
            ),
          },
        ]}
        dataSource={data}
        rowKey={"id"}
      />
      <Modal
        title="Cập nhật đơn hàng"
        footer={null}
        centered
        open={openModalUpdate}
        width={500}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="update"
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
            label="Tên danh mục"
            name="name_category"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên danh mục!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ẩn hiện danh mục"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn ẩn hiện !" }]}
          >
            <Select
              placeholder="Nhân viên"
              allowClear
              options={[
                {
                  value: 0,
                  label: "Ẩn",
                },
                {
                  value: 1,
                  label: "Hiện",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="thumbnail"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ảnh ",
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
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <CreateCategory
        openModal={openModal}
        handleCancel={handleCancel}
        fetchData={fetchData}
      />
    </div>
  );
};

export default CategoryPage;
