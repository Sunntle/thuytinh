
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import React, { memo, useCallback, useState } from 'react'
import { useEffect } from 'react';
import ButtonComponents from '../../../components/button';
import { updateBooking } from '../../../services/api';
const UpdateBooking = ({ setDataUpdate, fetchData, dataUpdate, isModalOpenUpdate, setIsModalOpenUpdate, messageApi }) => {

    const [updateForm] = Form.useForm();
    useEffect(() => {
        if (dataUpdate) {
            const data = { ...dataUpdate, name: dataUpdate.order.name, email: dataUpdate.order.email, phone: dataUpdate.order.phone }
            updateForm.setFieldsValue(data);
        }
    }, [dataUpdate])
    const handleCancel = useCallback(() => {
        setIsModalOpenUpdate(false);
        setDataUpdate(null)
        updateForm.resetFields();
    }, [dataUpdate, isModalOpenUpdate])
    const onFinish = async (values) => {
        try {
            const res = await updateBooking(values);
            if (res) {
                fetchData();
                handleCancel();
            }
            messageApi.open({ type: res ? 'success' : "error", content: res });
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <>
            <Modal title="Cập nhật" open={isModalOpenUpdate} onCancel={handleCancel} footer={null}>
                <Form
                    form={updateForm}
                    name="update"
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
                        name="id"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên khách hàng"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên khách hàng',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{
                            type: 'number',
                            required: true,
                            message: 'Vui lòng nhập số điện thoại',
                        }, {
                            type: "integer",
                            pattern: /^\d+$/,
                            message: "Nhập kiểu số nguyên",
                        }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{
                            type: 'email',
                            required: true,
                            message: 'Vui lòng nhập Email',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Bàn"
                        name="tableId"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập bàn',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số người"
                        name="party_size"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập số người',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        label="Ngày nhận"
                        name="name_table"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên bàn',
                        }]}
                    >
                        <Input />
                    </Form.Item> */}
                    <Form.Item className='flex justify-end'>
                        <ButtonComponents className="border-borderSecondaryColor text-main" htmlType={"submit"}
                            content={"Cập nhật"} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default memo(UpdateBooking)