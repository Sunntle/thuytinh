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
            <Modal
                open={openModal}
                onCancel={handleCancel}
                footer={null}

            >
                {optionsProduct.length === 0 ?
                    <div className="flex items-center justify-center text-2xl h-40">Tất cả sản phẩm đã có công thức</div> :
                    <div className="h-full ">
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

                            <div className="w-full my-4 font-medium">
                                Nguyên liệu sản phẩm
                            </div>
                            <Form.List name="materials"

                                initialValue={[
                                    { id_material: undefined, quantity: null, descriptionRecipe: null },
                                ]}>
                                {(fields, { add, remove }) => (
                                    <div className="h-full overflow-y-auto">

                                        {fields.map(({ key, name, ...restField }) => (
                                            <div className="flex flex-col items-center p-2 border border-gray-200 border-dotted ">
                                                <div className="flex flex-col gap-2 w-full" key={key}>
                                                    <Form.Item
                                                        className="w-full"
                                                        {...restField}
                                                        name={[name, 'id_material']}
                                                        label="Nguyên liệu"
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
                                                        className="w-full"
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
                                                    <Form.Item
                                                        name={[name, 'descriptionRecipe']}
                                                        rules={[{
                                                            required: true,
                                                            message: 'Vui lòng mô tả'
                                                        }]}
                                                    >
                                                        <Input.TextArea rows={4} placeholder="Mô tả công thức của sản phẩm" />
                                                    </Form.Item>
                                                </div>
                                                <MinusCircleOutlined onClick={() => remove(name)} className="p-2" />
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


                        </Form>
                    </div>
                }

            </Modal></div>
    )
}

export default CreateRecipe