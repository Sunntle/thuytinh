import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import ButtonComponents from "../../../components/button";
import { UploadOutlined } from "@ant-design/icons";

function AddNewMaterial({ open, confirmLoading, handleCancel, handleFinish, unitMasterial }) {
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
      <Form form={form} onFinish={handleFinish} initialValues={{ price: 0 }} className="mt-8"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
      >
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

        <div className="grid grid-cols-2 gap-4">
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
            <Select placeholder="Đơn vị của nguyên liệu " options={
              unitMasterial.map(item => ({ value: item, label: item.toUpperCase() }))
            } />
          </Form.Item>
          <Form.Item label="Giá (vnđ)" name="price" rules={[
            {
              required: true,
              message: "Bạn phải nhập giá",
            }, {
              type: "number",
              min: 1,
              message: "Bạn phải nhập giá nguyên liệu",
            }, {
              type: "integer",
              pattern: /^\d+$/,
              message: "Nhập kiểu số nguyên",
            }
          ]}>
            <InputNumber className="w-full" formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')} />
          </Form.Item>

          <Form.Item label="Số lượng" name="amount" rules={[
            {
              required: true,
              message: "Bạn phải nhập số lượng  nguyên liệu",
            }, {
              type: "integer",
              pattern: /^\d+$/,
              message: "Nhập kiểu số nguyên",
            }
          ]} >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

        </div>

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
