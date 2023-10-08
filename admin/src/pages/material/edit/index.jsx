import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import ButtonComponents from "../../../components/button";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";

function EditMaterial({ open, handleCancel, handleFinish, data, unitMasterial }) {
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
          name: data.image?.split("/").at(-1).split(".")[0],
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
      <Form form={form} onFinish={handleFinish} initialValues={{ price: 0 }} className="mt-8"
        labelAlign="left"
        labelCol={{
          span: 6,
          offset: 0
        }}
        wrapperCol={{
          span: 18
        }}>
        <h3 className="font-semibold mb-8 text-main text-lg">
          {data ? `Sửa nguyên liệu : ${data.name_material}` : "Thêm thông tin nguyên liệu nhà hàng"}
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

        <Form.Item label="Giá (vnđ) :" name="price" rules={[
          {
            required: true,
            message: "Bạn phải điền tên nguyên liệu",
          },
        ]}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item name="amount" label="Số lượng" rules={[
          {
            required: true,
            message: "Bạn phải điền tên nguyên liệu",
          },
        ]}>
          <InputNumber min={0} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')} className="w-full" />
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
          <Select placeholder="Đơn vị của nguyên liệu " options={
            unitMasterial.map(item => ({ value: item, label: item.toUpperCase() }))
          } />
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
          <Upload
            beforeUpload={() => false}
            listType="picture"
            defaultFileList={[]}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <span className="italic	">
          {" "}
          <span className="text-red-500">*Lưu ý: </span>Hình ảnh chỉ lấy ảnh
          cuối cùng được upload
        </span>
      </Form>
    </Modal>
  );
}

export default EditMaterial;
