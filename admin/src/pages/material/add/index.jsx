import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import ButtonComponents from "../../../components/button";
import { UploadOutlined } from "@ant-design/icons";

function AddNewMaterial({ open, confirmLoading, handleCancel, handleFinish }) {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const formData = await form.getFieldsValue();
      handleFinish({ ...formData, Image: formData.Image, status: "add" });
      form.resetFields();
      handleCancel();
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  return (
    <Modal
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
      <Form form={form} onFinish={handleFinish} initialValues={{ price: 0 }} className="mt-8">
        <h3 className="font-semibold mb-8 text-main text-lg">Thêm thông tin nguyên liệu nhà hàng</h3>
        <Form.Item
          name="name_material"
          label="Tên nguyên liệu"
          rules={[
            {
              required: true,
              message: "Bạn phải điền tên nguyên liệu",
            },
          ]}
        >
          <Input placeholder="Ví dụ: Cua..." />
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
        <Form.Item label="Số lượng">
          <Form.Item name="amount" noStyle>
            <InputNumber min={0} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="unit"
          label="Đơn vị"
          rules={[
            {
              required: true,
              message: "Bạn phải điền đơn vị tính nguyên liệu",
            },
          ]}
        >
          <Input placeholder="Ví dụ: gram, kg, cái,..." />
        </Form.Item>
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
          <Upload beforeUpload={() => false} listType="picture" multiple={true} defaultFileList={[]}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddNewMaterial;
