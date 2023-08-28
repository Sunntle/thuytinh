import { Button, Form, Input, InputNumber, Modal, Upload, message } from "antd";
import ButtonComponents from "../../../components/button";
import { UploadOutlined } from "@ant-design/icons";
import { deleteImg, uploadImg } from "../../../services/api";
import { useState } from "react";

function AddNewMaterial({ open, confirmLoading, handleCancel, handleFinish }) {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const formData = await form.getFieldsValue();
      handleFinish({ ...formData, image: [...fileList][0]?.url });
      form.resetFields();
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  const customUpload = async ({ file, onError }) => {
    try {
      const res = await uploadImg(file);
      const url = res[0].url;
      setFileList((prevFileList) => [
        ...prevFileList,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: url,
        },
      ]);
    } catch (error) {
      if (onError) {
        onError(error, "ret_placeholder", "parsedFile_placeholder");
      }
    }
  };
  const handleRemove = async (file) => {
    const { url } = file;
    const res = await deleteImg(url);
    if (res === "OK") {
      setFileList((prev) => prev.filter((item) => item.status !== "removed"));
      message.open({ type: "success", content: "Xóa hình ảnh thành công" });
    } else {
      message.open({ type: "error", content: "Có gì đó sai sai !" });
    }
  };
  const props = {
    customRequest: customUpload,
    onRemove: handleRemove,
    showUploadList: true,
    listType: "picture",
    fileList,
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
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form>
    </Modal>
  );
}

export default AddNewMaterial;
