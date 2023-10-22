import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
} from "antd";
import ButtonComponents from "../../../components/button";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;

function AddNewProduct({ open, handleCancel, cate, material, handleFinish }) {
  const [haveData, setHaveData] = useState(false);
  const [form] = Form.useForm();
  const optionsStatus = [
    { value: 0, label: "Còn hàng" },
    { value: 1, label: "Hết hàng" },
  ];
  const initialValues = {
    price: 0,
    status: 0,
  };
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const formData = await form.getFieldsValue();
      handleFinish({ ...formData, statusForm: "add" });
      handleCancel();
      form.resetFields();
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={[
        <ButtonComponents
          borderColor={"border-borderSecondaryColor"}
          key="back"
          onClick={handleCancel}
          content={"Quay lại"}
          colorText={"text-main"}
        />,
        <ButtonComponents
          borderColor={"border-borderSecondaryColor"}
          backgroundColor={"bg-secondaryColor"}
          content={"Tạo mới"}
          type="submit"
          key="submit"
          htmlType="submit"
          onClick={handleSubmit}
        />,
      ]}
      centered
    >
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={initialValues}
        className="mt-8"
      >
        <h3 className="font-semibold mb-8 text-main text-lg">
          Thêm thông tin món ăn
        </h3>
        <Form.Item
          name="name_product"
          label="Tên món ăn"
          rules={[
            {
              required: true,
              message: "Bạn phải điền tên món ăn",
            },
          ]}
          labelCol={{
            span: 24,
          }}
        >
          <Input placeholder="Ví dụ: Cua rang me..." />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Giá">
            <Form.Item name="price" noStyle>
              <InputNumber min={0} />
            </Form.Item>
            <span
              className="ant-form-text"
              style={{
                marginLeft: 8,
              }}
            >
              vnđ
            </span>
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Select placeholder="Chọn trạng thái món ăn">
              {optionsStatus.map((el, index) => (
                <Option key={index} value={el.value}>
                  {el.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          name="id_category"
          label="Loại món ăn"
          labelCol={{
            span: 24,
          }}
          rules={[
            {
              required: true,
              message: "Bạn phải chọn loại món ăn",
            },
          ]}
        >
          <Select placeholder="Chọn 1 loại món ăn">
            {cate?.map((el, index) => (
              <Option key={index} value={el.id}>
                {el.name_category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          labelCol={{
            span: 24,
          }}
        >
          <Input.TextArea />
        </Form.Item>
        <h3 className="font-semibold mb-8 mt-7 text-main text-lg">
          Thêm công thức món ăn
        </h3>
        <Form.Item name="descriptionRecipe" label="Mô tả công thức">
          <Input.TextArea onChange={() => setHaveData(true)} />
        </Form.Item>
        {haveData && (
          <p className="italic my-6">
            {" "}
            <span className="text-red-500">*Lưu ý: </span>Thêm mô tả mà không
            thêm nguyên liệu thì sẽ không được lưu lại
          </p>
        )}
        <Form.List name="recipe">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => {
                return (
                  <Space key={field.key} className="w-full">
                    <Form.Item required={false}>
                      <Form.Item
                        {...field}
                        label="Nguyên liệu"
                        name={[field.name, "materials"]}
                        rules={[
                          {
                            required: true,
                            message: "Nhập nguyên liệu cho món ăn hoặc xóa",
                          },
                        ]}
                      >
                        <Select placeholder="Chọn 1 nguyên liệu cho món ăn">
                          {material?.map((el, index) => (
                            <Option key={index} value={el.id}>
                              {el.name_material}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={[field.name, `quantity`]}
                        label="Số lượng"
                        name={[field.name, "quantity"]}
                        rules={[
                          {
                            required: true,
                            message: "Nhập số lượng nguyên liệu hoặc xóa",
                          },
                        ]}
                      >
                        <InputNumber min={0} />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <span
                          className="ms-2 text-gray-500"
                          onClick={() => remove(field.name)}
                        >
                          Xóa
                        </span>
                      ) : null}
                    </Form.Item>
                  </Space>
                );
              })}
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </>
          )}
        </Form.List>
        <h3 className="font-semibold mb-8 mt-7 text-main text-lg">
          Thêm hình ảnh món ăn
        </h3>
        <Form.Item
          name="Image"
          rules={[
            {
              required: true,
              message: "Phải thêm hình ảnh món ăn",
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
            listType="picture"
            multiple={true}
            defaultFileList={[]}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddNewProduct;
