import { Button, Form, Input, InputNumber, Modal, Radio, Select, Space } from "antd";
import ButtonComponents from "../../../components/button";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

function AddNewMenu({ open, confirmLoading, handleCancel, data, handleFinish }) {
  const [form] = Form.useForm();
  const optionsStatus = [
    { value: 0, label: "Còn hàng" },
    { value: 1, label: "Hết hàng" },
  ];
  const optionsCate = [
    { value: 0, label: "Lẩu" },
    { value: 1, label: "Nướng" },
  ];
  const optionsTopping = [
    { value: 0, label: "Không" },
    { value: 1, label: "Có" },
  ];
  const initialValues = {
    price: 0,
    is_topping: 0,
    status: 0,
  };
  console.log(data);
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const formData = await form.getFieldsValue();
      handleFinish(formData);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  return (
    <Modal
      title="Thêm món ăn mới"
      open={open}
      confirmLoading={confirmLoading}
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
      <Form form={form} onFinish={handleFinish} initialValues={initialValues} className="mt-8">
        <Form.Item
          name="name_product"
          label="Tên món ăn"
          rules={[
            {
              required: true,
              message: "Bạn phải điền tên món ăn",
            },
          ]}
        >
          <Input placeholder="Ví dụ: Cua rang me..." />
        </Form.Item>
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
        <Form.Item name="is_topping" label="Đánh dấu là topping">
          <Radio.Group>
            {optionsTopping.map((el, index) => (
              <Radio key={index} value={el.value}>
                {el.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="id_category"
          label="Loại món ăn"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Bạn phải chọn loại món ăn",
            },
          ]}
        >
          <Select placeholder="Chọn 1 loại món ăn">
            {optionsCate.map((el, index) => (
              <Option key={index} value={el.value}>
                {el.label}
              </Option>
            ))}
          </Select>
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
        <Form.Item name="content" label="Mô tả">
          <Input.TextArea />
        </Form.Item>
        <h3 className="font-semibold mb-8">Thêm công thức món ăn</h3>
        <Form.Item name="descriptionRecipe" label="Mô tả công thức">
          <Input.TextArea />
        </Form.Item>
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
                          {optionsCate.map((el, index) => (
                            <Option key={index} value={el.value}>
                              {el.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={[field.name, `quantity`]}
                        label="Số lượng"
                        name={[field.name, "quantity"]}
                        rules={[{ required: true, message: "Nhập số lượng nguyên liệu hoặc xóa" }]}
                      >
                        <InputNumber min={0} />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <span className="ms-2 text-gray-500" onClick={() => remove(field.name)}>
                          Xóa
                        </span>
                      ) : null}
                    </Form.Item>
                  </Space>
                );
              })}
              <Button type="dashed" onClick={() => add()} style={{ width: "60%" }} icon={<PlusOutlined />}>
                Add field
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}

export default AddNewMenu;
