import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ButtonComponents from '../../components/button';
import { callCreateRecipe } from "../../services/api";

const CreateRecipe = ({ openModal, handleCancel, fetchData, optionsProduct, optionsMaterial, changeSelect }) => {
    const [form] = Form.useForm();
    const onFinish = async ({ id_product, materials }) => {
        let val = materials.map(item => ({ id_product: id_product, ...item }))
        const res = await callCreateRecipe(val);
        if (res?.error) message.info(res?.error);
        else message.success(res)
        form.resetFields()
        handleCancel();
        fetchData()
    };
    return (
        <div>
            <Modal title="Basic Modal"
                open={openModal}
                onCancel={handleCancel}
                footer={null}

            >
                {optionsProduct.length === 0 ?
                    <div className="flex items-center justify-center text-2xl h-40">Tất cả sản phẩm đã có công thức</div> :
                    <Form
                        form={form}
                        name="add_recipe"
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
                            label="Công thức của sản phẩm"
                            name="id_product"
                            rules={[{
                                required: true,
                                message: 'Vui lòng chọn sản phẩm'
                            }]}
                        >
                            <Select options={optionsProduct} />
                        </Form.Item>

                        <Form.List name="materials" initialValue={[
                            { id_material: undefined, quantity: null },
                        ]}>
                            {(fields, { add, remove }) => (
                                <div >

                                    {fields.map(({ key, name, ...restField }) => (
                                        <div className="flex gap-2" key={key}>
                                            <Form.Item
                                                className="w-1/3"
                                                {...restField}
                                                name={[name, 'id_material']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Chọn Nguyên liệu',
                                                    },
                                                ]}
                                            >
                                                <Select options={optionsMaterial} />
                                            </Form.Item>
                                            <Form.Item
                                                className="w-1/3"
                                                {...restField}
                                                name={[name, 'quantity']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nhập số lượng',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Số lượng" />
                                            </Form.Item>
                                            <div ><MinusCircleOutlined onClick={() => remove(name)} className="p-2" /></div>

                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button className="mt-2" type="dashed" onClick={() => changeSelect(add, form.getFieldsValue())} block icon={<PlusOutlined />}>
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </div>
                            )}
                        </Form.List>
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


                    </Form>}

            </Modal></div>
    )
}

export default CreateRecipe