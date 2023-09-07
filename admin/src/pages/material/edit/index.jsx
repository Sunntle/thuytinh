import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import ButtonComponents from "../../../components/button";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";

function EditMaterial({ open, handleCancel, handleFinish, data }) {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const formData = await form.getFieldsValue();
      handleFinish({ ...formData, status: "edit", id: data.id });
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  useEffect(() => {
    if (data) {
      data.Image = [
        {
          uid: "-1",
          name: data.image.split("/").at(-1).split(".")[0],
          status: "done",
          url: data.image,
        },
      ];
      const setFormValue = async () => {
        await form.setFieldsValue({
          name_material: data.name_material,
          price: data.price,
          amount: data.amount,
          Image: data.Image,
          unit: data.unit,
        });
      };
      setFormValue();
    }
  }, [form, data]);
  return (
    <Modal
      forceRender={true}
      open={open}
      onCancel={handleCancel}
      footer={[
        <ButtonComponents
        className="border-borderSecondaryColor text-main"
          key="back"
          onClick={handleCancel}
          content={"Quay lại"}
        />,
        <ButtonComponents
        className="border-borderSecondaryColor bg-secondaryColor"
          content={"Tạo mới"}
          key="submit"
          htmlType="submit"
          onClick={handleSubmit}
        />,
      ]}
      centered
    >
      <Form form={form} onFinish={handleFinish} initialValues={{ price: 0 }} className="mt-8">
        <h3 className="font-semibold mb-8 text-main text-lg">
          {data ? `Sửa nguyên liệu ${data.name_material}` : "Thêm thông tin nguyên liệu nhà hàng"}
        </h3>
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
              message: "Phải thêm hình ảnh nguyên liệu",
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
          <Upload beforeUpload={() => false} listType="picture" defaultFileList={[]}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <span className="italic	">
          {" "}
          <span className="text-red-500">*Lưu ý: </span>Hình ảnh chỉ lấy ảnh cuối cùng được upload
        </span>
      </Form>
    </Modal>
  );
}

export default EditMaterial;
