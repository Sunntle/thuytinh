import { Button, Col, Form, Input, Modal, Row, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ButtonComponents from '../../components/button';
import { addCate } from "../../services/api";

const optionsStatus = [
    { value: 0, label: "Ẩn" },
    { value: 1, label: "Hiện" },
];
const CreateCategory = ({ openModal, handleCancel, fetchData }) => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        message.open({
            type: "loading",
            content: "Đang xử lí...",
            duration: 0
        });
        handleCancel();
        const formData = new FormData();
        const { thumbnail, ...rest } = values;
        const val = { ...rest, thumbnail: thumbnail[0].originFileObj };
        for (const item of Object.entries(val)) {
            formData.append(item[0], item[1])
        }
        await addCate(formData);
        message.destroy();
        message.open({
            type: "success",
            content: "Thêm món ăn mới thành công!",
        });
        fetchData();
        form.resetFields()
    };

    return (
        <div>
            <Modal title="Basic Modal"
                open={openModal}
                onCancel={handleCancel}
                footer={null}
            >

                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="name_category"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên loại thực phẩm'
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ẩn / Hiện danh mục"
                        name="status"
                        rules={[{
                            required: true,
                            message: 'Vui lòng chọn Ẩn / Hiện danh mục '
                        }]}
                    >
                        <Select options={optionsStatus} />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh"
                        name="thumbnail"
                        rules={[{
                            required: true,
                            message: 'Vui lòng chọn ảnh '
                        }]}
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
                            listType='picture'
                            defaultFileList={[]}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Row justify={'end'} gutter={[18, 0]}>
                        <Col>
                            <ButtonComponents
                                borderColor={"border-borderSecondaryColor"}
                                key="back"
                                onClick={handleCancel}
                                content={"Quay lại"}
                                colorText={"text-main"}

                            />
                        </Col>
                        <Col>
                            <ButtonComponents
                                borderColor={"border-borderSecondaryColor"}
                                backgroundColor={"bg-secondaryColor"}
                                content={"Tạo mới"}
                                type="submit"
                                key="submit"
                                htmlType="submit"
                            />
                        </Col>
                    </Row>


                </Form>

            </Modal>
        </div >
    )
}

export default CreateCategory