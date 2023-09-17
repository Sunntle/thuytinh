import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Tabs,
  Upload,
  message,
} from "antd";
import ButtonComponents from "../../../components/button";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteImgById, uploadImgByIdProduct } from "../../../services/api";
const { Option } = Select;
const optionsStatus = [
  { value: 0, label: "Còn hàng" },
  { value: 1, label: "Hết hàng" },
];
function EditProduct({ open, handleCancel, handleFinish, cate, data }) {
  const [form] = Form.useForm();
  const [statusForm, setStatusForm] = useState("1");
  const handleEditProduct = (dataForm) => {
    handleFinish({ ...dataForm, formName: "product", id: data?.id });
    handleCancel();
  };
  const fileList = data?.ImageProducts.map((el) => {
    return {
      uid: el.id,
      name: el.url.split("/").at(-1).split(".")[0],
      status: "done",
      url: el.url,
    };
  });
  useEffect(() => {
    if (data) {
      const setFormValue = async () => {
        await form.setFieldsValue({
          name_product: data.name_product,
          price: data.price,
          description: data.description,
          status: data.status,
          sold: data.sold,
          createdAt: data.createdAt,
          id_category: data.id_category,
          Image: data.Image,
          recipe: data.Recipes.map((el) => ({
            quantity: el.quantity,
            materials: el.Material.id,
          })),
          descriptionRecipe: data.Recipes[0]?.descriptionRecipe,
        });
      };
      setFormValue();
    }
  }, [form, data]);
  const items = [
    {
      key: "1",
      label: "Thông tin món ăn",
      children: statusForm === "1" && (
        <Form form={form} onFinish={handleEditProduct} className="mt-8">
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
          <Form.Item
            name="id_category"
            label="Loại món ăn"
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
          <Form.Item name="status" label="Trạng thái">
            <Select placeholder="Chọn trạng thái món ăn">
              {optionsStatus.map((el, index) => (
                <Option key={index} value={el.value}>
                  {el.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
          <div className="text-right">
            <ButtonComponents
              key="back"
              onClick={handleCancel}
              content={"Quay lại"}
              className="me-2 border-borderSecondaryColor text-main"
            />
            <ButtonComponents
              content={"Tạo mới"}
              key="submit"
              htmlType="submit"
              className="border-borderSecondaryColor bg-secondaryColor"
            />
          </div>
        </Form>
      ),
    },
    {
      key: "3",
      label: "Hình ảnh",
      children: statusForm === "3" && (
        <Upload
          name="Image"
          customRequest={async ({ file, onSuccess }) => {
            const res = await uploadImgByIdProduct(file, data?.id);
            res.map((el) => {
              onSuccess({
                uid: el.id,
                name: el.url.split("/").at(-1).split(".")[0],
                status: "done",
                url: el.url,
              });
            });
            message.open({
              type: "success",
              content: `Thêm hình ảnh cho món ăn ${data?.name_product} thành công!`,
            });
          }}
          onRemove={async (file) => {
            await deleteImgById(file.uid);
            message.open({
              type: "success",
              content: `Xóa cho món ăn ${data?.name_product} thành công!`,
            });
          }}
          listType="picture"
          defaultFileList={fileList ? [...fileList] : []}
          multiple={true}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      ),
    },
  ];
  return (
    <Modal open={open} onCancel={handleCancel} footer={false} centered>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(key) => setStatusForm(key)}
      />
    </Modal>
  );
}

export default EditProduct;
