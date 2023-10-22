import { Form, Input, Modal, QRCode, Select } from 'antd';
import React, { useCallback, useState } from 'react'
import ButtonComponents from '../../components/button';
import { createTables } from '../../services/api';
import { url } from '../../utils/constant';

const CreateTable = ({ options, fetchData, setIsModalOpen, isModalOpen, messageApi }) => {
    const [form] = Form.useForm();
    const [code, setCode] = useState('');


    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        form.resetFields();
        setCode(url)
    }, [])
    const onFinish = async (values) => {
        values.qr_code = url + code;
        let { success, data } = await createTables(values);
        if (success) {
            fetchData();
            handleCancel();
        }
        messageApi.open({ type: success ? 'success' : "error", content: data });
    };

    return (
        <>
            <Modal title="Thêm bàn vào nhà hàng" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên bàn"
                        name="name_table"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên bàn',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Vị trí"
                        name="position"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên vị trí',
                        }]}
                    >
                        <Select options={options} />

                    </Form.Item>
                    <div className='flex justify-center w-full'>
                        <QRCode value={url + code} />
                    </div>
                    <Form.Item
                        label={`Mã quét nhanh`}
                        name="qr_code"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập url',
                        }]}
                    >
                        <Input
                            placeholder={`Vd: 1`}
                            onChange={(e) => {
                                setCode(e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item className='flex justify-end'>
                        <ButtonComponents className="border-borderSecondaryColor text-main" htmlType={"submit"}
                            content={"Thêm mới"} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateTable